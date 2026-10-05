import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const description = String(form.get("description") ?? "").trim();

  if (!name || !email || !description) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  console.info("RED inquiry", {
    name,
    email,
    type: form.get("type"),
    material: form.get("material"),
    quantity: form.get("quantity"),
    deadline: form.get("deadline"),
    budget: form.get("budget"),
    description,
    additional: form.get("additional"),
    files: form.getAll("files").map((file) =>
      file instanceof File ? { name: file.name, size: file.size, type: file.type } : "none",
    ),
  });

  return NextResponse.json({ ok: true });
}
