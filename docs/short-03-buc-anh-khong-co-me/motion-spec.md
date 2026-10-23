# Motion specification — portrait continuity

The film draws every visual frame at native **60fps**. 18 purposeful shots are grouped into 9 paired emotional chapters. Total 2,652 frames/44.2s, 1080×1920 encoded H.264.

**Actor consistency:** mother = grey bun/glasses/amber cardigan detail; adult Linh = ponytail/amber clip. Childhood Linh reduced in scale only in memories. Preserve stroke widths and body articulation per object.

**Narrative action:** album swipe and startled hands, mother's camera pointing toward birthday, daughter in graduation cap, mother stepping away from dinner frame, daughter reaching into photos, mirrored mother-photographer behind glass, washing dishes, reaching to pull mom into frame, family grouping mom at centre.

**Camera:** one smooth global sinusoidal subpixel path; never reset position or scale at a shot boundary. Full-scene ease-blend over 40 frames around every one of the 17 boundaries.

**Static-text guard:** nine stable titles (one per chapter), not eighteen jittering replacements. Restrained supporting labels / safe lower overlay. Avoid clipping Vietnamese diacritics with DejaVu font.

**QA:** `transition-QA.json` compares six adjacent-frame pairs at all 17 scene boundaries after 135×240 downscale; abort >18 mean-absolute RGB delta. Contact sheet inspection is complementary; motion smoothing and QA score do not prove subjective emotional staging.

**Story objects:** father's/coworker's not introduced. Only mother, Linh, small family group; phone-camera, graduation window, dining table, dishwashing basin, tripod.
