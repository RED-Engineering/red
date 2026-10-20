import type { Metadata } from "next";
import { RedButton } from "@/components/RedButton";
import { ServiceRun } from "@/components/ServiceRun";

export const metadata: Metadata = {
  title: "Engineering",
  description: "From an idea on paper to something you can hold.",
};

export default function EngineeringPage() {
  return (
    <>
      <header className="shell pt-32 md:pt-40">
        <h1 className="section-title max-w-[12ch]">
          From idea
          <br />
          to object.
        </h1>
      </header>

      <ServiceRun />

      <section className="shell py-12 pb-24 md:py-16">
        <div className="glass-media max-w-2xl rounded-[8px] p-8 md:p-10">
          <h2 className="section-title max-w-[12ch]">Start a project.</h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-mist">
            Send the requirements, constraints and any files you already have.
          </p>
          <div className="mt-8">
            <RedButton href="/contact">SEND PROJECT</RedButton>
          </div>
        </div>
      </section>
    </>
  );
}
