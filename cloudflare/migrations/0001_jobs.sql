CREATE TABLE IF NOT EXISTS jobs (
 id TEXT PRIMARY KEY,
 video_id TEXT NOT NULL,
 status TEXT NOT NULL CHECK(status IN ('queued','running','completed','failed')),
 created_at TEXT NOT NULL,
 updated_at TEXT NOT NULL,
 result_key TEXT,
 error TEXT
);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status,created_at);
