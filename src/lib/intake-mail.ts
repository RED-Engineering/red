import { site } from "@/lib/site";
import { intakeSheet, type Intake, typeLabel } from "@/lib/intake";

type SendResult = { ok: true } | { ok: false; error: string; code?: "activation" };

export async function sendIntake(intake: Intake): Promise<SendResult> {
  if (process.env.RESEND_API_KEY) return sendResend(intake);
  return sendFormSubmit(intake);
}

function intakeInboxes() {
  const raw = process.env.INTAKE_INBOX?.trim();
  const list = (raw ? raw.split(/[,;\s]+/) : [site.email]).map((item) => item.trim()).filter(Boolean);
  return [...new Set(list)];
}

async function sendResend(intake: Intake): Promise<SendResult> {
  const results = await Promise.all(intakeInboxes().map((inbox) => sendResendTo(intake, inbox)));
  if (results.some((result) => result.ok)) return { ok: true };
  return { ok: false, error: "The studio inbox did not accept this sheet." };
}

async function sendResendTo(intake: Intake, inbox: string): Promise<SendResult> {
  const from = process.env.RESEND_FROM || "RED <onboarding@resend.dev>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [inbox],
      reply_to: intake.email,
      subject: `RED intake ${intake.reference} — ${intake.name}`,
      text: intakeSheet(intake),
      ...(intake.files.length
        ? {
            attachments: intake.files.map((file) => ({
              filename: file.name,
              content: file.bytes.toString("base64"),
            })),
          }
        : {}),
    }),
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("RED intake mail refused", inbox, response.status, detail.slice(0, 300));
    return { ok: false, error: "The studio inbox did not accept this sheet." };
  }

  return { ok: true };
}

async function sendFormSubmit(intake: Intake): Promise<SendResult> {
  const payload = new FormData();
  payload.set("_subject", `RED intake ${intake.reference} — ${intake.name}`);
  payload.set("_template", "table");
  payload.set("_captcha", "false");
  payload.set("_url", `${site.url}/contact`);
  payload.set("_replyto", intake.email);
  payload.set("reference", intake.reference);
  payload.set("name", intake.name);
  payload.set("email", intake.email);
  payload.set("project", typeLabel(intake.type));
  payload.set("material", intake.material || "—");
  payload.set("quantity", intake.quantity || "—");
  payload.set("deadline", intake.deadline || "—");
  payload.set("notes", intake.description);
  payload.set(
    "files",
    intake.files.length ? intake.files.map((file) => file.name).join(", ") : "—",
  );
  for (const file of intake.files) {
    payload.append("attachment", new Blob([new Uint8Array(file.bytes)]), file.name);
  }

  const sent = await postFormSubmit(payload);
  if (sent.ok || intake.files.length === 0) return sent;

  for (const file of intake.files) payload.delete("attachment");
  payload.set("files", `${payload.get("files")} — not attached`);
  const retry = await postFormSubmit(payload);
  return retry.ok ? retry : sent;
}

async function postFormSubmit(payload: FormData): Promise<SendResult> {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(site.email)}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Referer: `${site.url}/contact`,
    },
    body: payload,
    signal: AbortSignal.timeout(15000),
  });
  const data = (await response.json().catch(() => null)) as { success?: string; message?: string } | null;
  if (String(data?.success) === "true") return { ok: true };

  const message = data?.message || "The studio inbox did not accept this sheet.";
  if (/activation/i.test(message)) {
    return {
      ok: false,
      code: "activation",
      error: `Mail delivery needs a one-time confirmation. Open ${site.email}, activate the form, then send this sheet again.`,
    };
  }
  console.error("RED intake mail refused", message);
  return { ok: false, error: "The studio inbox did not accept this sheet." };
}
