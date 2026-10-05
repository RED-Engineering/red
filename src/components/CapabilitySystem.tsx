"use client";

import { useState } from "react";
import { DrawingSheet } from "@/components/DrawingSheet";
import type { DrawingId } from "@/content/types";

const capabilities: {
  number: string;
  title: string;
  description: string;
  drawing: DrawingId;
}[] = [
  {
    number: "01",
    title: "CAD & PRODUCT DESIGN",
    description: "Production-ready parts, assemblies, drawings and design development.",
    drawing: "control",
  },
  {
    number: "02",
    title: "MECHANICAL ENGINEERING",
    description: "Mechanisms, interfaces, fit, movement and practical problem solving.",
    drawing: "hinge",
  },
  {
    number: "03",
    title: "SHEET METAL ENGINEERING",
    description: "Flat patterns, bend strategy, reliefs, hardware and assembly planning.",
    drawing: "mount",
  },
  {
    number: "04",
    title: "PROTOTYPING",
    description: "Physical test articles used to find problems before production.",
    drawing: "fixture",
  },
  {
    number: "05",
    title: "MANUFACTURING",
    description: "CNC, laser, waterjet, bending, finishing and assembly coordination.",
    drawing: "mount",
  },
  {
    number: "06",
    title: "TECHNICAL DEVELOPMENT",
    description: "Revision-led development from an early concept to a buildable product.",
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
              className={`group grid w-full grid-cols-[46px_1fr_auto] items-center gap-3 border-b border-paper/10 py-5 text-left transition-colors ${
                active === index ? "text-paper" : "text-mute hover:text-paper"
              }`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <span className="font-display text-xl font-bold text-red">{capability.number}</span>
              <span className="font-display text-xl font-semibold tracking-[0.025em] md:text-2xl">
                {capability.title}
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
          caption={selected.title}
          tall
        />
        <p className="mt-6 max-w-lg text-lg leading-8 text-mist">{selected.description}</p>
      </div>
    </div>
  );
}
