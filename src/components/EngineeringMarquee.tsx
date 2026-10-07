const beat = ["DRAW IT", "MAKE IT", "HOLD IT"];
const lines = Array.from({ length: 12 }, (_, index) => beat[index % beat.length]);

export function EngineeringMarquee() {
  return (
    <div className="group overflow-hidden border-y border-ink bg-red text-ink">
      <p className="sr-only">Draw it. Make it. Hold it.</p>
      <div
        className="overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,#000_40px,#000_calc(100%-40px),transparent)]"
        aria-hidden
      >
        <div className="flex w-max animate-[marquee_32s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {lines.map((line, index) => (
                <span key={`${copy}-${index}`} className="flex items-center">
                  <span className="px-7 font-display text-[1.7rem] leading-none font-bold tracking-[0.08em] md:px-9 md:text-[2.15rem]">
                    {line}
                  </span>
                  <span className="h-2 w-2 shrink-0 bg-ink" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
