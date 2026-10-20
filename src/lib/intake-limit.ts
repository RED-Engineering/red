import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

const COOKIE = "red_intake";
const HOUR = 60 * 60 * 1000;

type Stamp = { id: string; at: number };

function sign(body: string) {
  const secret = process.env.RESEND_API_KEY || process.env.INTAKE_LIMIT_SECRET || "red-intake-dev";
  return createHmac("sha256", secret).update(body).digest("base64url");
}

function encode(stamp: Stamp) {
  const body = Buffer.from(JSON.stringify(stamp)).toString("base64url");
  return `${body}.${sign(body)}`;
}

function decode(token: string | undefined): Stamp | null {
  if (!token) return null;
  const [body, mac] = token.split(".");
  if (!body || !mac) return null;
  const expected = sign(body);
  const left = Buffer.from(mac);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(body, "base64url").toString()) as Stamp;
    if (typeof parsed.id !== "string" || typeof parsed.at !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function intakeWait(request: NextRequest) {
  const stamp = decode(request.cookies.get(COOKIE)?.value);
  if (!stamp?.at) return null;
  const left = HOUR - (Date.now() - stamp.at);
  if (left <= 0) return null;
  return { minutes: Math.max(1, Math.ceil(left / 60000)) };
}

export function writeIntakeStamp(response: NextResponse, request: NextRequest, sent: boolean) {
  const current = decode(request.cookies.get(COOKIE)?.value);
  const stamp: Stamp = {
    id: current?.id || crypto.randomUUID(),
    at: sent ? Date.now() : (current?.at ?? 0),
  };
  response.cookies.set(COOKIE, encode(stamp), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 400,
    secure: process.env.NODE_ENV === "production",
  });
}
