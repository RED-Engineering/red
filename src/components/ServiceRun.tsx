"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

const services = [
  { n: "01", title: "CAD", line: "The model, the drawing, and the dimensions to make it." },
  { n: "02", title: "Design", line: "The form, shaped around how it is held and used." },
  { n: "03", title: "Mechanical", line: "Fit, movement, and the parts that have to meet." },
  { n: "04", title: "Sheet metal", line: "Flat pattern, bend lines, then the fold." },
  { n: "05", title: "Make", line: "Laser, waterjet, bending, and fabrication." },
  { n: "06", title: "Build", line: "A prototype to test, then the assembly." },
] as const;

type ServiceId = (typeof services)[number]["n"];

const ease = [0.45, 0.05, 0.2, 1] as const;
const ink = "#F1EEE6";
const dim = "#817D74";
const accent = "#FF3131";
const mono = "IBM Plex Mono, ui-monospace, monospace";

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

function Label({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} fill={dim} fontSize="13" fontFamily={mono} letterSpacing="1.4">
      {children}
    </text>
  );
}

function CadSketch({ on, reduce }: { on: boolean; reduce: boolean }) {
  return (
    <g>
      <rect x="168" y="42" width="280" height="120" fill="#121211" stroke={ink} strokeWidth="1.5" />
      <circle cx="250" cy="102" r="20" fill="none" stroke={ink} strokeWidth="1.5" />
      <circle cx="250" cy="102" r="3.5" fill={accent} />
      <path d="M240 102 H260 M250 92 V112" stroke={accent} strokeWidth="0.9" />
      <path d="M168 182 H448 M168 176 V188 M448 176 V188" fill="none" stroke={dim} strokeWidth="1" />
      <text x="308" y="204" textAnchor="middle" fill={dim} fontSize="13" fontFamily={mono}>
        220
      </text>
      <path d="M140 42 V162 M134 42 H146 M134 162 H146" fill="none" stroke={dim} strokeWidth="1" />
      <text x="124" y="108" fill={dim} fontSize="13" fontFamily={mono} transform="rotate(-90 124 108)">
        100
      </text>
      <motion.path
        d="M270 102 H468"
        stroke={accent}
        strokeWidth="1.2"
        fill="none"
        strokeDasharray="198"
        animate={{ strokeDashoffset: on && !reduce ? [198, 0] : 0 }}
        transition={{ duration: 1.5, ease }}
      />
      <text x="478" y="107" fill={dim} fontSize="13" fontFamily={mono}>
        DIA 18
      </text>
    </g>
  );
}

function DesignSketch({ on, reduce }: { on: boolean; reduce: boolean }) {
  return (
    <g>
      <defs>
        <clipPath id="design-body">
          <rect x="150" y="36" width="340" height="140" rx="22" />
        </clipPath>
      </defs>
      <rect x="150" y="36" width="340" height="140" rx="22" fill="#121211" stroke={ink} strokeWidth="1.5" />
      <g clipPath="url(#design-body)">
        <motion.rect
          x="150"
          y="36"
          width="46"
          height="140"
          fill={accent}
          animate={{ opacity: on && !reduce ? [0.08, 0.34] : 0.2 }}
          transition={{ duration: 1.4, ease }}
        />
        <path d="M150 108 H490" stroke={ink} strokeWidth="1.2" />
      </g>
      <circle cx="320" cy="74" r="12" fill="none" stroke={ink} strokeWidth="1.4" />
      <rect x="270" y="128" width="100" height="18" rx="2" fill="none" stroke={ink} strokeWidth="1.3" />
      <motion.path
        d="M520 108 H600"
        stroke={accent}
        strokeWidth="1.4"
        fill="none"
        strokeDasharray="80"
        animate={{ strokeDashoffset: on && !reduce ? [80, 0] : 0 }}
        transition={{ duration: 1.5, ease }}
      />
      <path d="M588 100 L604 108 L588 116" fill="none" stroke={accent} strokeWidth="1.4" />
    </g>
  );
}

function MechanicalSketch({ on, reduce }: { on: boolean; reduce: boolean }) {
  return (
    <g>
      <rect x="70" y="148" width="200" height="26" fill="#161615" stroke={ink} strokeWidth="1.4" />
      <circle cx="230" cy="140" r="12" fill="#0d0d0c" stroke={accent} strokeWidth="1.6" />
      <motion.g
        style={{ transformOrigin: "230px 140px", transformBox: "view-box" }}
        animate={{ rotate: on && !reduce ? -24 : 0 }}
        transition={{ duration: 1.7, ease }}
      >
        <path d="M242 132 H430 V148 H242 Z" fill="#161615" stroke={ink} strokeWidth="1.4" />
        <circle cx="418" cy="140" r="8" fill="none" stroke={ink} strokeWidth="1.4" />
      </motion.g>
      <motion.path
        d="M418 140 A 188 188 0 0 0 392 64"
        stroke={accent}
        strokeWidth="1.3"
        fill="none"
        strokeDasharray="4 5"
        animate={{ pathLength: on && !reduce ? [0, 1] : 1 }}
        transition={{ duration: 1.6, ease }}
      />
      <path d="M386 74 L392 56 L408 72" fill="none" stroke={accent} strokeWidth="1.3" />
    </g>
  );
}

function SheetSketch({ on, reduce }: { on: boolean; reduce: boolean }) {
  return (
    <g>
      <rect x="48" y="58" width="210" height="100" fill="#121211" stroke={ink} strokeWidth="1.5" />
      <path d="M150 58 V158" stroke={accent} strokeWidth="1.2" strokeDasharray="5 4" />
      <path d="M142 58 L150 70 L158 58 M142 158 L150 146 L158 158" fill="none" stroke={accent} strokeWidth="1.1" />
      <Label x="78" y="48">
        FLAT
      </Label>
      <path d="M278 108 H330" stroke={dim} strokeWidth="1.2" />
      <path d="M320 100 L334 108 L320 116" fill="none" stroke={dim} strokeWidth="1.2" />
      <path d="M400 62 H560 V96 H448 V176 H400 Z" fill="#121211" stroke={ink} strokeWidth="1.5" />
      <motion.path
        d="M400 62 V176"
        stroke={accent}
        strokeWidth="1.6"
        fill="none"
        animate={{ pathLength: on && !reduce ? [0, 1] : 1 }}
        transition={{ duration: 1.5, ease }}
      />
      <Label x="520" y="50">
        FOLD
      </Label>
    </g>
  );
}

function MakeSketch({ on, reduce }: { on: boolean; reduce: boolean }) {
  return (
    <g>
      <rect x="36" y="70" width="170" height="78" fill="#121211" stroke={ink} strokeWidth="1.4" />
      <motion.path
        d="M52 109 H190"
        stroke={accent}
        strokeWidth="1.6"
        fill="none"
        strokeDasharray="138"
        animate={{ strokeDashoffset: on && !reduce ? [138, 0] : 0 }}
        transition={{ duration: 1.6, ease }}
      />
      <Label x="36" y="58">
        LASER
      </Label>

      <rect x="250" y="78" width="180" height="70" fill="#121211" stroke={ink} strokeWidth="1.4" />
      <motion.path
        d="M250 114 C 305 86, 375 86, 430 114"
        stroke={accent}
        strokeWidth="1.6"
        fill="none"
        strokeDasharray="200"
        animate={{ strokeDashoffset: on && !reduce ? [200, 0] : 0 }}
        transition={{ duration: 1.8, ease }}
      />
      <Label x="250" y="64">
        WATERJET
      </Label>

      <path d="M492 132 L548 178 L604 132" fill="none" stroke={ink} strokeWidth="1.6" />
      <path d="M468 146 L548 168 L628 146" fill="none" stroke={ink} strokeWidth="2.6" />
      <motion.g animate={{ y: on && !reduce ? 24 : 0 }} transition={{ duration: 1.5, ease }}>
        <rect x="530" y="46" width="36" height="58" fill="#161615" stroke={ink} strokeWidth="1.4" />
        <path d="M530 104 L548 124 L566 104" fill={ink} />
      </motion.g>
      <Label x="500" y="36">
        BEND
      </Label>
    </g>
  );
}

function BuildSketch({ on, reduce }: { on: boolean; reduce: boolean }) {
  const settle = on && !reduce;
  return (
    <g>
      <path d="M300 28 V192" stroke={dim} strokeWidth="1" strokeDasharray="3 5" />
      <motion.g animate={{ y: settle ? 10 : 0 }} transition={{ duration: 1.6, ease }}>
        <rect x="210" y="36" width="180" height="34" fill="#161615" stroke={ink} strokeWidth="1.4" />
        <circle cx="300" cy="53" r="6" fill="none" stroke={accent} strokeWidth="1.3" />
      </motion.g>
      <rect x="248" y="92" width="104" height="36" fill="#121211" stroke={ink} strokeWidth="1.4" />
      <circle cx="300" cy="110" r="6" fill="none" stroke={accent} strokeWidth="1.3" />
      <motion.g animate={{ y: settle ? -10 : 0 }} transition={{ duration: 1.6, ease }}>
        <rect x="190" y="150" width="220" height="34" fill="#161615" stroke={ink} strokeWidth="1.4" />
        <circle cx="300" cy="167" r="6" fill="none" stroke={accent} strokeWidth="1.3" />
      </motion.g>
    </g>
  );
}

function Sketch({ id, on, reduce }: { id: ServiceId; on: boolean; reduce: boolean }) {
  return (
    <svg viewBox="0 0 720 220" className="block h-auto w-full" role="img" aria-label="Service sketch">
      <rect width="720" height="220" fill="transparent" />
      {id === "01" ? <CadSketch on={on} reduce={reduce} /> : null}
      {id === "02" ? <DesignSketch on={on} reduce={reduce} /> : null}
      {id === "03" ? <MechanicalSketch on={on} reduce={reduce} /> : null}
      {id === "04" ? <SheetSketch on={on} reduce={reduce} /> : null}
      {id === "05" ? <MakeSketch on={on} reduce={reduce} /> : null}
      {id === "06" ? <BuildSketch on={on} reduce={reduce} /> : null}
    </svg>
  );
}

export function ServiceRun() {
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
    const next = Math.min(services.length - 1, Math.max(0, Math.round(value * (services.length - 1))));
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
    <section id="services" className="surface-dark scroll-mt-24 py-8 md:py-14">
      <div className="shell lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="run-round max-w-[8ch] text-[2.8rem] leading-[1.02] md:text-6xl">What we do</h2>
            <p className="mt-4 max-w-xs text-[15px] leading-7 text-mist">
              Partners cut and form where the process needs it.
            </p>
            <div className="mt-7 flex max-w-xs gap-1.5" aria-hidden>
              {services.map((step, index) => (
                <span
                  key={step.n}
                  className={`h-px flex-1 transition-colors duration-1000 ease-[cubic-bezier(0.45,0.05,0.2,1)] ${
                    index <= active ? "bg-red" : "bg-paper/15"
                  }`}
                />
              ))}
            </div>
            <ol className="mt-8 hidden lg:block">
              {services.map((step, index) => {
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
                          layoutId="service-active"
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
              <motion.div className="h-full w-full origin-top bg-red" style={{ scaleY: reduce ? 1 : scaleY }} />
            </div>

            {services.map((step, index) => {
              const on = active === index;
              return (
                <li
                  key={step.n}
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
                    <div
                      className={`grid-bg relative mt-6 overflow-hidden rounded-[8px] border border-paper/10 transition-opacity duration-1000 ease-[cubic-bezier(0.45,0.05,0.2,1)] ${
                        on ? "opacity-100" : "opacity-55"
                      }`}
                    >
                      <Sketch id={step.n} on={on} reduce={reduce} />
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
