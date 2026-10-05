"use client";

import { motion, useReducedMotion } from "motion/react";

const steps = [
  ["01", "IDEA", "Define the need and constraints."],
  ["02", "DESIGN", "Develop the form and product direction."],
  ["03", "ENGINEER", "Resolve fit, movement and manufacturing."],
  ["04", "PROTOTYPE", "Build and test the physical version."],
  ["05", "MANUFACTURE", "Prepare and produce the final parts."],
  ["06", "DELIVER", "Assemble, document and hand over."],
];

export function ProcessTimeline() {
  const reduce = useReducedMotion();

  return (
    <ol className="relative grid gap-0 md:grid-cols-6">
      <div
        aria-hidden
        className="absolute top-4 bottom-4 left-[7px] w-px bg-paper/10 md:top-[7px] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-auto"
      >
        <motion.span
          className="block h-full w-full origin-top bg-red md:origin-left"
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={reduce ? undefined : { scaleY: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      {steps.map(([number, title, description], index) => (
        <motion.li
          key={number}
          className="relative grid grid-cols-[30px_1fr] gap-4 pb-10 md:block md:pr-5 md:pb-0"
          initial={reduce ? false : { opacity: 0.35 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.45, delay: index * 0.06 }}
        >
          <span className="relative z-10 mt-1 block h-[15px] w-[15px] rounded-full border-4 border-ink bg-red" />
          <div>
            <p className="font-display text-2xl font-bold text-red">{number}</p>
            <h3 className="mt-3 text-2xl tracking-[0.03em]">{title}</h3>
            <p className="mt-3 max-w-[190px] text-sm leading-6 text-mute">{description}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
