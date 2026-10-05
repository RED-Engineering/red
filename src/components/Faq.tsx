"use client";

import { useState } from "react";

const questions = [
  {
    question: "WHAT TYPE OF PROJECTS DOES RED TAKE ON?",
    answer:
      "Mechanical products, mechanisms, fixtures, sheet-metal parts, CAD assemblies, prototypes and manufacturing development.",
  },
  {
    question: "CAN RED WORK FROM AN EARLY IDEA?",
    answer:
      "Yes. A project can begin with a sketch, reference images, an existing part or a clear description of the problem.",
  },
  {
    question: "CAN I BUY THE CAD FILE OR THE PHYSICAL PRODUCT?",
    answer:
      "Products are sold through Shopify as digital files, manufactured objects or a custom version when those options exist.",
  },
  {
    question: "WHICH FILE TYPES CAN I SEND?",
    answer:
      "STEP, STP, STL, DXF, PDF, images and ZIP packages can be attached to the project form.",
  },
  {
    question: "HOW DOES A PROJECT START?",
    answer:
      "Send the requirements, quantity, deadline and reference files. RED reviews the information and replies with the next practical step.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <div className="border-t border-black/15">
      {questions.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.question} className="border-b border-black/15">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? -1 : index)}
            >
              <span className="font-display text-xl font-semibold tracking-[0.03em] md:text-2xl">
                <span className="mr-5 text-red">{String(index + 1).padStart(2, "0")}</span>
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
                <p className="max-w-2xl pb-7 pl-0 text-base leading-7 text-[#625e57] md:pl-12">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
