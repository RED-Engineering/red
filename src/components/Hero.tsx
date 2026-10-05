"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { DrawingSheet } from "@/components/DrawingSheet";
import { RedButton } from "@/components/RedButton";

const notes = [
  { n: "01", label: "MECHANICAL DESIGN", position: "left-[1%] top-[18%]" },
  { n: "02", label: "CAD / ASSEMBLY", position: "right-[1%] top-[32%]" },
  { n: "03", label: "CNC / AL 6061", position: "left-[4%] bottom-[18%]" },
];

const capabilities = [
  ["01", "PRODUCT DESIGN"],
  ["02", "MECHANICAL CAD"],
  ["03", "PROTOTYPING"],
  ["04", "MANUFACTURING"],
] as const;

export function Hero() {
  const [reduce, setReduce] = useState(false);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 80, damping: 20, mass: 0.7 });
  const rotateY = useSpring(ry, { stiffness: 80, damping: 20, mass: 0.7 });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 3);
    rotateX.set(y * -2);
  }

  return (
    <section className="relative overflow-hidden border-b border-paper/10 bg-panel">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,13,12,0.98)_0%,rgba(13,13,12,0.88)_42%,rgba(13,13,12,0.28)_100%),radial-gradient(circle_at_78%_44%,rgba(255,49,49,0.12),transparent_28%)]" />
      <div className="absolute top-0 right-0 h-full w-1.5 bg-red" />
      <div className="shell relative grid min-h-[720px] items-center gap-8 py-16 lg:grid-cols-12 lg:py-20">
        <div className="relative z-10 lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="red-led" aria-hidden />
            <p className="tech text-paper" suppressHydrationWarning>
              RED / ENGINEERING + DESIGN + MANUFACTURING
            </p>
          </div>
          <h1 className="display mt-7 max-w-[7ch]" suppressHydrationWarning>
            ENGINEERING
            <br />
            THAT FEELS
            <br />
            HUMAN.
          </h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <RedButton href="/work">EXPLORE THE WORK</RedButton>
            <RedButton href="/contact" variant="ghost">
              START A PROJECT
            </RedButton>
          </div>
        </div>

        <div
          className="relative min-h-[390px] [perspective:1200px] sm:min-h-[500px] lg:col-span-7 lg:-ml-4 lg:min-h-[620px]"
          onPointerMove={onPointerMove}
          onPointerLeave={() => {
            rotateX.set(0);
            rotateY.set(0);
          }}
        >
          <div className="absolute inset-[8%] rounded-[50%] bg-red/[0.06] blur-3xl" />
          <motion.div
            className="absolute inset-x-0 top-[6%] origin-center sm:inset-x-[4%] lg:top-[8%]"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            <div className="animate-inspect motion-reduce:animate-none">
              <DrawingSheet
                drawing="control"
                fig="FIG. 01"
                caption="CAD ASSEMBLY"
                tall
                variant="hero"
              />
            </div>
          </motion.div>

          <div className="pointer-events-none absolute inset-0 hidden md:block">
            {notes.map((note, index) => (
              <motion.div
                key={note.n}
                className={`absolute ${note.position} max-w-[150px]`}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.5 + index * 0.18 }}
              >
                <div className="mb-2 h-px w-10 bg-red/70" />
                <p className="tech text-red">{note.n}</p>
                <p className="mt-1 font-mono text-[9px] tracking-[0.13em] text-mist">
                  {note.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative border-t border-paper/10 bg-ink/90">
        <div className="shell grid grid-cols-2 lg:grid-cols-4">
          {capabilities.map(([number, label]) => (
            <div
              key={number}
              className="flex min-h-20 items-center gap-4 border-r border-b border-paper/10 px-4 last:border-r-0 lg:border-b-0"
            >
              <span className="font-display text-2xl font-bold text-red">{number}</span>
              <span className="font-display text-sm font-semibold tracking-[0.08em] text-paper">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
