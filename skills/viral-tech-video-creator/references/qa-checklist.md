# QA execution checklist
1. Read README/docs and source URLs; validate claims against `research.md`.
2. Check installed package versions, credentials availability (presence only, never reveal values), and licenses.
3. Listen to final spoken track for correct Vietnamese pronunciation and timing.
4. Confirm the viewer's pain is concrete, the story uses one situation, and the product value is explainable in one sentence.
5. Read narration aloud; rewrite brochure phrases, feature lists, forced slang and sentences that sound unnatural.
6. Confirm the first smile beat lands within 6 seconds and each later joke supports the explanation without mocking the viewer.
7. Measure narration against timeline; fix mismatch in script or animation.
8. Verify subtitle UTF-8, correct Vietnamese diacritics, synced start/end, no unsafe margins.
9. Validate no unlicensed screenshots, music, SFX, third-party logos used misleadingly.
10. Render preview, inspect 0s/1s/3s/6s/mid/end; verify readable typography and comedy setup/payoff.
11. Render final and verify via ffprobe: H264, AAC, 1080x1920, 30fps, 30–45s.
12. Watch with sound and without; narration understandable and story still coherent.
13. Package sources and exact run instructions; report any uncompleted requirement explicitly.
