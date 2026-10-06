CREATE TABLE IF NOT EXISTS free_downloads (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  handle TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS free_downloads_email_handle
  ON free_downloads (email, handle);
