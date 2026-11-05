import type { Metadata } from "next";
import Link from "next/link";
import { RedButton } from "@/components/RedButton";
import { ServiceRun } from "@/components/ServiceRun";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Mechanical design for sheet metal, machining, laser, welding, printing, molding, and other processes, plus the CAD and drawings to make the part.",
};

export default function EngineeringPage() {
  return (
    <>
      <header className="shell pt-32 md:pt-40">
        <h1 className="section-title max-w-[16ch]">The part, the process, and the files to make it.</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-mist">
          RED designs physical parts for the manufacturing process they need. Sheet metal is one
          process. Machining, cutting, welding, printing, and molding are others. Bring one part,
          an existing model, or an idea with no files yet. The sketches below are studies, not
          client projects.
        </p>
        <p className="mt-4 max-w-xl text-[15px] leading-7 text-mist">
          A single task, a product, or extra capacity for your team.{" "}
          <Link href="/#engage" className="text-paper underline decoration-red/70 underline-offset-4 hover:text-red">
            See how a job can be scoped.
          </Link>
        </p>
      </header>

      <ServiceRun />

      <section className="shell py-12 pb-24 md:py-16">
        <div className="glass-media max-w-2xl rounded-[8px] p-8 md:p-10">
          <h2 className="section-title max-w-[14ch]">Tell us what you need.</h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-mist">
            A description is enough. Drawings, CAD, photos, material, and quantity help when you
            have them. The scope is agreed before work starts.
          </p>
          <div className="mt-8">
            <RedButton href="/contact">TELL US WHAT YOU NEED</RedButton>
          </div>
        </div>
      </section>
    </>
  );
}
