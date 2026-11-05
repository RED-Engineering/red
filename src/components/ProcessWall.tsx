const processes = [
  { n: "01", title: "Sheet metal", line: "Cut, bend, and form." },
  { n: "02", title: "Machining", line: "Mill, turn, and drill." },
  { n: "03", title: "Laser", line: "Profile cutting in sheet and plate." },
  { n: "04", title: "Waterjet", line: "Cutting when heat would hurt the part." },
  { n: "05", title: "Welding", line: "Frames, fabrications, and joins." },
  { n: "06", title: "Printing", line: "Additive parts and prototypes." },
  { n: "07", title: "Molding", line: "Cast, molded, and formed parts." },
  { n: "08", title: "Assembly", line: "The pieces, brought together." },
] as const;

export function ProcessWall() {
  return (
    <section id="processes" className="surface-dark scroll-mt-24 py-16 md:py-24">
      <div className="shell">
        <p className="tech text-red">THE PROCESS FOLLOWS THE PART</p>
        <div className="mt-6 flex flex-col items-start">
          <span className="bg-paper px-4 py-2 font-display text-5xl leading-[0.85] text-ink md:text-7xl">
            NOT ONLY
          </span>
          <span className="-mt-1 ml-8 bg-red px-4 py-2 font-display text-5xl leading-[0.85] text-warm-white md:ml-16 md:text-7xl">
            SHEET METAL.
          </span>
        </div>
        <p className="mt-8 max-w-xl text-lg leading-8 text-mist">
          RED engineers a part for the manufacturing process it actually needs. Sheet metal is one
          of them. Machining, cutting, welding, printing, molding, and assembly are others. If the
          process is not on this wall, name it.
        </p>
        <ul className="mt-10 grid border-t border-l border-paper/15 sm:grid-cols-2 lg:grid-cols-4">
          {processes.map((process) => (
            <li
              key={process.n}
              className="group border-r border-b border-paper/15 p-5 transition-colors duration-300 hover:bg-red"
            >
              <span className="font-display text-sm font-bold tracking-[0.14em] text-red transition-colors duration-300 group-hover:text-ink">
                {process.n}
              </span>
              <h3 className="mt-4 text-3xl leading-none tracking-[-0.03em] transition-colors duration-300 group-hover:text-ink">
                {process.title}
              </h3>
              <p className="mt-3 text-[15px] leading-6 text-mist transition-colors duration-300 group-hover:text-ink/80">
                {process.line}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl border border-paper/20 px-4 py-3 text-[15px] leading-7 text-paper">
          Design and engineering are RED’s work. When the job includes making the part, that
          process is arranged with the right partners. RED does not own every machine, and not
          every job includes production.
        </p>
      </div>
    </section>
  );
}
