export const projectTypes = [
  { id: "part", label: "Part" },
  { id: "product", label: "Product" },
  { id: "fixture", label: "Fixture" },
  { id: "mechanism", label: "Mechanism" },
  { id: "sheet", label: "Sheet metal" },
  { id: "prototype", label: "Prototype" },
  { id: "other", label: "Other" },
] as const;

export type ProjectTypeId = (typeof projectTypes)[number]["id"];

const typeIds = new Set<string>(projectTypes.map((item) => item.id));

export const intakeLimits = {
  files: 4,
  fileBytes: 4 * 1024 * 1024,
  totalBytes: 4 * 1024 * 1024,
};

export type IntakeFile = {
  name: string;
  type: string;
  bytes: Buffer;
};

export type Intake = {
  reference: string;
  name: string;
  email: string;
  type: ProjectTypeId;
  material: string;
  quantity: string;
  deadline: string;
  description: string;
  detail: string;
  files: IntakeFile[];
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function intakeReference(now = new Date()) {
  const year = String(now.getUTCFullYear()).slice(2);
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  const tail = crypto.randomUUID().replace(/-/g, "").slice(0, 4).toUpperCase();
  return `RED-${year}${month}${day}-${tail}`;
}

export function typeLabel(id: string) {
  return projectTypes.find((item) => item.id === id)?.label ?? id;
}

function clip(value: FormDataEntryValue | null, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

export function readIntake(
  form: FormData,
  reference: string,
): { ok: true; intake: Intake } | { ok: false; error: string } {
  if (clip(form.get("company_website"), 200)) {
    return { ok: false, error: "Could not send this sheet." };
  }

  const name = clip(form.get("name"), 80);
  const email = clip(form.get("email"), 120);
  const type = clip(form.get("type"), 40);
  const description = clip(form.get("description"), 4000);
  const detail = clip(form.get("detail"), 80);

  if (name.length < 2) return { ok: false, error: "Add a name." };
  if (!emailPattern.test(email)) return { ok: false, error: "Add a valid email." };
  if (!typeIds.has(type)) return { ok: false, error: "Choose a project type." };
  if (type === "other" && detail.length < 2) return { ok: false, error: "Say what the other project is." };
  if (description.length < 12) return { ok: false, error: "Describe the job." };

  const files = form
    .getAll("files")
    .filter((file): file is File => file instanceof File && file.size > 0 && file.name.trim().length > 0);

  if (files.length > intakeLimits.files) {
    return { ok: false, error: `Attach up to ${intakeLimits.files} files.` };
  }

  return {
    ok: true,
    intake: {
      reference,
      name,
      email,
      type: type as ProjectTypeId,
      material: clip(form.get("material"), 80),
      quantity: clip(form.get("quantity"), 40),
      deadline: clip(form.get("deadline"), 40),
      description,
      detail: type === "other" ? detail : "",
      files: [],
    },
  };
}

export function intakeSheet(intake: Intake) {
  const line = (index: string, label: string, value: string) =>
    `${index}  ${label.padEnd(14, " ")}${value || "—"}`;

  return [
    "RED INTAKE",
    `REF ${intake.reference}`,
    "",
    line("01", "NAME", intake.name),
    line("02", "EMAIL", intake.email),
    line("03", "TYPE", intake.detail ? `${typeLabel(intake.type)} — ${intake.detail}` : typeLabel(intake.type)),
    line("04", "MATERIAL", intake.material),
    line("05", "QUANTITY", intake.quantity),
    line("06", "DEADLINE", intake.deadline),
    "",
    "NOTES",
    intake.description,
    "",
    "FILES",
    intake.files.length
      ? intake.files.map((file) => `- ${file.name} (${Math.ceil(file.bytes.length / 1024)} KB)`).join("\n")
      : "—",
  ].join("\n");
}
