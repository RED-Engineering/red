import { neon } from "@neondatabase/serverless";

let ready = false;

function databaseUrl() {
  return process.env.DATABASE_URL ?? "";
}

export function isDatabaseConfigured() {
  return Boolean(databaseUrl());
}

function sql() {
  const url = databaseUrl();
  if (!url) throw new Error("DATABASE_URL is not set.");
  return neon(url);
}

async function ensureTable() {
  if (ready) return;
  const query = sql();
  await query`
    CREATE TABLE IF NOT EXISTS free_downloads (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      handle TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await query`
    CREATE INDEX IF NOT EXISTS free_downloads_email_handle
    ON free_downloads (email, handle)
  `;
  ready = true;
}

export async function recordFreeDownload(email: string, handle: string) {
  await ensureTable();
  const query = sql();
  await query`
    INSERT INTO free_downloads (email, handle)
    VALUES (${email}, ${handle})
  `;
}
