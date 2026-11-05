import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { CapabilitySystem } from "@/components/CapabilitySystem";
import { EngineeringMarquee } from "@/components/EngineeringMarquee";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { ProjectGrid } from "@/components/ProjectCard";
import { ProcessWall } from "@/components/ProcessWall";
import { ProjectRun } from "@/components/ProjectRun";
import { RedButton } from "@/components/RedButton";
import { WaysToWork } from "@/components/WaysToWork";
import { projects } from "@/content/projects";
import { getFeaturedProduct } from "@/lib/catalog";

export default async function HomePage() {
  const featured = await getFeaturedProduct();
  const selected = projects.slice(0, 2);

  return (
    <>
      <Hero />
      <EngineeringMarquee />
      <ProcessWall />

      <section id="work-types" className="surface-dark scroll-mt-24 border-t border-paper/10 py-16 md:py-24">
        <div className="shell">
          <h2 className="section-title max-w-[14ch]">What you can bring</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-mist">
            A problem, a sketch, or a part that already exists. The process is not limited to sheet
            metal. The drawing is a study, not a client project.
          </p>
          <div className="mt-12">
            <CapabilitySystem />
          </div>
        </div>
      </section>

      <ProjectRun />
      <WaysToWork />

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
            <p className="mx-auto mt-5 max-w-lg text-center text-lg leading-8 text-mist">
              The shop is separate from custom engineering. Buy a CAD file or a finished part
              directly. A different size or fit is a project, not a checkout option.
            </p>
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
            <h2 className="section-title max-w-[12ch]">Tell us what you need.</h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-mist">
              A short description is enough. Add a sketch, a CAD file, or a photo if you have one.
              RED replies with the next step.
            </p>
            <div className="mt-8">
              <RedButton href="/contact">TELL US WHAT YOU NEED</RedButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
