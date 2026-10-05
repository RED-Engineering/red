import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { CapabilitySystem } from "@/components/CapabilitySystem";
import { DrawingSheet } from "@/components/DrawingSheet";
import { EngineeringMarquee } from "@/components/EngineeringMarquee";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ProductCard } from "@/components/ProductCard";
import { ProjectPortfolio } from "@/components/ProjectPortfolio";
import { ProjectGrid } from "@/components/ProjectCard";
import { RedButton } from "@/components/RedButton";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/content/projects";
import { getFeaturedProduct } from "@/lib/catalog";

export default async function HomePage() {
  const featured = await getFeaturedProduct();
  const selected = projects.slice(0, 2);

  return (
    <>
      <Hero />

      <section id="about" className="surface-light material-noise overflow-hidden">
        <div className="shell grid items-center gap-14 py-24 md:py-36 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <DrawingSheet
              drawing="mount"
              fig="FIG. 02"
              caption="MECHANICAL ASSEMBLY"
              tall
            />
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="tech text-red">ABOUT RED / 01</p>
            <h2 className="section-title mt-5">
              WE BUILD THE
              <br />IDEAS BETWEEN
              <br />DESIGN AND
              <br />REALITY.
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-8 text-[#55514a]">
              RED combines CAD, mechanical engineering, product design, prototyping and
              manufacturing to turn a clear idea into a physical object.
            </p>
            <div className="mt-9">
              <RedButton href="/about">ABOUT RED</RedButton>
            </div>
          </div>
        </div>
      </section>
      <EngineeringMarquee />

      {selected.length > 0 ? (
      <section className="surface-dark overflow-hidden py-24 md:py-36">
        <div className="shell">
          <div className="mb-16 grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="tech text-red">FEATURED ENGINEERING / 02</p>
              <h2 className="section-title mt-5">BUILT FROM IDEA TO OBJECT.</h2>
            </div>
            <div className="lg:col-span-3 lg:col-start-10">
              <p className="leading-7 text-mist">
                Selected products, mechanisms and fixtures, documented from CAD through revision.
              </p>
              <Link href="/work" className="mt-6 inline-block font-display font-bold tracking-[0.08em] text-red">
                VIEW ALL WORK →
              </Link>
            </div>
          </div>
          <ProjectGrid projects={selected} />
        </div>
      </section>
      ) : null}

      <section id="services" className="surface-graphite py-24 md:py-36">
        <div className="shell">
          <div className="mb-16 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="tech text-red">CAPABILITIES / 03</p>
              <h2 className="section-title mt-5">ENGINEERING AS A COMPLETE SYSTEM.</h2>
            </div>
            <p className="self-end leading-7 text-mist lg:col-span-3 lg:col-start-10">
              Select a capability to inspect the work behind it.
            </p>
          </div>
          <CapabilitySystem />
        </div>
      </section>

      <section className="surface-light material-noise py-20 md:py-28">
        <div className="shell">
          <p className="tech text-red">ENGINEERING STATISTICS / 04</p>
          <div className="mt-10 grid border-t border-l border-black/15 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "INDEPENDENT ENGINEERING STUDIO"],
              ["100%", "DESIGN → MANUFACTURING"],
              ["∞", "ITERATE UNTIL IT WORKS"],
              ["2×", "DIGITAL + PHYSICAL"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="flex min-h-56 flex-col justify-between border-r border-b border-black/15 p-6"
              >
                <p className="font-display text-7xl font-black tracking-[-0.04em] text-red">{value}</p>
                <p className="max-w-[190px] font-display text-lg font-semibold tracking-[0.05em]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-dark py-24 md:py-36">
        <div className="shell grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <DrawingSheet
              drawing="fixture"
              fig="WHY / RED"
              caption="BUILDABLE CAD"
              tall
            />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="tech text-red">WHY RED / 05</p>
            <h2 className="section-title mt-5">ENGINEERING WITHOUT THE CORPORATE DISTANCE.</h2>
            <ul className="mt-9 divide-y divide-paper/10 border-y border-paper/10">
              {[
                "Design with manufacturing in mind",
                "Direct communication",
                "Fast, documented revision",
                "CAD that can actually be built",
                "Digital files and physical production",
              ].map((item, index) => (
                <li key={item} className="flex items-center gap-4 py-4">
                  <span className="font-display text-lg font-bold text-red">0{index + 1}</span>
                  <span className="font-display text-lg font-semibold tracking-[0.035em]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {projects.length > 0 ? (
      <section id="work" className="surface-graphite py-24 md:py-36">
        <div className="shell">
          <div className="mb-16 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="tech text-red">PROJECT PORTFOLIO / 06</p>
              <h2 className="section-title mt-5">WE DESIGN THINGS THAT MOVE.</h2>
            </div>
            <p className="self-end leading-7 text-mist lg:col-span-3 lg:col-start-10">
              Filter the current work by discipline.
            </p>
          </div>
          <ProjectPortfolio />
        </div>
      </section>
      ) : null}

      <section id="process" className="surface-dark py-24 md:py-36">
        <div className="shell">
          <div className="mb-16 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="tech text-red">PROCESS / 07</p>
              <h2 className="section-title mt-5">FROM FIRST IDEA TO DELIVERED OBJECT.</h2>
            </div>
            <p className="self-end leading-7 text-mist lg:col-span-3 lg:col-start-10">
              Each step produces information for the next one. Nothing is hidden behind a final render.
            </p>
          </div>
          <ProcessTimeline />
        </div>
      </section>

      {featured && (
        <section className="surface-light material-noise overflow-hidden py-24 md:py-36">
          <div className="shell">
            <div className="mb-14 grid items-end gap-8 lg:grid-cols-12">
              <div>
                <p className="tech text-red">PRODUCT + CAD SHOWCASE / 08</p>
                <h2 className="section-title mt-5">CAD SHOULD SHOW HOW IT WORKS.</h2>
              </div>
            </div>
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <ProductCard product={featured} />
              </div>
              <div className="lg:col-span-3 lg:col-start-10">
                {featured.revision ? <p className="tech text-red">{featured.revision}</p> : null}
                <h3 className="mt-4 text-4xl">{featured.title}</h3>
                {featured.description ? (
                  <p className="mt-5 text-lg leading-8 text-[#625e57]">
                    {featured.description}
                  </p>
                ) : null}
                {(featured.material || featured.process) ? (
                  <dl className="mt-8 grid grid-cols-2 gap-y-5 border-t border-black/15 pt-5">
                    {featured.material ? (
                      <div>
                        <dt className="tech">MATERIAL</dt>
                        <dd className="mt-1 font-mono text-[11px]">{featured.material}</dd>
                      </div>
                    ) : null}
                    {featured.process ? (
                      <div>
                        <dt className="tech">PROCESS</dt>
                        <dd className="mt-1 font-mono text-[11px]">{featured.process}</dd>
                      </div>
                    ) : null}
                  </dl>
                ) : null}
                <div className="mt-8">
                  <RedButton href={`/products/${featured.handle}`}>SEE DETAILS</RedButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="surface-graphite py-24 md:py-36">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="tech text-red">CREDIBILITY / 09</p>
            <h2 className="section-title mt-5">THE PROOF IS IN THE PROCESS.</h2>
            <p className="mt-7 max-w-md text-lg leading-8 text-mist">
              RED shows revisions, materials, manufacturing choices and the problems found during
              prototyping.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid gap-px bg-paper/10 sm:grid-cols-2">
              {[
                ["REVISION HISTORY", "Every major project records what changed and why."],
                ["REAL MATERIALS", "Parts identify material, process, dimensions and weight."],
                ["BUILDABLE OUTPUT", "CAD is prepared around the process that will make it."],
                ["DIRECT REVIEW", "Project requirements are reviewed before work begins."],
              ].map(([title, body], index) => (
                <div key={title} className="min-h-52 bg-panel p-6">
                  <p className="font-display text-3xl font-bold text-red">0{index + 1}</p>
                  <h3 className="mt-8 text-xl">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-mute">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="surface-light material-noise py-24 md:py-36">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="tech text-red">FAQ / 10</p>
            <h2 className="section-title mt-5">PROJECT QUESTIONS.</h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-28 md:py-44">
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 opacity-[0.09]">
          <BrandMark className="h-[460px] w-[460px] md:h-[620px] md:w-[620px]" />
        </div>
        <div className="shell relative grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-9 flex items-center gap-3">
              <span className="red-led" aria-hidden />
              <p className="tech">FINAL CTA / 11</p>
            </div>
            <h2 className="section-title max-w-[9ch]">HAVE AN IDEA? LET&apos;S BUILD IT.</h2>
            <p className="mt-7 max-w-md text-lg leading-8 text-mist">
              From first sketch to manufactured object.
            </p>
            <div className="mt-10">
              <RedButton href="/contact">START A PROJECT</RedButton>
            </div>
          </div>
          <div className="self-end border-t border-paper/10 pt-6 lg:col-span-3 lg:col-start-10">
            <p className="tech text-red">PROJECT INTAKE</p>
            <p className="mt-4 leading-7 text-mist">
              Send STEP, STL, DXF, PDF, images or a written brief.
            </p>
            <Link href="/contact" className="mt-6 inline-block font-display font-bold tracking-[0.08em] text-paper">
              OPEN CONTACT FORM →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
