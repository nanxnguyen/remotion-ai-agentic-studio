CREATE TABLE IF NOT EXISTS monitor_snapshot (
  singleton INTEGER PRIMARY KEY CHECK(singleton=1),
  status_json TEXT NOT NULL,
  meta_json TEXT NOT NULL,
  revision INTEGER NOT NULL,
  source TEXT NOT NULL,
  source_updated_at TEXT NOT NULL,
  synced_at TEXT NOT NULL
);
