# Render evidence — dung-bien-tuoi-30-thanh-ban-an

Final render: `out/dung-bien-tuoi-30-thanh-ban-an-trung-kien-nang-cao-reel.mp4`

- Contract: H.264/AAC, 1080×1920, 30fps, `1549` frames, `51.633333s`.
- Integrated loudness: `-14.7 LUFS`; loudness range `5.4 LU`.
- True/sample peak: `-1.9 dBFS`; delivery normalizer target is `TP=-2.0`.
- A/V duration: one verified container duration `51.633333s`; no audio stream overrun after `-shortest`.
- Ending: BGM envelope is zero from frame `1486` to `1549` (`2.10s`); current paper-wind foley is bounded to `[1481,1505)`, leaving the final `44f / 1.47s` audio tail clear for silence verification.
- Deterministic source contract: 16 scene ranges total `1549f`; motion derives from current frame and no wall-clock/random animation marker was found.
- QA frame extraction: `48` current MP4 stills under `out/qa/`, three per shot across all 16 shot keys; cover is `out/qa/dung-bien-tuoi-30-thanh-ban-an-s01-01.png`.

Known carried risk: the selected local clone snapshot remains `11/16` at the configured CER threshold, with `s1,s3a,s6a,s6b,s10` explicitly open. This evidence does not promote those clips to a clean wording pass; Gate C and Final QA must decide usability against the accepted-risk disposition.
