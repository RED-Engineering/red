import { RedButton } from "@/components/RedButton";

const ways = [
  {
    n: "A",
    title: "A defined task",
    line: "One component, one drawing, or one problem. You do not have to commission a whole product.",
  },
  {
    n: "B",
    title: "Product development",
    line: "An idea or a requirement, developed into a design that can be manufactured.",
  },
  {
    n: "C",
    title: "Manufacturing preparation",
    line: "The design exists. RED prepares the CAD, drawings, flat patterns, or other files the manufacturing process needs.",
  },
  {
    n: "D",
    title: "Ongoing support",
    line: "Extra design and engineering capacity for a team that already has work in progress.",
  },
  {
    n: "E",
    title: "A broader job",
    line: "Design and engineering, and — only when it is in the scope — fabrication coordinated with partners.",
  },
] as const;

export function WaysToWork() {
  return (
    <section id="engage" className="surface-graphite scroll-mt-24 py-16 md:py-24">
      <div className="shell lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 className="section-title max-w-[10ch]">How you can hire RED</h2>
          <p className="mt-5 max-w-sm text-lg leading-8 text-mist">
            A full product is one way in. A single part is another. The scope and the deliverables
            are agreed before work starts.
          </p>
          <div className="mt-8">
            <RedButton href="/contact">TELL US WHAT YOU NEED</RedButton>
          </div>
        </div>
        <ol className="mt-12 border-t border-paper/15 lg:col-span-7 lg:col-start-6 lg:mt-0">
          {ways.map((way) => (
            <li key={way.n} className="border-b border-paper/15 py-6 md:py-7">
              <div className="grid grid-cols-[2.5rem_1fr] gap-4 md:grid-cols-[4rem_1fr] md:gap-6">
                <span className="font-display text-3xl leading-none text-red md:text-4xl">{way.n}</span>
                <div>
                  <h3 className="text-3xl leading-none tracking-[-0.03em] md:text-4xl">{way.title}</h3>
                  <p className="mt-3 max-w-xl text-[15px] leading-7 text-mist">{way.line}</p>
                </div>
              </div>
            </li>
          ))}
          <li className="py-6">
            <p className="max-w-xl text-[15px] leading-7 text-paper">
              There is no public price list and no fixed turnaround. Both are set with the scope,
              before anyone starts drawing.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
