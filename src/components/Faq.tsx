"use client";

import { useState } from "react";

const questions = [
  {
    question: "What does RED take on?",
    answer:
      "Mechanical products, mechanisms, fixtures, sheet-metal parts, CAD assemblies, prototypes, and manufacturing development.",
  },
  {
    question: "How does a project start?",
    answer:
      "Send the problem, quantity, deadline, and any files. RED reviews that and replies with the next practical step. A sketch or a clear description is enough to begin.",
  },
  {
    question: "Can I buy the CAD file, the part, or both?",
    answer:
      "Yes. You can buy the CAD file, the part, or both. There are several free files too.",
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
