import type { Metadata } from "next";
import { DrawingSheet } from "@/components/DrawingSheet";
import { RedButton } from "@/components/RedButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "RED is an engineering studio for physical parts, across manufacturing processes, and the drawings to make them.",
};

const notes = [
  {
    n: "01",
    title: "Physical parts",
    body: "Brackets, enclosures, frames, machined parts, weldments, printed parts, and assemblies. The process follows the part. RED is not a marketing studio or a software shop.",
  },
  {
    n: "02",
    title: "Ready to make",
    body: "A model is not the finish line. The useful output is a design that can be cut, bent, and assembled, with the drawings that say how.",
  },
  {
    n: "03",
    title: "Scoped per job",
    body: "One part, a product, or extra capacity for a team that already has engineers. Fabrication is arranged with partners only when making the part is in the scope.",
  },
];

export default function AboutPage() {
  return (
    <>
      <header className="shell pt-32 md:pt-40">
        <h1 className="section-title max-w-[16ch]">An engineering studio for parts you can hold.</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-mist">
          RED helps a company turn an idea, a requirement, or an existing design into a physical
          part or assembly, and into the CAD and drawings for the manufacturing process that part
          needs. Sheet metal is one of those processes.
        </p>
      </header>

      <section className="shell grid gap-3 py-12 md:grid-cols-3 md:py-16">
        {notes.map((item) => (
          <article key={item.n} className="glass-media rounded-[8px] p-6">
            <p className="font-display text-lg font-bold text-red">{item.n}</p>
            <h2 className="mt-5 text-2xl tracking-[-0.03em]">{item.title}</h2>
            <p className="mt-3 text-[15px] leading-7 text-mist">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="surface-graphite py-16 md:py-24">
        <div className="shell">
          <h2 className="section-title max-w-[14ch]">What the drawings are showing</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-mist">
            Studies, not client projects. An enclosure, a mechanism, and a bent bracket — the kinds
            of object the engineering is for.
          </p>
          <div className="mt-12 grid items-start gap-4 md:grid-cols-12">
            <figure className="md:col-span-5">
              <DrawingSheet drawing="control" fig="STUDY / 01" caption="ENCLOSURE" tall />
              <figcaption className="mt-3 text-[15px] leading-7 text-mist">
                A housing: openings, walls, and how the box closes.
              </figcaption>
            </figure>
            <figure className="md:col-span-3 md:mt-16">
              <DrawingSheet drawing="hinge" fig="STUDY / 02" caption="MECHANISM" />
              <figcaption className="mt-3 text-[15px] leading-7 text-mist">
                Parts that have to meet and move.
              </figcaption>
            </figure>
            <figure className="md:col-span-4 md:mt-8">
              <DrawingSheet drawing="mount" fig="STUDY / 03" caption="BENT BRACKET" tall />
              <figcaption className="mt-3 text-[15px] leading-7 text-mist">
                Sheet cut flat, then folded into a bracket.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="shell py-16 md:py-24">
        <div className="glass-media max-w-2xl rounded-[8px] p-8 md:p-10">
          <h2 className="section-title max-w-[12ch]">Tell us what you need.</h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-mist">
            A description is enough to start. RED replies with what the job would include.
          </p>
          <div className="mt-8">
            <RedButton href="/contact">TELL US WHAT YOU NEED</RedButton>
          </div>
        </div>
      </section>
    </>
  );
}
