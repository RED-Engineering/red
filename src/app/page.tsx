import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { EngineeringMarquee } from "@/components/EngineeringMarquee";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { ProjectGrid } from "@/components/ProjectCard";
import { RedButton } from "@/components/RedButton";
import { projects } from "@/content/projects";
import { getFeaturedProduct } from "@/lib/catalog";

const work = [
  {
    n: "01",
    title: "CAD & product design",
    body: "Parts, assemblies and drawings prepared so they can actually be made.",
  },
  {
    n: "02",
    title: "Mechanical engineering",
    body: "Fit, movement, mechanisms and the practical problems inside a product.",
  },
  {
    n: "03",
    title: "Sheet metal",
    body: "Flat patterns, bends, reliefs, hardware and how the assembly goes together.",
  },
  {
    n: "04",
    title: "Prototyping",
    body: "A physical version, tested, so problems show up before production.",
  },
  {
    n: "05",
    title: "Manufacturing",
    body: "CNC, laser, waterjet, bending, finishing and assembly — coordinated to a finished object.",
  },
];

const steps = [
  ["01", "Idea", "You send the need, constraints, quantity and any files."],
  ["02", "Design", "We develop the form and how the product should work."],
  ["03", "Engineer", "Fit, movement, materials and the process that will make it."],
  ["04", "Prototype", "Build it, test it, change what fails."],
  ["05", "Manufacture", "Produce the parts with the process decided in engineering."],
  ["06", "Deliver", "Assembly, documentation and the object in your hands."],
];

export default async function HomePage() {
  const featured = await getFeaturedProduct();
  const selected = projects.slice(0, 2);

  return (
    <>
      <Hero />
      <EngineeringMarquee />

      <section id="services" className="surface-dark py-16 md:py-24">
        <div className="shell">
          <h2 className="section-title">WHAT WE DO.</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-mist">
            RED is an independent studio. We take a mechanical idea through CAD, engineering,
            prototype and production.
          </p>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {work.map((item) => (
              <article key={item.n} className="glass-media rounded-[8px] p-6">
                <p className="font-display text-lg font-bold text-red">{item.n}</p>
                <h3 className="mt-5 text-2xl tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-mist">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="surface-graphite py-16 md:py-24">
        <div className="shell">
          <h2 className="section-title">HOW A PROJECT RUNS.</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-mist">
            Each step produces what the next one needs. Nothing is hidden behind a final render.
          </p>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {steps.map(([n, title, body]) => (
              <article key={n} className="glass-media rounded-[8px] p-6">
                <p className="font-display text-lg font-bold text-red">{n}</p>
                <h3 className="mt-5 text-2xl tracking-[-0.03em]">{title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-mist">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selected.length > 0 ? (
        <section className="surface-dark py-16 md:py-24">
          <div className="shell">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <h2 className="section-title">WORK.</h2>
              <Link href="/work" className="font-display font-bold tracking-[0.08em] text-red">
                VIEW ALL →
              </Link>
            </div>
            <ProjectGrid projects={selected} />
          </div>
        </section>
      ) : null}

      {featured ? (
        <section className="surface-light material-noise py-16 md:py-24">
          <div className="shell">
            <p className="shop-emboss">SHOP</p>
            <h2 className="section-title mt-4 text-center">GET THE FILE OR THE PART.</h2>
            <div className="mt-10 flex justify-center">
              <RedButton href="/products">OPEN SHOP</RedButton>
            </div>
            <div className="mx-auto mt-12 max-w-xl">
              <ProductCard product={featured} />
            </div>
          </div>
        </section>
      ) : null}

      <section className="surface-dark py-16 md:py-24">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="section-title">QUESTIONS.</h2>
          </div>
          <div className="lg:col-span-8">
            <Faq />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-20 md:py-28">
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 opacity-[0.09]">
          <BrandMark className="h-[320px] w-[320px] md:h-[420px] md:w-[420px]" />
        </div>
        <div className="shell relative">
          <div className="glass-media max-w-2xl rounded-[8px] p-8 md:p-10">
            <h2 className="section-title max-w-[10ch]">HAVE AN IDEA?</h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-mist">
              Send the brief. We review it and reply with the next step.
            </p>
            <div className="mt-8">
              <RedButton href="/contact">START A PROJECT</RedButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
