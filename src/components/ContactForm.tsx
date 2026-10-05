"use client";

import { useState } from "react";
import { RedButton } from "@/components/RedButton";

const fields = [
  { name: "name", label: "NAME", type: "text", required: true },
  { name: "email", label: "EMAIL", type: "email", required: true },
  { name: "type", label: "PROJECT TYPE", type: "text", required: true },
  { name: "material", label: "MATERIAL", type: "text", required: false },
  { name: "quantity", label: "QUANTITY", type: "text", required: false },
  { name: "deadline", label: "DEADLINE", type: "text", required: false },
  { name: "budget", label: "BUDGET", type: "text", required: false },
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(formData: FormData) {
    setStatus("sending");
    const response = await fetch("/api/contact", { method: "POST", body: formData });
    setStatus(response.ok ? "ok" : "error");
  }

  if (status === "ok") {
    return (
      <div className="rounded-[4px] border border-paper/10 bg-panel p-8 shadow-[0_30px_80px_rgba(0,0,0,0.2)]">
        <div className="flex items-center gap-3">
          <span className="red-led" aria-hidden />
          <p className="tech text-red">RECEIVED</p>
        </div>
        <h2 className="mt-4 text-4xl tracking-tight">PROJECT RECEIVED.</h2>
        <p className="mt-4 max-w-md text-mist">
          We’ll review the information and respond with the next step.
        </p>
      </div>
    );
  }

  return (
    <form action={onSubmit} className="overflow-hidden rounded-[4px] border border-paper/10 bg-panel shadow-[0_30px_80px_rgba(0,0,0,0.2)]">
      <div className="grid gap-px bg-paper/10 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className="block bg-panel p-5 transition-colors focus-within:bg-charcoal">
            <span className="tech">{field.label}</span>
            <input
              name={field.name}
              type={field.type}
              required={field.required}
              className="mt-3 w-full border-0 border-b border-paper/20 bg-transparent py-2 text-paper outline-none focus:border-red"
            />
          </label>
        ))}
        <label className="block bg-panel p-5 transition-colors focus-within:bg-charcoal sm:col-span-2">
          <span className="tech">DESCRIPTION</span>
          <textarea
            name="description"
            required
            rows={6}
            className="mt-3 w-full resize-y border-0 border-b border-paper/20 bg-transparent py-2 text-paper outline-none focus:border-red"
          />
        </label>
        <label className="block bg-panel p-5 transition-colors focus-within:bg-charcoal sm:col-span-2">
          <span className="tech">REFERENCE FILES</span>
          <p className="mt-2 font-mono text-[11px] tracking-[0.12em] text-mute">
            CAD · PDF · DXF · STEP · STL · IMAGES · OTHER
          </p>
          <input
            name="files"
            type="file"
            multiple
            accept=".step,.stp,.stl,.dxf,.pdf,.png,.jpg,.jpeg,.zip,.ai,.svg"
            className="mt-4 w-full text-sm text-mist file:mr-4 file:border file:border-paper/20 file:bg-transparent file:px-3 file:py-2 file:font-mono file:text-[11px] file:tracking-[0.14em] file:text-paper"
          />
        </label>
        <label className="block bg-panel p-5 transition-colors focus-within:bg-charcoal sm:col-span-2">
          <span className="tech">ADDITIONAL INFORMATION</span>
          <textarea
            name="additional"
            rows={4}
            className="mt-3 w-full resize-y border-0 border-b border-paper/20 bg-transparent py-2 text-paper outline-none focus:border-red"
          />
        </label>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-paper/10 bg-charcoal p-5">
        {status === "error" ? (
          <p className="font-mono text-[12px] text-red">Could not send. Try again.</p>
        ) : (
          <p className="tech">INTAKE / RED</p>
        )}
        <RedButton type="submit" disabled={status === "sending"}>
          {status === "sending" ? "SENDING" : "SEND PROJECT"}
        </RedButton>
      </div>
    </form>
  );
}
