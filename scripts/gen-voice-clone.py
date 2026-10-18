#!/usr/bin/env python3
"""Generate ASR-gated VieNeu clips from canonical voice text.

Legacy CLI stays supported. With ``--performance``, ``--json`` is canonical
``voice.json`` and the performance sidecar may split each shot into phrases.
Model loading and filesystem writes happen only from :func:`main`.
"""
from __future__ import annotations

import argparse
import hashlib
import time
import json
import math
import os
import re
import shutil
import subprocess
import tempfile
import unicodedata
from pathlib import Path
from typing import Callable, Iterable, NamedTuple, Sequence

ROOT = Path(__file__).resolve().parent.parent
MODELS = Path.home() / ".venvs" / "vieneu-models"
GLOBAL_MAX_CANDIDATES = 3
TRIM = "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse"
ACTING_CUE = re.compile(r"\[(?:cười|thở\s*dài|hắng\s*giọng|laugh|sigh|cough)[^]]*\]", re.I)


class PhrasePlan(NamedTuple):
    text: str
    seed: int | None
    pause_before: float
    pause_after: float
    intent: str
    emotion: str
    emphasis: tuple[str, ...]
    tempo_intent: str
    denoise: bool


class Candidate(NamedTuple):
    cer: float
    seed: int
    path: Path
    transcript: str


class ReferencePlan(NamedTuple):
    source: str
    start_seconds: float | None
    duration_seconds: float | None


def norm(text: str) -> str:
    return re.sub(r"[^\w]+", " ", unicodedata.normalize("NFC", text.lower())).strip()


def cer(expected: str, actual: str) -> float:
    expected, actual = norm(expected), norm(actual)
    distance = list(range(len(actual) + 1))
    for index, expected_char in enumerate(expected, 1):
        previous, distance[0] = distance[0], index
        for actual_index, actual_char in enumerate(actual, 1):
            previous, distance[actual_index] = distance[actual_index], min(
                distance[actual_index] + 1,
                distance[actual_index - 1] + 1,
                previous + (expected_char != actual_char),
            )
    return distance[len(actual)] / max(1, len(expected))


def _number(value: object, field: str) -> float:
    try:
        result = float(value)
    except (TypeError, ValueError) as error:
        raise ValueError(f"{field} must be a number") from error
    if result < 0:
        raise ValueError(f"{field} must be non-negative")
    return result


def _phrase(item: object, default_pause_after: float = 0.0) -> PhrasePlan:
    if isinstance(item, str):
        item = {"text": item}
    if not isinstance(item, dict):
        raise ValueError("each performance phrase must be a string or object")
    data = dict(item)
    text = data.pop("text", data.pop("t", None))
    if not isinstance(text, str) or not text.strip():
        raise ValueError("each performance phrase needs non-empty text")
    if ACTING_CUE.search(text):
        raise ValueError("acting cue must not appear in spoken phrase text")
    controls = data.pop("controls", {})
    if not isinstance(controls, dict):
        raise ValueError("phrase controls must be an object")
    unsupported = sorted(set(controls) - {"denoise"}) + sorted(
        set(data) & {"rate", "pitch", "vol", "volume", "atempo"}
    )
    if unsupported:
        raise ValueError(f"unsupported VieNeu control(s): {', '.join(unsupported)}")
    seed_value = data.pop("seed", None)
    seed = None if seed_value is None else int(seed_value)
    pause_before = _number(data.pop("pauseBeforeSeconds", data.pop("pause_before", 0)), "pauseBeforeSeconds")
    pause_after = _number(data.pop("pauseAfterSeconds", data.pop("pause_after", default_pause_after)), "pauseAfterSeconds")
    intent = str(data.pop("intent", ""))
    emotion = str(data.pop("emotion", ""))
    tempo_intent = str(data.pop("tempoIntent", data.pop("tempo_intent", "")))
    emphasis_value = data.pop("emphasis", [])
    if isinstance(emphasis_value, str):
        emphasis = (emphasis_value,)
    elif isinstance(emphasis_value, list) and all(isinstance(value, str) for value in emphasis_value):
        emphasis = tuple(emphasis_value)
    else:
        raise ValueError("emphasis must be a string or list of strings")
    if "actingCue" in data or "acting_cue" in data:
        raise ValueError("experimental acting cue is not enabled for VieNeu")
    if data:
        raise ValueError(f"unsupported voice-performance field(s): {', '.join(sorted(data))}")
    return PhrasePlan(text.strip(), seed, pause_before, pause_after, intent, emotion,
                      emphasis, tempo_intent, bool(controls.get("denoise", False)))


def build_performance_plan(canonical: dict[str, str], performance: dict[str, object]) -> dict[str, list[PhrasePlan]]:
    if not isinstance(canonical, dict) or not canonical or not all(
        isinstance(key, str) and isinstance(value, str) for key, value in canonical.items()
    ):
        raise ValueError("canonical voice.json must map shot keys to strings")
    shots = performance.get("shots", performance)
    if not isinstance(shots, dict):
        raise ValueError("voice-performance shots must be an object")
    sidecar_keys = set(shots) - {"version", "engine", "defaults"}
    if sidecar_keys != set(canonical):
        raise ValueError(
            f"voice-performance shot keys differ; missing={sorted(set(canonical)-sidecar_keys)}, "
            f"extra={sorted(sidecar_keys-set(canonical))}"
        )
    result = {}
    for shot_key, canonical_text in canonical.items():
        shot = shots[shot_key]
        if not isinstance(shot, dict) or not isinstance(shot.get("phrases"), list) or not shot["phrases"]:
            raise ValueError(f"voice-performance {shot_key} needs phrases")
        values = shot["phrases"]
        parsed = [_phrase(value, 0.3 if i < len(values) - 1 else 0) for i, value in enumerate(values)]
        if " ".join(phrase.text for phrase in parsed) != canonical_text:
            raise ValueError(f"voice-performance {shot_key} does not exactly reassemble canonical voice.json")
        result[shot_key] = parsed
    return result


def build_legacy_plan(lines: dict[str, object]) -> tuple[dict[str, str], dict[str, list[PhrasePlan]]]:
    canonical, shots = {}, {}
    for key, value in lines.items():
        values = value if isinstance(value, list) else [value]
        texts = [item if isinstance(item, str) else item.get("t", item.get("text")) for item in values]
        if not all(isinstance(text, str) for text in texts):
            raise ValueError(f"legacy voice entry {key} needs text")
        canonical[key] = " ".join(text.strip() for text in texts)
        shots[key] = {"phrases": values}
    return canonical, build_performance_plan(canonical, {"shots": shots})


def reference_for_shot(performance: dict[str, object], shot_key: str,
                       fallback: str | None) -> ReferencePlan:
    shots = performance.get("shots", performance)
    shot = shots.get(shot_key, {}) if isinstance(shots, dict) else {}
    value = shot.get("reference") if isinstance(shot, dict) else None
    if value is None:
        if not fallback:
            raise ValueError(f"voice-performance {shot_key} needs a reference or --ref fallback")
        value = {"source": fallback}
    elif isinstance(value, str):
        value = {"source": value}
    if not isinstance(value, dict) or not isinstance(value.get("source"), str):
        raise ValueError(f"voice-performance {shot_key} reference needs a source")
    source = value["source"]
    if re.match(r"^[a-z][a-z0-9+.-]*://", source, re.I):
        raise ValueError("voice reference source must be a local file")
    unknown = set(value) - {"source", "startSeconds", "durationSeconds"}
    if unknown:
        raise ValueError(f"unsupported reference field(s): {', '.join(sorted(unknown))}")
    start = None if "startSeconds" not in value else _number(value["startSeconds"], "startSeconds")
    duration = None if "durationSeconds" not in value else _number(value["durationSeconds"], "durationSeconds")
    if duration == 0:
        raise ValueError("durationSeconds must be greater than zero")
    return ReferencePlan(source, start, duration)


def select_candidate(*, text: str, seeds: Iterable[int], max_candidates: int, max_cer: float,
                     synthesize: Callable[[str, int], Path], transcribe: Callable[[Path], str]) -> Candidate:
    limit = min(GLOBAL_MAX_CANDIDATES, int(max_candidates))
    if limit < 1:
        raise ValueError("max_candidates must be at least 1")
    best = None
    for index, seed in enumerate(seeds):
        if index >= limit:
            break
        raw = synthesize(text, int(seed))
        transcript = transcribe(raw).strip()
        candidate = Candidate(cer(text, transcript), int(seed), raw, transcript)
        if best is None or candidate.cer < best.cer:
            best = candidate
        if candidate.cer <= max_cer:
            return candidate
    detail = "no candidates attempted" if best is None else f"best CER {best.cer:.3f}"
    raise RuntimeError(f"no candidate passed the CER gate ({detail}, maximum {max_cer:.3f})")


def atomic_publish(destination: Path, builder: Callable[[Path], None]) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    handle = tempfile.NamedTemporaryFile(prefix=f".{destination.stem}-", suffix=destination.suffix,
                                         dir=destination.parent, delete=False)
    temporary = Path(handle.name)
    handle.close()
    temporary.unlink(missing_ok=True)
    try:
        builder(temporary)
        if not temporary.exists() or temporary.stat().st_size == 0:
            raise RuntimeError(f"builder did not produce {destination.name}")
        os.replace(temporary, destination)
    finally:
        temporary.unlink(missing_ok=True)


def _publish_copy(source: Path, destination: Path) -> None:
    atomic_publish(destination, lambda temporary: shutil.copyfile(source, temporary))


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def cache_key(payload: object) -> str:
    return hashlib.sha256(json.dumps(payload, sort_keys=True, ensure_ascii=False,
                                     separators=(",", ":")).encode("utf-8")).hexdigest()


class VerifiedPhraseCache:
    """Local, content-addressed WAVs accepted by an earlier ASR/CER gate.

    A cache hit must match the precise reference bytes, phrase, engine and settings.
    Cache metadata is validated before reuse; unknown or damaged entries are misses.
    """

    def __init__(self, root: Path, engine: str = "vieneu-v3-turbo-3.8.3+whisper-small"):
        self.root, self.engine = root, engine
        self.hits = 0
        self.misses = 0

    def key(self, phrase: PhrasePlan, reference_hash: str, max_cer: float) -> str:
        return cache_key({"engine": self.engine, "text": phrase.text, "seed": phrase.seed,
                          "denoise": phrase.denoise, "reference": reference_hash,
                          "maxCer": max_cer})

    def get(self, key: str, text: str, max_cer: float) -> Candidate | None:
        folder = self.root / key[:2]
        wav, meta = folder / (key + ".wav"), folder / (key + ".json")
        try:
            data = json.loads(meta.read_text(encoding="utf-8"))
            if (not wav.is_file() or wav.stat().st_size == 0
                    or sha256_file(wav) != data["sha256"]
                    or data["text"] != text
                    or not 0 <= data["cer"] <= max_cer
                    or cer(text, data["transcript"]) > max_cer):
                return None
            self.hits += 1
            return Candidate(float(data["cer"]), int(data["seed"]), wav, data["transcript"])
        except (OSError, ValueError, KeyError, TypeError):
            return None

    def put(self, key: str, text: str, candidate: Candidate, max_cer: float) -> None:
        if candidate.cer > max_cer:
            raise ValueError("cannot cache an unverified candidate")
        folder = self.root / key[:2]
        wav, meta = folder / (key + ".wav"), folder / (key + ".json")
        _publish_copy(candidate.path, wav)
        payload = {"text": text, "seed": candidate.seed, "cer": candidate.cer,
                   "transcript": candidate.transcript, "sha256": sha256_file(wav)}
        atomic_publish(meta, lambda p: p.write_text(json.dumps(payload, ensure_ascii=False), encoding="utf-8"))
        self.misses += 1


def shot_identity(phrases: Sequence[PhrasePlan], reference_hash: str, max_cer: float) -> str:
    return cache_key({"reference": reference_hash, "maxCer": max_cer,
                      "engine": "vieneu-v3-turbo-3.8.3",
                      "phrases": [p._asdict() for p in phrases]})


def shot_is_current(destination: Path, manifest: dict, identity: str) -> bool:
    record = manifest.get(destination.name, {})
    return (destination.is_file() and destination.stat().st_size > 0
            and record.get("identity") == identity
            and record.get("sha256") == sha256_file(destination))


def generate_shot(*, shot_key: str, phrases: Sequence[PhrasePlan], reference: str,
                  destination: Path, raw_dir: Path, max_candidates: int, max_cer: float,
                  synthesize: Callable[[str, int, str, bool], Path],
                  transcribe: Callable[[Path], str],
                  encode: Callable[[Sequence[tuple[Path, PhrasePlan]], Path], None],
                  measure: Callable[[Path], dict[str, float | None]],
                  phrase_cache: VerifiedPhraseCache | None = None,
                  reference_hash: str = "") -> dict[str, object]:
    chosen = []
    for phrase in phrases:
        seeds = [phrase.seed] if phrase.seed is not None else range(max_candidates)
        key = phrase_cache.key(phrase, reference_hash, max_cer) if phrase_cache else ""
        candidate = phrase_cache.get(key, phrase.text, max_cer) if phrase_cache else None
        if candidate is None:
            candidate = select_candidate(
                text=phrase.text, seeds=seeds, max_candidates=max_candidates, max_cer=max_cer,
                synthesize=lambda text, seed, p=phrase: synthesize(text, seed, reference, p.denoise),
                transcribe=transcribe,
            )
            if phrase_cache:
                phrase_cache.put(key, phrase.text, candidate, max_cer)
        chosen.append((candidate, phrase))
    atomic_publish(destination, lambda temporary: encode(
        [(candidate.path, phrase) for candidate, phrase in chosen], temporary
    ))
    raw_dir.mkdir(parents=True, exist_ok=True)
    for index, (candidate, _) in enumerate(chosen, 1):
        _publish_copy(candidate.path, raw_dir / f"{shot_key}-p{index}.wav")
    return {
        "shot": shot_key, "reference": reference,
        "phrases": [{
            "text": phrase.text, "seed": candidate.seed, "cer": candidate.cer,
            "asr": candidate.transcript, "intent": phrase.intent, "emotion": phrase.emotion,
            "emphasis": list(phrase.emphasis), "tempoIntent": phrase.tempo_intent,
            "actualControls": {"seed": candidate.seed, "denoise": phrase.denoise, "reference": reference},
        } for candidate, phrase in chosen],
        "metrics": measure(destination),
    }


def _metric(value: object) -> str:
    return "n/a" if value is None else f"{float(value):.2f}"


def format_voice_report(video_id: str, records: Sequence[dict[str, object]], limitations: Sequence[str]) -> str:
    rows = [
        "| shot | reference | phrase | seed | CER | duration s | silence s | LUFS-I | true peak dB | actual controls |",
        "|---|---|---|---:|---:|---:|---:|---:|---:|---|",
    ]
    for record in records:
        metrics = record["metrics"]
        for phrase in record["phrases"]:
            values = (record["shot"], record["reference"], phrase["text"], phrase["seed"],
                      f"{float(phrase['cer']):.3f}", f"{float(metrics.get('durationSeconds', 0)):.3f}",
                      f"{float(metrics.get('silenceSeconds', 0)):.3f}", _metric(metrics.get("integratedLufs")),
                      _metric(metrics.get("truePeakDb")),
                      json.dumps(phrase["actualControls"], ensure_ascii=False, sort_keys=True))
            rows.append("| " + " | ".join(str(value).replace("|", "\\|") for value in values) + " |")
    notes = ["- Naturalness and emotional delivery: not verified by listening."] + [f"- {x}" for x in limitations]
    return f"# Voice performance report ({video_id})\n\n" + "\n".join(rows) + "\n\n## Limitations\n\n" + "\n".join(notes) + "\n"


def merge_report_rows(existing: str, replacement: str, updated_shots: set[str]) -> str:
    """Keep report rows for clips that were not regenerated in this run."""
    preserved = []
    for line in existing.splitlines():
        if not line.startswith("| "):
            continue
        columns = line.split("|")
        shot = columns[1].strip() if len(columns) > 2 else ""
        if shot not in {"shot", "clip", "---"} and shot not in updated_shots:
            preserved.append(line)
    if not preserved:
        return replacement
    marker = "\n\n## Limitations"
    if marker in replacement:
        return replacement.replace(marker, "\n" + "\n".join(preserved) + marker, 1)
    return replacement.rstrip() + "\n" + "\n".join(preserved) + "\n"


def fetch_models() -> None:
    from huggingface_hub import snapshot_download
    snapshot_download("pnnbao-ump/VieNeu-TTS-v3-Turbo", allow_patterns=["onnx_update/*"], local_dir=str(MODELS / "v3turbo"))
    snapshot_download("OpenMOSS-Team/MOSS-Audio-Tokenizer-Nano-ONNX", local_dir=str(MODELS / "moss-codec"))


def load_tts():
    import vieneu._v3_turbo_engine.onnx_runtime_lite as lite
    from vieneu import Vieneu
    original = lite.OnnxV3LiteEngine.__init__
    def init(engine, *args, **kwargs):
        kwargs.setdefault("codec_dir", str(MODELS / "moss-codec"))
        original(engine, *args, **kwargs)
    lite.OnnxV3LiteEngine.__init__ = init
    return Vieneu(onnx_dir=str(MODELS / "v3turbo" / "onnx_update"))


def ffmpeg(*arguments: str) -> None:
    subprocess.run(["ffmpeg", "-v", "error", "-y", *arguments], check=True)


def pcm16k(path: Path):
    import numpy as np
    result = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-f", "f32le", "-ac", "1", "-ar", "16000", "-"], capture_output=True, check=True)
    return np.frombuffer(result.stdout, np.float32)


def seconds(path: Path) -> float:
    result = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)], capture_output=True, text=True, check=True)
    return float(result.stdout)


def audio_metrics(path: Path) -> dict[str, float | None]:
    result = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", str(path), "-af",
                             "silencedetect=noise=-45dB:d=0.05,ebur128=peak=true", "-f", "null", "-"],
                            capture_output=True, text=True, check=True)
    silence = sum(float(x) for x in re.findall(r"silence_duration:\s*([0-9.]+)", result.stderr))
    loudness = re.findall(r"I:\s*(-?[0-9.]+)\s*LUFS", result.stderr)
    peaks = re.findall(r"Peak:\s*(-?[0-9.]+)\s*dBFS", result.stderr)
    return {"durationSeconds": seconds(path), "silenceSeconds": silence,
            "integratedLufs": float(loudness[-1]) if loudness else None,
            "truePeakDb": float(peaks[-1]) if peaks else None}


def _encode_parts(parts: Sequence[tuple[Path, PhrasePlan]], destination: Path) -> None:
    with tempfile.TemporaryDirectory() as td:
        temp, prepared = Path(td), []
        for index, (raw, phrase) in enumerate(parts):
            wav = temp / f"part-{index}.wav"
            ffmpeg("-i", str(raw), "-af", f"{TRIM},adelay={int(phrase.pause_before*1000)}:all=1,apad=pad_dur={phrase.pause_after}", "-ac", "1", str(wav))
            prepared.append(wav)
        listing = temp / "list.txt"
        listing.write_text("".join(f"file '{path.as_posix()}'\n" for path in prepared), encoding="utf-8")
        joined = temp / "joined.wav"
        ffmpeg("-f", "concat", "-safe", "0", "-i", str(listing), "-c", "copy", str(joined))
        # Preserve delivery dynamics: no atempo, pitch shift, EQ, compression or loudnorm.
        ffmpeg("-i", str(joined), "-c:a", "libmp3lame", "-b:a", "128k", str(destination))


def _resolve_local(value: str | Path) -> Path:
    if re.match(r"^[a-z][a-z0-9+.-]*://", str(value), re.I):
        raise ValueError("voice references must be local files; external uploads are not supported")
    path = Path(value)
    return path if path.is_absolute() else ROOT / path


def parse_args(argv: Sequence[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("video_id")
    parser.add_argument("--ref")
    parser.add_argument("--json")
    parser.add_argument("--performance")
    parser.add_argument("--out-dir")
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--shot", action="append", help="Only generate selected shot key(s)")
    parser.add_argument("--no-cache", action="store_true", help="Regenerate instead of using verified cache")
    parser.add_argument("--tries", type=int, default=3)
    parser.add_argument("--max-cer", type=float, default=0.08)
    return parser.parse_args(argv)


def main(argv: Sequence[str] | None = None) -> int:
    args = parse_args(argv)
    input_path = _resolve_local(args.json or f"docs/{args.video_id}/{'voice.json' if args.performance else 'voice-expressive.json'}")
    lines = json.loads(input_path.read_text(encoding="utf-8"))
    if args.performance:
        performance = json.loads(_resolve_local(args.performance).read_text(encoding="utf-8"))
        plan = build_performance_plan(lines, performance)
    else:
        performance = {"shots": {}}
        _, plan = build_legacy_plan(lines)
    if args.tries < 1:
        raise ValueError("--tries must be at least 1")
    max_candidates = min(args.tries, GLOBAL_MAX_CANDIDATES)
    limitations = ([f"Requested {args.tries} candidates per phrase; capped at {GLOBAL_MAX_CANDIDATES}."]
                   if args.tries > GLOBAL_MAX_CANDIDATES else [])
    out_dir = _resolve_local(args.out_dir or f"public/audio/{args.video_id}")
    if args.shot and (unknown := set(args.shot) - set(plan)):
        raise ValueError(f"unknown shot(s): {sorted(unknown)}")
    manifest_file = out_dir / ".voice-input-manifest.json"
    try:
        manifest = json.loads(manifest_file.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        manifest = {}
    cache = None if args.no_cache else VerifiedPhraseCache(ROOT / "out" / "voice-phrase-cache")
    started = time.perf_counter()
    timings = {"modelLoad": 0.0, "reference": 0.0, "generation": 0.0}
    records = []
    tts = None
    asr = None
    np = None

    def ensure_models():
        nonlocal tts, asr, np
        if tts is None:
            before = time.perf_counter()
            fetch_models()
            tts = load_tts()
            from faster_whisper import WhisperModel
            import numpy as numpy
            np = numpy
            asr = WhisperModel("small", device="cpu", compute_type="int8")
            timings["modelLoad"] += time.perf_counter() - before
    with tempfile.TemporaryDirectory() as td:
        temp = Path(td)
        counter = 0
        def synthesize(text: str, seed: int, ref_audio: str, denoise: bool) -> Path:
            nonlocal counter
            np.random.seed(seed)
            target = temp / f"candidate-{counter}-{seed}.wav"
            counter += 1
            tts.save(tts.infer(text, ref_audio=ref_audio, denoise=denoise), str(target))
            return target
        def transcribe(path: Path) -> str:
            return " ".join(x.text for x in asr.transcribe(pcm16k(path), language="vi")[0]).strip()
        for shot_key, phrases in plan.items():
            if args.shot and shot_key not in args.shot:
                continue
            destination = out_dir / f"{shot_key}.mp3"
            reference_plan = reference_for_shot(performance, shot_key, args.ref)
            reference_source = _resolve_local(reference_plan.source)
            if not reference_source.is_file():
                raise FileNotFoundError(f"reference audio not found: {reference_source}")
            source_hash = sha256_file(reference_source)
            reference_key = cache_key({"source": source_hash, "start": reference_plan.start_seconds,
                                       "duration": reference_plan.duration_seconds})
            identity = shot_identity(phrases, reference_key, args.max_cer)
            if not args.force and not args.no_cache and shot_is_current(destination, manifest, identity):
                print(f"{shot_key}: cache hit (verified shot inputs and output hash)")
                continue
            t0 = time.perf_counter()
            reference_wav = (ROOT / "out" / "voice-reference-cache" / (reference_key + ".wav")) if cache else temp / f"reference-{shot_key}.wav"
            reference_args = []
            if reference_plan.start_seconds is not None:
                reference_args.extend(["-ss", str(reference_plan.start_seconds)])
            reference_args.extend(["-i", str(reference_source)])
            if reference_plan.duration_seconds is not None:
                reference_args.extend(["-t", str(reference_plan.duration_seconds)])
            if not reference_wav.is_file() or reference_wav.stat().st_size == 0 or args.no_cache:
                reference_wav.parent.mkdir(parents=True, exist_ok=True)
                atomic_publish(reference_wav, lambda target: ffmpeg(
                    *reference_args, "-ac", "1", "-c:a", "pcm_s16le", str(target)
                ))
            timings["reference"] += time.perf_counter() - t0
            ensure_models()
            reference_label = reference_plan.source
            if reference_plan.start_seconds is not None or reference_plan.duration_seconds is not None:
                reference_label += (
                    f" [start={reference_plan.start_seconds or 0:.3f}s, "
                    f"duration={reference_plan.duration_seconds if reference_plan.duration_seconds is not None else 'to end'}]"
                )
            t0 = time.perf_counter()
            records.append(generate_shot(
                shot_key=shot_key, phrases=phrases, reference=reference_label, destination=destination,
                raw_dir=out_dir / "raw", max_candidates=max_candidates, max_cer=args.max_cer,
                synthesize=lambda text, seed, _label, denoise, ref=str(reference_wav): synthesize(
                    text, seed, ref, denoise
                ),
                transcribe=transcribe, encode=_encode_parts, measure=audio_metrics,
                phrase_cache=cache, reference_hash=reference_key,
            ))
            timings["generation"] += time.perf_counter() - t0
            manifest[destination.name] = {"identity": identity, "sha256": sha256_file(destination)}
            atomic_publish(manifest_file, lambda p: p.write_text(
                json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8"
            ))
    if records:
        docs = ROOT / "docs" / args.video_id
        report = format_voice_report(args.video_id, records, limitations)
        report_path = docs / "voice-report.md"
        if report_path.exists():
            report = merge_report_rows(
                report_path.read_text(encoding="utf-8"), report,
                {str(record["shot"]) for record in records},
            )
        atomic_publish(report_path, lambda p: p.write_text(report, encoding="utf-8"))
        rows = ["| clip | phrase | seed | CER | ASR |", "|---|---|---:|---:|---|"]
        for record in records:
            for phrase in record["phrases"]:
                rows.append(f"| {record['shot']} | {phrase['text']} | {phrase['seed']} | {float(phrase['cer']):.3f} | {phrase['asr']} |")
        asr_report = (f"# Voice clone ASR check ({args.video_id})\n\nReferences are recorded per shot in `voice-report.md`. Model: VieNeu-TTS v3 Turbo (ONNX/CPU). ASR: faster-whisper small.\n\n" + "\n".join(rows) + "\n")
        asr_path = docs / "voice-clone-asr.md"
        if asr_path.exists():
            asr_report = merge_report_rows(
                asr_path.read_text(encoding="utf-8"), asr_report,
                {str(record["shot"]) for record in records},
            )
        atomic_publish(asr_path, lambda p: p.write_text(asr_report, encoding="utf-8"))
    print(f"VOICE_TIMING model_load={timings['modelLoad']:.2f}s reference={timings['reference']:.2f}s "
          f"generation={timings['generation']:.2f}s total={time.perf_counter()-started:.2f}s "
          f"phrase_cache_hits={cache.hits if cache else 0} phrase_cache_new={cache.misses if cache else 0}")
    start = 0
    for index, shot_key in enumerate(plan):
        duration = seconds(out_dir / f"{shot_key}.mp3")
        frames = math.ceil((duration + (1.4 if index == len(plan)-1 else 0.5)) * 30)
        print(f"{shot_key}: {duration:.2f}s  from={start}  duration={frames}")
        start += frames
    print(f"TOTAL frames={start}  seconds={start/30:.1f}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
