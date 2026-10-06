import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getFreeProduct } from "@/content/free-products";
import { claimCookieName } from "@/lib/free-download";

export async function GET(request: Request) {
  const handle = new URL(request.url).searchParams.get("handle") ?? "";
  const product = getFreeProduct(handle);
  if (!product) {
    return NextResponse.json({ claimed: false }, { status: 404 });
  }
  const store = await cookies();
  return NextResponse.json({
    claimed: store.get(claimCookieName(product.handle))?.value === "1",
  });
}
