import { Reveal } from "@/components/Reveal";

const steps = [
  { n: "01", title: "DEFINE", body: "Understand the problem." },
  { n: "02", title: "DESIGN", body: "Create the geometry." },
  { n: "03", title: "ENGINEER", body: "Solve manufacturability and mechanical requirements." },
  { n: "04", title: "PROTOTYPE", body: "Make a physical version." },
  { n: "05", title: "REFINE", body: "Test and revise." },
  { n: "06", title: "MAKE", body: "Manufacture the final object." },
];

export function EngineeringProcess() {
  return (
    <ol className="relative border-t border-black/15">
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-[18px] w-px bg-black/10 md:left-[calc(25%-1px)]"
      />
      {steps.map((step, index) => (
        <Reveal key={step.n} delay={Math.min(index * 0.06, 0.24)}>
          <li className="group grid min-h-[116px] grid-cols-[38px_1fr] border-b border-black/15 py-6 md:grid-cols-4 md:items-center">
            <div className="relative md:col-span-1">
              <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-paper font-mono text-[10px] tracking-[0.12em] transition-colors group-hover:border-red group-hover:text-red">
                {step.n}
              </span>
            </div>
            <h3 className="text-3xl tracking-[-0.035em] md:col-span-1 md:text-4xl">
              {step.title}
            </h3>
            <p className="col-start-2 mt-2 max-w-sm text-sm leading-6 text-[#69655e] md:col-span-2 md:col-start-auto md:mt-0">
              {step.body}
            </p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
