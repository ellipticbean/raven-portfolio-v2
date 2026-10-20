-- Run against the dedicated raven-portfolio-guestbook D1 database.
CREATE TABLE IF NOT EXISTS guestbook_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL CHECK (length(name) BETWEEN 1 AND 40),
  message TEXT NOT NULL CHECK (length(message) BETWEEN 1 AND 500),
  ip_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  moderation_status TEXT NOT NULL DEFAULT 'visible'
    CHECK (moderation_status IN ('visible', 'hidden'))
);

CREATE INDEX IF NOT EXISTS idx_guestbook_visible_recent
  ON guestbook_entries (moderation_status, id DESC);
CREATE INDEX IF NOT EXISTS idx_guestbook_ip_recent
  ON guestbook_entries (ip_hash, created_at DESC);

CREATE TABLE IF NOT EXISTS guestbook_stats (
  key TEXT PRIMARY KEY,
  value INTEGER NOT NULL DEFAULT 0
);
INSERT OR IGNORE INTO guestbook_stats (key, value) VALUES ('page_views', 0);
