const steps = [
  { n: "01", title: "Define", body: "What it has to do, how many, and what it cannot be." },
  { n: "02", title: "Design", body: "The shape, and the way a person uses it." },
  { n: "03", title: "Engineer", body: "Fit, movement, material, and a process that can make it." },
  { n: "04", title: "Prototype", body: "A physical one, so the problems are obvious." },
  { n: "05", title: "Refine", body: "Test it, change it, keep a record of what changed." },
  { n: "06", title: "Make", body: "The finished object, ready to hold." },
];

export function EngineeringProcess() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {steps.map((step) => (
        <li key={step.n} className="glass-media rounded-[8px] p-6">
          <p className="font-display text-lg font-bold text-red">{step.n}</p>
          <h3 className="mt-5 text-2xl tracking-[-0.03em]">{step.title}</h3>
          <p className="mt-3 text-[15px] leading-7 text-mist">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
