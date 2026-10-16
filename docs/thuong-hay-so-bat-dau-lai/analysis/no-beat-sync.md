# Beat analysis — thuong-hay-so-bat-dau-lai: no beat sync

BGM `public/audio/thuong-hay-so-bat-dau-lai/bgm.mp3` là pad tổng hợp từ
`scripts/gen-bgm-soft.py`: progression C–Am–F–G, arp sine mềm 72 BPM danh nghĩa,
không có kick/snare/hihat transient, attack慢 (pad swell 1.2s + arp decay exp).
Không tồn tại "beat rõ" để fit grid — mọi tiêu chí music-beat-sync §3
(match ≥98%, mean err <10ms, drift <5ms, beat 0 trên attack) đều vô nghĩa trên phổ này.

Quyết định: **no beat sync, bỏ qua beat_data.json + grid_drift.json.**
Cuts và SFX trong video này land trên voice accent và visual action
(nồi "cạch", chìa "lạch cạch", freeze, grade hội tụ, lặng cuối) — đúng bản chất story mềm.
Không cần click track hay hồi quy kiểm tra.
