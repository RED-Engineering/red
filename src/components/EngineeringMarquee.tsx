const lines = [
  "A CLEAR BRIEF",
  "CAD THAT FITS",
  "PARTS THAT MOVE",
  "TESTED IN METAL",
  "REVISED ON RECORD",
  "BUILT AS AN OBJECT",
];

export function EngineeringMarquee() {
  return (
    <div className="flex overflow-hidden border-y border-ink bg-red text-ink">
      <p className="sr-only">
        From idea to object: a clear brief, CAD that fits, parts that move, tested in metal,
        revised on record, built as an object.
      </p>
      <div className="z-10 flex shrink-0 flex-col justify-center border-r border-paper/10 bg-ink px-5 py-3.5 md:px-7">
        <span className="font-mono text-[9px] tracking-[0.22em] text-red">RED</span>
        <span className="mt-1 font-display text-xl leading-none font-bold tracking-[0.08em] text-paper md:text-2xl">
          IDEA
          <span className="mx-1.5 text-red">→</span>
          OBJECT
        </span>
      </div>
      <div
        className="min-w-0 flex-1 overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,#000_32px,#000_calc(100%-32px),transparent)]"
        aria-hidden
      >
        <div className="flex w-max animate-[marquee_36s_linear_infinite] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {lines.map((line) => (
                <span key={`${copy}-${line}`} className="flex items-center">
                  <span className="px-7 font-display text-[1.7rem] leading-none font-bold tracking-[0.045em] md:px-9 md:text-[2rem]">
                    {line}
                  </span>
                  <span className="h-2 w-2 bg-ink" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
