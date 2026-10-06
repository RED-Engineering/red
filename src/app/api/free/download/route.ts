import { createReadStream } from "node:fs";
import { access } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getFreeProduct } from "@/content/free-products";
import { claimCookieName } from "@/lib/free-download";

function mimeFor(name: string) {
  const ext = name.split(".").pop()?.toLowerCase();
  if (ext === "zip") return "application/zip";
  if (ext === "pdf") return "application/pdf";
  if (ext === "stl") return "model/stl";
  if (ext === "step" || ext === "stp") return "application/step";
  if (ext === "dxf") return "application/dxf";
  return "application/octet-stream";
}

function localFile(downloadPath: string) {
  const root = path.resolve(process.cwd(), "private", "free");
  const file = path.resolve(root, downloadPath);
  if (!file.startsWith(root + path.sep) && file !== root) return null;
  return file;
}

export async function GET(request: Request) {
  const handle = new URL(request.url).searchParams.get("handle") ?? "";
  const product = getFreeProduct(handle);
  if (!product) {
    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }

  const store = await cookies();
  if (store.get(claimCookieName(product.handle))?.value !== "1") {
    return NextResponse.json({ error: "Enter an email to download this file." }, { status: 401 });
  }

  const filename = product.downloadName || `${product.handle}.zip`;
  const headers = {
    "Content-Type": mimeFor(filename),
    "Content-Disposition": `attachment; filename="${filename.replace(/"/g, "")}"`,
    "Cache-Control": "no-store",
  };

  if (product.downloadUrl) {
    const remote = await fetch(product.downloadUrl);
    if (!remote.ok || !remote.body) {
      return NextResponse.json({ error: "The file is not available." }, { status: 502 });
    }
    return new NextResponse(remote.body, { headers });
  }

  if (!product.downloadPath) {
    return NextResponse.json({ error: "The file is not available." }, { status: 404 });
  }

  const file = localFile(product.downloadPath);
  if (!file) {
    return NextResponse.json({ error: "The file is not available." }, { status: 400 });
  }

  try {
    await access(file);
  } catch {
    return NextResponse.json({ error: "The file is not available." }, { status: 404 });
  }

  const stream = Readable.toWeb(createReadStream(file)) as ReadableStream;
  return new NextResponse(stream, { headers });
}
