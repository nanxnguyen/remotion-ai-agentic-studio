"""tools/verify_kit.py — confirm every studio file was written exactly (run right after installing).

  python tools/verify_kit.py
Prints MISMATCH/MISSING for any file that differs from the tested version; copy those files again from the plugin kit folder.
(Line endings and leading/trailing blank lines are ignored. Files you customise later, e.g. engine/styles.js, will of course differ.)
"""
import hashlib, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXPECTED = {
    "audio/dsp.py": "589d305d94d8acc3",
    "audio/mix.py": "d1e79b28b62a136c",
    "audio/music.py": "93544e8e00d67d77",
    "audio/sfx.py": "fcd541ecf36d98f9",
    "engine/core.js": "ad1ca46ef40e43f2",
    "engine/ditap.js": "4461518a064cc97e",
    "engine/evolve.js": "7cd27044a2696ce0",
    "engine/explainer.js": "890b6a69ab255413",
    "engine/fx2d.js": "d09f93f6d44366fa",
    "engine/horror.js": "6d7f613446485ec4",
    "engine/motion.js": "740bedc9579eaae8",
    "engine/player.js": "387e85cc817d5fd7",
    "engine/puppet2d.js": "d07ff307c05ec6b8",
    "engine/rig2d.js": "4e7e6022b5103af3",
    "engine/styles.js": "7c50f769687ccac4",
    "engine/three-kit.js": "02e249e302b95420",
    "engine/ui2d.js": "b8f5a4a8a64f55ce",
    "examples/ditap-demo/config.json": "8c83dd2b2a18baa4",
    "examples/ditap-demo/scenes/cast.js": "39357e29e6ea92d2",
    "examples/ditap-demo/scenes/shots/demo.js": "c31172abd2877b15",
    "examples/ditap-demo/scenes/shots/thumb.js": "6725306c877d044d",
    "examples/ditap-demo/story/lint.json": "4f53cda18c2baa0c",
    "examples/ditap-demo/story/scare_lint.json": "4f53cda18c2baa0c",
    "examples/ditap-demo/story/shots.json": "f1db1496128f2dd5",
    "examples/ditap-demo/timeline/beats.json": "64df812cad748c45",
    "examples/evolution-life/config.json": "6754ec953b40801c",
    "examples/evolution-life/scenes/shots/life.js": "d8de51a4215e42ed",
    "examples/evolution-life/story/lint.json": "4f53cda18c2baa0c",
    "examples/evolution-life/story/shots.json": "a10e2010f493fa66",
    "examples/evolution-life/story/stages.json": "64ae66df24499e53",
    "examples/evolution-species/config.json": "e053b6b44a78ccba",
    "examples/evolution-species/scenes/shots/evolution.js": "491ef5969e932552",
    "examples/evolution-species/story/lint.json": "4f53cda18c2baa0c",
    "examples/evolution-species/story/shots.json": "db44940f5f0757a2",
    "examples/evolution-species/story/stages.json": "7e2aeff056408e49",
    "examples/hem-demo/config.json": "2c635645cc13ed72",
    "examples/hem-demo/out/Hẻm_0217__demo.mp4": "41d2030bddb85840",
    "examples/hem-demo/out/thumbnail_1.jpg": "8959f8e36b5ba098",
    "examples/hem-demo/scenes/cast.js": "9dd4404a79881329",
    "examples/hem-demo/scenes/shots/demo.js": "6623895df3f8debb",
    "examples/hem-demo/story/shots.json": "d4087601d8acc374",
    "examples/mascot-explainer/config.json": "e35b985840601810",
    "examples/mascot-explainer/scenes/shots/explainer.js": "c4994f131352f614",
    "examples/mascot-explainer/story/lint.json": "4f53cda18c2baa0c",
    "examples/mascot-explainer/story/rounds.json": "6d30cc51691e4c00",
    "examples/mascot-explainer/story/script.json": "b7eec67eb4707832",
    "examples/mascot-explainer/story/shots.json": "679801dffff8c669",
    "examples/mascot-explainer/timeline/visemes.json": "1584d787781c0fee",
    "examples/mascot-explainer/timeline/words.json": "39025d5f819e508f",
    "examples/motion-lab/config.json": "b06616326f4f942b",
    "examples/motion-lab/scenes/cast.js": "a4b76f833f24e012",
    "examples/motion-lab/scenes/sets/lab.js": "a2da3ca0fff2d8c4",
    "examples/motion-lab/scenes/shots/lab_motion.js": "cec2cf40377522d0",
    "examples/motion-lab/story/lint.json": "4f53cda18c2baa0c",
    "examples/motion-lab/story/shots.json": "14f8a605923d1646",
    "examples/motion-lab/timeline/visemes.json": "00cdff3ebf650b1b",
    "examples/motion-lab/timeline/words.json": "67b3fc7eb073653a",
    "examples/reaction-time/config.json": "9ee341c65b3cfe9a",
    "examples/reaction-time/scenes/cast.js": "e4faad3c508a5cf5",
    "examples/reaction-time/scenes/sets/cafe.js": "fb9adaa553e87b74",
    "examples/reaction-time/scenes/sets/lab.js": "a2da3ca0fff2d8c4",
    "examples/reaction-time/scenes/shots/01_cafe.js": "931e9c360ba052b3",
    "examples/reaction-time/scenes/shots/02_orbit3d.js": "77897bcae80a501e",
    "examples/reaction-time/scenes/shots/03_explain.js": "c22f0e7a8f505c78",
    "examples/reaction-time/story/bible.md": "e22b689a54461b41",
    "examples/reaction-time/story/lint.json": "4f53cda18c2baa0c",
    "examples/reaction-time/story/shots.json": "9b1921e8e42c2498",
    "package.json": "cf956b537326ca58",
    "player.html": "5ffdd7da4a48cd4b",
    "render.mjs": "7fb7245b6804ccbc",
    "tools/beats.py": "eb42a8aef4d87584",
    "tools/common.py": "5cb9e123f452b790",
    "tools/doctor.py": "769e3b41f2845f70",
    "tools/evolution_plan.py": "4b0fd21a7d291184",
    "tools/explainer_plan.py": "0a08b454022976c3",
    "tools/make_thumb.py": "9b53287fe16277e8",
    "tools/new_project.py": "bf8663f8c4a7d075",
    "tools/parse_script.py": "5163cf3162b2579b",
    "tools/scare_lint.py": "693738a2c3c39a41",
    "tools/shot_lint.py": "bd24a068cbdf7506",
    "tools/transcribe.py": "9811589c92da827e",
    "tools/vbee_tts.py": "aa8b056b9bb591b7",
    "tools/visemes.py": "5b26e532958ba07b",
}
bad = 0
for rel, want in EXPECTED.items():
    p = os.path.join(ROOT, *rel.split("/"))
    if not os.path.exists(p):
        print(f"MISSING   {rel}"); bad += 1; continue
    got = hashlib.sha256(open(p, "rb").read().replace(b"\r\n", b"\n").strip()).hexdigest()[:16]
    if got != want:
        print(f"MISMATCH  {rel}"); bad += 1
print(f"{len(EXPECTED) - bad}/{len(EXPECTED)} files verified." + ("" if not bad else "  Copy the files listed above again from the plugin's kit folder, then run this again."))
sys.exit(1 if bad else 0)
