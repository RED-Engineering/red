import { NextRequest, NextResponse } from "next/server";
import { intakeLimits, intakeReference, readIntake, type IntakeFile } from "@/lib/intake";
import { intakeWait, writeIntakeStamp } from "@/lib/intake-limit";
import { sendIntake } from "@/lib/intake-mail";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const wait = intakeWait(request);
  const response = NextResponse.json({ ok: true, limited: Boolean(wait), minutes: wait?.minutes ?? 0 });
  writeIntakeStamp(response, request, false);
  return response;
}

export async function POST(request: NextRequest) {
  const wait = intakeWait(request);
  if (wait) {
    return NextResponse.json(
      { ok: false, error: `This device can send again in ${wait.minutes} min.`, minutes: wait.minutes },
      { status: 429 },
    );
  }

  const form = await request.formData();
  const reference = intakeReference();
  const parsed = readIntake(form, reference);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const uploads = form
    .getAll("files")
    .filter((file): file is File => file instanceof File && file.size > 0 && file.name.trim().length > 0);

  let total = 0;
  const files: IntakeFile[] = [];
  for (const file of uploads) {
    if (file.size > intakeLimits.fileBytes || total + file.size > intakeLimits.totalBytes) {
      return NextResponse.json(
        { ok: false, error: "Files must stay within 4 MB total. Send larger CAD to the studio email." },
        { status: 400 },
      );
    }
    total += file.size;
    files.push({
      name: file.name.replace(/[\\/:*?"<>|]+/g, "_").slice(0, 120),
      type: file.type,
      bytes: Buffer.from(await file.arrayBuffer()),
    });
  }

  const intake = { ...parsed.intake, files };

  try {
    const sent = await sendIntake(intake);
    if (!sent.ok) {
      return NextResponse.json({ ok: false, error: sent.error, code: sent.code }, { status: 502 });
    }
  } catch (error) {
    console.error("RED intake mail failed", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      { ok: false, error: "The studio inbox did not accept this sheet." },
      { status: 502 },
    );
  }

  console.info("RED intake sent", reference);
  const response = NextResponse.json({ ok: true, reference });
  writeIntakeStamp(response, request, true);
  return response;
}
