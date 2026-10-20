"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

const steps = [
  { n: "01", title: "Idea", line: "You send the need. We mark what gets drawn, tested and made." },
  { n: "02", title: "Design", line: "The form, drawn so the part can actually be made." },
  { n: "03", title: "Engineer", line: "Fit, movement, materials and the sheet metal." },
  { n: "04", title: "Prototype", line: "Built and tested, then changed before production." },
  { n: "05", title: "Manufacture", line: "Cut, bent, finished and assembled." },
  { n: "06", title: "Deliver", line: "The part, and how it was made." },
] as const;

const ease = [0.45, 0.05, 0.2, 1] as const;

function CornerMarks() {
  const corner = "pointer-events-none absolute h-3.5 w-3.5";
  return (
    <>
      <span className={`${corner} top-3.5 left-3.5 border-t border-l border-red/80`} />
      <span className={`${corner} top-3.5 right-3.5 border-t border-r border-paper/25`} />
      <span className={`${corner} bottom-3.5 left-3.5 border-b border-l border-paper/25`} />
      <span className={`${corner} right-3.5 bottom-3.5 border-r border-b border-paper/25`} />
    </>
  );
}

export function ProjectRun() {
  const reduce = useReducedMotion() === true;
  const listRef = useRef<HTMLOListElement>(null);
  const stepsRef = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 70%"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 46, damping: 20, mass: 0.9 });
  const driver = reduce ? scrollYProgress : smooth;
  const scaleY = useTransform(driver, [0, 1], [0, 1]);

  const syncActive = (value: number) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.round(value * (steps.length - 1))));
    setActive((current) => (current === next ? current : next));
  };

  useMotionValueEvent(driver, "change", syncActive);

  useEffect(() => {
    syncActive(driver.get());
  }, [driver]);

  const focusStep = (index: number) => {
    stepsRef.current[index]?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
    });
  };

  return (
    <section id="process" className="surface-dark scroll-mt-24 py-16 md:py-24">
      <div className="shell lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="run-round max-w-[9ch] text-[2.8rem] leading-[1.02] md:text-6xl">
              How a project runs
            </h2>
            <div className="mt-7 flex max-w-xs gap-1.5" aria-hidden>
              {steps.map((step, index) => (
                <span
                  key={step.n}
                  className={`h-px flex-1 transition-colors duration-1000 ease-[cubic-bezier(0.45,0.05,0.2,1)] ${
                    index <= active ? "bg-red" : "bg-paper/15"
                  }`}
                />
              ))}
            </div>
            <ol className="mt-8 hidden lg:block">
              {steps.map((step, index) => {
                const on = active === index;
                return (
                  <li key={step.n}>
                    <button
                      type="button"
                      className="relative flex w-full items-baseline gap-4 py-2.5 text-left"
                      aria-current={on ? "step" : undefined}
                      onClick={() => focusStep(index)}
                    >
                      {on && !reduce ? (
                        <motion.span
                          layoutId="run-active"
                          className="absolute top-1/2 -left-4 h-5 w-px -translate-y-1/2 bg-red"
                          transition={{ duration: 0.95, ease }}
                        />
                      ) : null}
                      {on && reduce ? (
                        <span className="absolute top-1/2 -left-4 h-5 w-px -translate-y-1/2 bg-red" />
                      ) : null}
                      <span
                        className={`w-8 run-round text-base transition-colors duration-1000 ease-[cubic-bezier(0.45,0.05,0.2,1)] ${
                          on ? "text-red" : "text-mute"
                        }`}
                      >
                        {step.n}
                      </span>
                      <span
                        className={`run-round text-2xl transition-colors duration-1000 ease-[cubic-bezier(0.45,0.05,0.2,1)] ${
                          on ? "text-paper" : "text-mute"
                        }`}
                      >
                        {step.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="mt-12 lg:col-span-8 lg:mt-2">
          <ol ref={listRef} className="relative">
            <div className="absolute top-8 bottom-8 left-[10px] w-px bg-paper/10" aria-hidden>
              <motion.div
                className="h-full w-full origin-top bg-red"
                style={{ scaleY: reduce ? 1 : scaleY }}
              />
            </div>

            {steps.map((step, index) => {
              const on = active === index;
              return (
                <li
                  key={step.n}
                  data-index={index}
                  ref={(node) => {
                    stepsRef.current[index] = node;
                  }}
                  className="relative grid grid-cols-[22px_1fr] gap-4 pb-8 last:pb-0 md:gap-6 md:pb-12"
                >
                  <div className="relative z-10 flex justify-center pt-8">
                    <span
                      className={`block rounded-full border-2 transition-[width,height,background-color,border-color,box-shadow] duration-1000 ease-[cubic-bezier(0.45,0.05,0.2,1)] ${
                        on
                          ? "h-3.5 w-3.5 border-red bg-red shadow-[0_0_0_7px_rgba(255,49,49,0.14)]"
                          : "h-2.5 w-2.5 border-paper/25 bg-ink"
                      }`}
                    />
                  </div>

                  <motion.article
                    className={`relative overflow-hidden rounded-[12px] px-5 py-6 transition-[background-color,box-shadow] duration-[1100ms] ease-[cubic-bezier(0.45,0.05,0.2,1)] md:px-7 md:py-7 ${
                      on ? "bg-paper/[0.045] shadow-[0_24px_70px_rgba(0,0,0,0.28)]" : "bg-transparent"
                    }`}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: reduce ? 0 : 0.9, ease }}
                  >
                    <div
                      aria-hidden
                      className={`pointer-events-none transition-opacity duration-1000 ease-[cubic-bezier(0.45,0.05,0.2,1)] ${
                        on ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <span className="absolute -top-8 -left-6 h-32 w-32 rounded-full bg-red/25 blur-3xl" />
                      <CornerMarks />
                    </div>
                    <div className="relative flex items-start justify-between gap-6">
                      <div className="max-w-lg">
                        <h3 className={`run-round text-[2.4rem] leading-none md:text-5xl ${on ? "text-paper" : "text-paper/80"}`}>
                          {step.title}
                        </h3>
                        <p className="mt-3 text-[15px] leading-7 text-mist">{step.line}</p>
                      </div>
                      <span
                        className={`run-round shrink-0 text-5xl leading-none transition-colors duration-1000 ease-[cubic-bezier(0.45,0.05,0.2,1)] md:text-6xl ${
                          on ? "text-red" : "text-paper/20"
                        }`}
                      >
                        {step.n}
                      </span>
                    </div>
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-0 h-px bg-red transition-[width] duration-[1200ms] ease-[cubic-bezier(0.45,0.05,0.2,1)]"
                      style={{ width: on ? "100%" : "0%", transitionDelay: on ? "220ms" : "0ms" }}
                    />
                  </motion.article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
