"use client";

import { useState } from "react";

const questions = [
  {
    question: "I need a custom metal enclosure. Can RED do that?",
    answer:
      "Yes. RED designs the enclosure — fit, openings, and how it is made from sheet — and prepares the CAD and drawings. If making the enclosure is part of the agreed scope, fabrication is arranged with partners. RED does not own the factory.",
  },
  {
    question: "Can you prepare sheet-metal parts and the drawings to make them?",
    answer:
      "Yes. That includes the 3D model, the flat pattern (the sheet unfolded, with bend lines), and the dimensioned drawing. A BOM, the parts list, is included when the scope asks for it.",
  },
  {
    question: "We need extra CAD capacity, not a whole product. Is that possible?",
    answer:
      "Yes. RED can take one defined task or stay on as extra engineering capacity for a team that already has projects. The tasks and the deliverables are agreed first.",
  },
  {
    question: "I only have an idea. No CAD, no drawings.",
    answer:
      "That is enough to start. Describe the problem, or send a sketch or a photo. RED will say what is needed next. You do not need a finished specification.",
  },
  {
    question: "Is RED only sheet metal?",
    answer:
      "No. Sheet metal is one process. RED also engineers parts for machining, laser and waterjet cutting, welding, 3D printing, molding, casting, finishing, and assembly. If the part needs a different process, name it.",
  },
  {
    question: "Does RED manufacture everything itself?",
    answer:
      "No. Design, CAD, and engineering are RED’s work. When production is in the scope, the process is arranged with partners who run that process. RED does not own every machine, and not every job includes making the part.",
  },
  {
    question: "Can I buy a file or a finished part without starting a project?",
    answer:
      "Yes. The shop is separate. You can buy a CAD file, a physical part, or both, and check out through Shopify.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <div>
      {questions.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.question} className="glass-media mb-2 rounded-[8px] px-5">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 py-4 text-left"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? -1 : index)}
            >
              <span className="font-display text-lg font-semibold tracking-[0.03em] md:text-xl">
                <span className="mr-4 text-red">{String(index + 1).padStart(2, "0")}</span>
                {item.question}
              </span>
              <span className="font-display text-2xl text-red" aria-hidden>
                {expanded ? "−" : "+"}
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ${
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-5 text-[15px] leading-7 text-mist">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
