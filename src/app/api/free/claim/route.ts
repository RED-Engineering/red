import { NextResponse } from "next/server";
import { getFreeProduct } from "@/content/free-products";
import { isDatabaseConfigured, recordFreeDownload } from "@/lib/db";
import { claimCookieName, FREE_CLAIM_MAX_AGE } from "@/lib/free-download";

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { email?: string; handle?: string }
    | null;
  const email = String(body?.email ?? "").trim().toLowerCase();
  const handle = String(body?.handle ?? "").trim();
  const product = getFreeProduct(handle);

  if (!product || !validEmail(email)) {
    return NextResponse.json({ ok: false, error: "A valid email is required." }, { status: 400 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Free downloads are not connected yet." },
      { status: 503 },
    );
  }

  try {
    await recordFreeDownload(email, product.handle);
  } catch (error) {
    console.error("Free download claim failed.", error);
    return NextResponse.json(
      { ok: false, error: "The email could not be saved." },
      { status: 500 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(claimCookieName(product.handle), "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: FREE_CLAIM_MAX_AGE,
    path: "/",
  });
  return response;
}
