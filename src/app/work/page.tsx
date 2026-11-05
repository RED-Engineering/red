import type { Metadata } from "next";
import Link from "next/link";
import { DrawingSheet } from "@/components/DrawingSheet";
import { ProjectGrid } from "@/components/ProjectCard";
import { RedButton } from "@/components/RedButton";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Photographed RED projects go here when they exist. Until then, the page shows the kinds of parts the studio designs.",
};

const studies = [
  {
    drawing: "control" as const,
    caption: "ENCLOSURE",
    line: "Electrical housings and equipment covers: a box that fits what is inside and can be made from sheet.",
  },
  {
    drawing: "mount" as const,
    caption: "BRACKET",
    line: "Sheet-metal brackets and mounts: cut flat, then bent, with a drawing a fabricator can follow.",
  },
  {
    drawing: "hinge" as const,
    caption: "ASSEMBLY",
    line: "Mechanisms and small assemblies: parts that have to fit, fasten, or move together.",
  },
];

export default function WorkPage() {
  return (
    <div className="relative min-h-[80vh] overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_0%,rgba(255,49,49,0.14),transparent_36%)]" />
      <div className="shell relative pt-32 pb-28">
        <div className="text-center">
          <h1 className="display">WORK</h1>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-8 text-mist">
            Finished jobs, photographed. Nothing goes on this wall until the part is real and the
            photo is real.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="glass-media mx-auto mt-16 max-w-xl rounded-[8px] px-6 py-10 text-center md:px-10">
            <p className="font-display text-4xl tracking-[-0.04em] md:text-5xl">No project photos yet.</p>
            <p className="mx-auto mt-4 max-w-sm text-lg leading-8 text-mist">
              A job is added here after it is made and photographed. The studies below are examples
              of the kind of part, not completed client work.
            </p>
            <div className="mt-8 flex justify-center">
              <RedButton href="/contact">TELL US WHAT YOU NEED</RedButton>
            </div>
          </div>
        ) : (
          <div className="mt-16">
            <ProjectGrid projects={projects} />
          </div>
        )}

        <section className="mt-20">
          <h2 className="section-title max-w-[14ch]">The kind of part</h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-mist">
            Labeled studies. They show the object, not a customer, a quantity, or a result.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {studies.map((study) => (
              <figure key={study.caption}>
                <DrawingSheet drawing={study.drawing} fig="STUDY" caption={study.caption} />
                <figcaption className="mt-4 text-[15px] leading-7 text-mist">{study.line}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-10 max-w-xl text-[15px] leading-7 text-mist">
            A real part you can buy today is in the{" "}
            <Link href="/products" className="text-paper underline decoration-red/70 underline-offset-4 hover:text-red">
              shop
            </Link>
            , separate from custom project work.
          </p>
        </section>
      </div>
    </div>
  );
}
