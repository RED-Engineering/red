"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { RedButton } from "@/components/RedButton";
import { intakeLimits, projectTypes } from "@/lib/intake";

const ease = [0.45, 0.05, 0.2, 1] as const;

const materials = ["Steel", "Aluminium", "Polymer", "Brass", "Other"] as const;

const fieldClass =
  "h-11 w-full rounded-[2px] border border-paper/22 bg-ink/35 px-3 text-[15px] leading-none text-paper outline-none transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.45,0.05,0.2,1)] placeholder:text-mute focus:border-red focus:bg-ink/55";

function choiceClass(selected: boolean) {
  return `rounded-[2px] border px-3 py-2.5 transition-[border-color,background-color,color] duration-500 ease-[cubic-bezier(0.45,0.05,0.2,1)] ${
    selected
      ? "border-red bg-red/15 text-paper"
      : "border-paper/20 bg-ink/25 text-mist hover:border-paper/45 hover:text-paper"
  }`;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.ceil(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ContactForm() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [type, setType] = useState("");
  const [material, setMaterial] = useState("");
  const [materialOther, setMaterialOther] = useState("");
  const [grade, setGrade] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [hold, setHold] = useState<number | null>(null);

  useEffect(() => {
    let cancel = false;
    fetch("/api/contact")
      .then((response) => response.json())
      .then((body: { limited?: boolean; minutes?: number }) => {
        if (!cancel && body?.limited) setHold(body.minutes || 60);
      })
      .catch(() => undefined);
    return () => {
      cancel = true;
    };
  }, []);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files];
    for (const file of list) {
      if (next.some((item) => item.name === file.name && item.size === file.size)) continue;
      next.push(file);
    }
    const total = next.reduce((sum, file) => sum + file.size, 0);
    if (next.length > intakeLimits.files || total > intakeLimits.totalBytes) {
      setError("Keep files to 4, and 4 MB total.");
      setStatus("error");
      return;
    }
    setError("");
    if (status === "error") setStatus("idle");
    setFiles(next);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (hold) return;
    const form = event.currentTarget;
    if (!type) {
      setStatus("error");
      setError("Choose a project type.");
      return;
    }

    const materialName = material === "Other" ? materialOther.trim() : material;
    if (material === "Other" && materialName.length < 2) {
      setStatus("error");
      setError("Say what the other material is.");
      return;
    }

    const data = new FormData(form);
    data.set("type", type);
    data.set("material", [materialName, grade].filter(Boolean).join(", "));
    data.delete("material_other");
    if (type !== "other") data.delete("detail");
    data.delete("files");
    for (const file of files) data.append("files", file);

    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/contact", { method: "POST", body: data });
      const body = (await response.json().catch(() => null)) as {
        ok?: boolean;
        reference?: string;
        error?: string;
        minutes?: number;
      } | null;
      if (response.status === 429) {
        setHold(body?.minutes || 60);
        setStatus("error");
        setError(body?.error || "This device can send again in an hour.");
        return;
      }
      if (!response.ok || !body?.ok || !body.reference) {
        setStatus("error");
        setError(body?.error || "Could not send. Try again.");
        return;
      }
      setReference(body.reference);
      setStatus("ok");
    } catch {
      setStatus("error");
      setError("Could not send. Try again.");
    }
  }

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.9, ease }}
    >
      <AnimatePresence mode="wait">
        {status === "ok" ? (
          <motion.section
            key="received"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.7, ease }}
            className="glass-media overflow-hidden rounded-[2px] px-6 py-8 md:px-8"
          >
            <p className="tech text-red">RED / INTAKE</p>
            <h2 className="run-round mt-3 text-4xl">Received.</h2>
            <p className="mt-6 font-mono text-[13px] tracking-[0.16em] text-paper">{reference}</p>
          </motion.section>
        ) : (
          <motion.form
            key="sheet"
            onSubmit={onSubmit}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease }}
            className="glass-media overflow-hidden rounded-[2px]"
          >
            <div className="hidden" aria-hidden>
              <label>
                Company website
                <input name="company_website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="border-b border-paper/12 px-5 py-5 sm:px-6">
              <p className="tech text-red">RED / INTAKE</p>
              <h2 className="run-round mt-2 text-[2rem] leading-none">Project brief</h2>
            </div>

            <div className="px-5 sm:px-6">
              <Block index="01" label="Client">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name">
                    <input name="name" required autoComplete="name" className={fieldClass} />
                  </Field>
                  <Field label="Email">
                    <input name="email" type="email" required autoComplete="email" className={fieldClass} />
                  </Field>
                </div>
              </Block>

              <Block index="02" label="Project">
                <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Project type">
                  {projectTypes.map((item) => {
                    const selected = type === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setType(item.id)}
                        className="relative min-w-0 flex-[1_1_calc(50%-0.1875rem)] overflow-hidden rounded-[2px] px-3 py-2.5 text-left sm:flex-[1_1_calc(25%-0.3rem)]"
                      >
                        {selected ? (
                          <motion.span
                            layoutId={reduce ? undefined : "intake-type"}
                            className="absolute inset-0 rounded-[2px] border border-red bg-red/15"
                            transition={{ duration: 0.7, ease }}
                          />
                        ) : (
                          <span className="absolute inset-0 rounded-[2px] border border-paper/20 bg-ink/25" />
                        )}
                        <span className={`run-round relative text-[15px] leading-none ${selected ? "text-paper" : "text-mist"}`}>
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <AnimatePresence initial={false}>
                  {type === "other" ? (
                    <motion.div
                      key="other"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.55, ease }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3">
                        <Field label="What else">
                          <input name="detail" required minLength={2} className={fieldClass} />
                        </Field>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </Block>

              <Block index="03" label="Build">
                <p className="tech">Material</p>
                <div className="intake-picks mt-2">
                  {materials.map((item) => {
                    const selected = material === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setMaterial(selected ? "" : item)}
                        className={choiceClass(selected)}
                      >
                        <span className="run-round text-[15px] leading-none">{item}</span>
                      </button>
                    );
                  })}
                </div>
                <AnimatePresence initial={false}>
                  {material === "Other" ? (
                    <motion.div
                      key="material-other"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.55, ease }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3">
                        <Field label="What else">
                          <input
                            name="material_other"
                            required
                            minLength={2}
                            value={materialOther}
                            onChange={(event) => setMaterialOther(event.target.value)}
                            className={fieldClass}
                          />
                        </Field>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
                <div className="intake-specs mt-4">
                  <Field label="Grade">
                    <input
                      value={grade}
                      onChange={(event) => setGrade(event.target.value)}
                      placeholder="S355"
                      className={fieldClass}
                    />
                  </Field>
                  <Field label="Quantity">
                    <input name="quantity" inputMode="numeric" placeholder="Pcs" className={fieldClass} />
                  </Field>
                  <Field label="Need by">
                    <input name="deadline" type="date" className={`${fieldClass} [color-scheme:dark]`} />
                  </Field>
                </div>
              </Block>

              <Block index="04" label="Job">
                <Field label="What it has to do">
                  <textarea
                    name="description"
                    required
                    minLength={12}
                    rows={6}
                    className="intake-pad min-h-48 w-full resize-y rounded-[2px] border border-paper/22 outline-none focus:border-red"
                  />
                </Field>
              </Block>

              <Block index="05" label="Files">
                <label className="flex cursor-pointer items-center justify-between gap-4 rounded-[2px] border border-dashed border-paper/30 px-4 py-3.5 transition-colors duration-500 hover:border-red">
                  <span>
                    <span className="tech text-paper">Add files</span>
                    <span className="mt-1 block font-mono text-[10px] tracking-[0.08em] text-mute">
                      STEP · STL · DXF · PDF · PNG · ZIP · 4 MB
                    </span>
                  </span>
                  <span aria-hidden className="font-mono text-lg text-red">
                    +
                  </span>
                  <input
                    type="file"
                    multiple
                    accept=".step,.stp,.stl,.dxf,.pdf,.png,.jpg,.jpeg,.zip,.svg"
                    className="sr-only"
                    onChange={(event) => {
                      addFiles(event.target.files);
                      event.target.value = "";
                    }}
                  />
                </label>
                <AnimatePresence initial={false}>
                  {files.length > 0 ? (
                    <motion.ul
                      initial={reduce ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="mt-2 overflow-hidden rounded-[2px] border border-paper/15"
                    >
                      {files.map((file) => (
                        <li key={`${file.name}-${file.size}`} className="flex items-center justify-between gap-3 border-b border-paper/10 px-3 py-2 last:border-b-0">
                          <span className="min-w-0 truncate text-[14px] text-paper">{file.name}</span>
                          <span className="flex shrink-0 items-center gap-3">
                            <span className="font-mono text-[11px] text-mute">{formatSize(file.size)}</span>
                            <button
                              type="button"
                              className="tech text-red"
                              onClick={() => setFiles((current) => current.filter((item) => item !== file))}
                            >
                              Remove
                            </button>
                          </span>
                        </li>
                      ))}
                    </motion.ul>
                  ) : null}
                </AnimatePresence>
              </Block>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-paper/12 px-5 py-5 sm:px-6">
              {hold || status === "error" ? (
                <p className="max-w-sm text-[13px] leading-5 text-red">
                  {hold ? `This device can send again in ${hold} min.` : error}
                </p>
              ) : (
                <span />
              )}
              <RedButton type="submit" disabled={status === "sending" || Boolean(hold)}>
                {status === "sending" ? "SENDING" : "SEND"}
              </RedButton>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Block({ index, label, children }: { index: string; label: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-paper/12 py-5 last:border-b-0">
      <div className="mb-3 flex items-baseline gap-3">
        <span className="font-mono text-[11px] tracking-[0.14em] text-red">{index}</span>
        <p className="tech text-paper">{label}</p>
      </div>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="tech">{label}</span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}
