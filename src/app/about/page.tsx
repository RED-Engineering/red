import type { Metadata } from "next";
import { DrawingSheet } from "@/components/DrawingSheet";
import { RedButton } from "@/components/RedButton";

export const metadata: Metadata = {
  title: "About",
  description: "Why RED exists. Engineering, CAD, manufacturing, and making things real.",
};

const notes = [
  {
    n: "01",
    title: "CAD",
    body: "We use CAD to solve how a product works, how its parts fit, and how it will be manufactured.",
  },
  {
    n: "02",
    title: "Prototype",
    body: "Prototypes are built, tested and revised before the final object is made.",
  },
  {
    n: "03",
    title: "Object",
    body: "Screen, mechanism, finished part. The useful mistakes happen in the gaps.",
  },
];

export default function AboutPage() {
  return (
    <>
      <header className="shell pt-32 md:pt-40">
        <h1 className="section-title max-w-[14ch]">We design things that can be made.</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-mist">
          RED is an independent engineering and product design studio. Draw it, test it, then hold
          the object.
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
          <h2 className="section-title max-w-[12ch]">Screen. Mechanism. Object.</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-mist">
            The gaps between them are where the useful mistakes happen.
          </p>
          <div className="mt-12 grid items-start gap-4 md:grid-cols-12">
            <figure className="md:col-span-5">
              <DrawingSheet drawing="control" fig="CAD / 01" caption="SCREEN" tall />
            </figure>
            <figure className="md:col-span-3 md:mt-16">
              <DrawingSheet drawing="hinge" fig="SHOP / 02" caption="MECHANISM" />
            </figure>
            <figure className="md:col-span-4 md:mt-8">
              <DrawingSheet drawing="mount" fig="OBJECT / 03" caption="FINISHED" tall />
            </figure>
          </div>
        </div>
      </section>

      <section className="shell py-16 md:py-24">
        <div className="glass-media max-w-2xl rounded-[8px] p-8 md:p-10">
          <h2 className="section-title max-w-[10ch]">Have an idea?</h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-mist">
            Send the brief. We review it and reply with the next step.
          </p>
          <div className="mt-8">
            <RedButton href="/contact">START A PROJECT</RedButton>
          </div>
        </div>
      </section>
    </>
  );
}
