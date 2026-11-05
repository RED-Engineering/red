"use client";

import { useState } from "react";
import { DrawingSheet } from "@/components/DrawingSheet";
import type { DrawingId } from "@/content/types";

const capabilities: {
  number: string;
  title: string;
  hint: string;
  description: string;
  receive: string;
  caption: string;
  drawing: DrawingId;
}[] = [
  {
    number: "01",
    title: "A part to cut and bend",
    caption: "BRACKET",
    hint: "Brackets, covers, panels, and formed sheet-metal parts.",
    description:
      "RED models the 3D shape, the flat pattern (the sheet unfolded, with bend lines), and the drawing a fabricator follows.",
    receive: "The model, the flat pattern, and the drawings for that part.",
    drawing: "mount",
  },
  {
    number: "02",
    title: "An enclosure or frame",
    caption: "ENCLOSURE",
    hint: "Housings, machine covers, and structures that have to fit equipment.",
    description:
      "The work covers openings, joints, and how the pieces assemble, so the enclosure can actually be made.",
    receive: "A design checked for fit and assembly, plus the drawings in the agreed scope.",
    drawing: "control",
  },
  {
    number: "03",
    title: "Parts that must fit and move",
    caption: "ASSEMBLY",
    hint: "Mechanisms, mounts, and assemblies.",
    description: "Parts that meet, hold, or move. Mechanical engineering of a physical object.",
    receive: "The assembly model and drawings for the parts that were agreed.",
    drawing: "hinge",
  },
  {
    number: "04",
    title: "Files a fabricator can use",
    caption: "DRAWING",
    hint: "The design exists. It is not yet ready to cut.",
    description:
      "CAD is the 3D file. RED adds flat patterns, dimensioned drawings, and a BOM — the parts list — where the job needs them.",
    receive: "Production files for the scope you agree.",
    drawing: "fixture",
  },
  {
    number: "05",
    title: "A design that needs a change",
    caption: "REVISION",
    hint: "An existing part that does not fit, or will not manufacture cleanly.",
    description: "RED revises the model against the requirement you name.",
    receive: "The revised model and updated drawings for the change that was agreed.",
    drawing: "mount",
  },
  {
    number: "06",
    title: "More engineering capacity",
    caption: "SUPPORT",
    hint: "Your team has the projects and needs another person on the CAD.",
    description:
      "One defined task, or ongoing support. You do not have to hand over a whole product.",
    receive: "The models and drawings for the tasks you assign.",
    drawing: "control",
  },
];

export function CapabilitySystem() {
  const [active, setActive] = useState(0);
  const selected = capabilities[active];

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <div className="border-t border-paper/10">
          {capabilities.map((capability, index) => (
            <button
              key={capability.number}
              type="button"
              aria-pressed={active === index}
              className={`group grid w-full grid-cols-[46px_1fr_auto] items-start gap-3 border-b border-paper/10 py-5 text-left transition-colors ${
                active === index ? "text-paper" : "text-mute hover:text-paper"
              }`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <span className="pt-1 font-display text-xl font-bold text-red">{capability.number}</span>
              <span>
                <span className="block font-display text-xl font-semibold tracking-[0.025em] md:text-2xl">
                  {capability.title}
                </span>
                <span className="mt-1 block font-sans text-[15px] leading-6 font-medium tracking-normal text-mist normal-case">
                  {capability.hint}
                </span>
              </span>
              <span
                aria-hidden
                className={`h-2 w-2 rounded-full bg-red transition-[opacity,transform] ${
                  active === index ? "scale-100 opacity-100" : "scale-50 opacity-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5 lg:col-start-8">
        <DrawingSheet
          drawing={selected.drawing}
          code={`CAP-${selected.number}`}
          revision="CURRENT"
          fig={`SYSTEM / ${selected.number}`}
          caption={selected.caption}
          tall
        />
        <p className="mt-6 max-w-lg text-lg leading-8 text-mist">{selected.description}</p>
        <p className="mt-4 max-w-lg text-[15px] leading-7 text-paper">
          <span className="text-red">You receive. </span>
          {selected.receive}
        </p>
      </div>
    </div>
  );
}
