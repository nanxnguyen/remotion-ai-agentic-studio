# V6 approved plan — implementation checkpoint (2026-10-25)

Owner approved hybrid cinematic B with 7 tasks and V5 preservation.

## Environment ruling
No true subagent dispatch tool is installed in this chat; do not falsely label sequential local work as independently reviewed Superpowers subagents. Local runtime cannot clone repo due github.com DNS failure, so cannot run the canonical Remotion pipeline here. This is an execution blocker, **not approval to skip gates**.

## Completed local work (isolated temporary workspace)
- Task 1 preflight: source V5 bundle extracted; **all 16 original Vbee MP3 SHA-256 match `measured-timeline.json`**; all 16 inherited scene PNGs measured at **540×960**, marked reference-only and rejected as native Full HD final assets.
- Task 2: local deterministic timeline with `fps=60`, `total_frames=3600`, 16 visual scenes and separately scheduled genuine Vbee recordings; no overlapping voice clips. Last audio event ends frame **3592**, and seven critical proof windows are `pending_visual_review`.
- Local TDD trace: ImportError failures before implementation; 7 unit tests later passed using `python -m unittest discover -s tests -v`. Those tests cover asset metadata/hash rejection, 16 genuine voice checks, timeline length and voice nonoverlap, plus seven P0 markers. Local tested scripts and manifests preserved in conversation as `laundry-v6-partial-implementation.zip`.

## Remaining unfinished; FINAL PROHIBITED
1. Task 3: seven clean physical action scenes are not yet generated or visually inspected.
2. Task 4: Remotion composition and `src/videos/registry.ts` registration have not been implemented.
3. Task 5: V6 MP4 has not been rendered; no `npm run verify`, `npm run test:visual`, pipeline reviewer gates, full-audio listening, or actual MP4 P0 proof has passed.
4. Task 6: no V6 picture to compare with V5.
5. Task 7: no V6 Drive upload, do not create new numbered folder, keep movie #18 and V5 unchanged.

V5 remains https://drive.google.com/file/d/1REkgLXtROoxACwF0eFMJg9WeYA01kuZf/view?usp=drivesdk in folder https://drive.google.com/drive/folders/1d_Enij2nqNu8FIrt1Bmv4wrTaLeBwxqN .

This checkpoint is not a final QA report or a claim of 7 task completion.
