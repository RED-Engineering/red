"use client";

import { useState } from "react";
import { RedButton } from "@/components/RedButton";

const fields = [
  { name: "name", label: "Name", type: "text", required: true, placeholder: "Your name" },
  { name: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
  { name: "type", label: "Project type", type: "text", required: true, placeholder: "Part, product, fixture…" },
  { name: "material", label: "Material", type: "text", required: false, placeholder: "Optional" },
  { name: "quantity", label: "Quantity", type: "text", required: false, placeholder: "Optional" },
  { name: "deadline", label: "Deadline", type: "text", required: false, placeholder: "Optional" },
  { name: "budget", label: "Budget", type: "text", required: false, placeholder: "Optional" },
] as const;

const fieldClass =
  "mt-1.5 w-full rounded-[2px] border border-paper/12 bg-paper/[0.04] px-3 py-2 text-[15px] leading-6 text-paper outline-none placeholder:text-mute/80 focus:border-red";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(formData: FormData) {
    setStatus("sending");
    const response = await fetch("/api/contact", { method: "POST", body: formData });
    setStatus(response.ok ? "ok" : "error");
  }

  if (status === "ok") {
    return (
      <div className="glass-media rounded-[8px] p-6">
        <p className="tech text-red">RECEIVED</p>
        <h2 className="mt-3 text-3xl tracking-tight">PROJECT RECEIVED.</h2>
        <p className="mt-3 text-[15px] leading-7 text-mist">
          We’ll review the information and respond with the next step.
        </p>
      </div>
    );
  }

  return (
    <form action={onSubmit} className="glass-media rounded-[8px] p-5 md:p-6">
      <p className="tech text-red">INTAKE</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <label
            key={field.name}
            className={field.name === "type" ? "block sm:col-span-2" : "block"}
          >
            <span className="text-[13px] font-medium text-mist">
              {field.label}
              {field.required ? <span className="text-red"> *</span> : null}
            </span>
            <input
              name={field.name}
              type={field.type}
              required={field.required}
              placeholder={field.placeholder}
              className={fieldClass}
            />
          </label>
        ))}
        <label className="block sm:col-span-2">
          <span className="text-[13px] font-medium text-mist">
            Description <span className="text-red">*</span>
          </span>
          <textarea
            name="description"
            required
            rows={4}
            placeholder="What it has to do, constraints, and anything already decided."
            className={`${fieldClass} min-h-[6.5rem] resize-y`}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-[13px] font-medium text-mist">Files</span>
          <span className="mt-0.5 block text-[12px] leading-5 text-mute">
            STEP, STL, DXF, PDF, images, ZIP
          </span>
          <input
            name="files"
            type="file"
            multiple
            accept=".step,.stp,.stl,.dxf,.pdf,.png,.jpg,.jpeg,.zip,.ai,.svg"
            className="mt-2 w-full text-[13px] text-mist file:mr-3 file:rounded-[2px] file:border file:border-paper/15 file:bg-transparent file:px-3 file:py-1.5 file:text-[12px] file:font-medium file:text-paper"
          />
        </label>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        {status === "error" ? (
          <p className="text-[13px] text-red">Could not send. Try again.</p>
        ) : (
          <p className="text-[12px] text-mute">Required fields marked *</p>
        )}
        <RedButton type="submit" disabled={status === "sending"}>
          {status === "sending" ? "SENDING" : "SEND PROJECT"}
        </RedButton>
      </div>
    </form>
  );
}
