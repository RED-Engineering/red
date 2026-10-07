import type { Metadata } from "next";
import { ProjectGrid } from "@/components/ProjectCard";
import { RedButton } from "@/components/RedButton";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected engineering, CAD and manufacturing work from RED.",
};

export default function WorkPage() {
  return (
    <div className="relative min-h-[80vh] overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_0%,rgba(255,49,49,0.14),transparent_36%)]" />
      <div className="shell relative pt-32 pb-28">
        <div className="text-center">
          <h1 className="display">WORK</h1>
          <p className="mx-auto mt-6 max-w-md text-lg leading-8 text-mist">
            Finished objects. Real photos only.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="glass-media mx-auto mt-16 max-w-xl rounded-[8px] px-6 py-10 text-center md:px-10">
            <p className="font-display text-4xl tracking-[-0.04em] md:text-5xl">
              Nothing on the wall yet.
            </p>
            <p className="mx-auto mt-4 max-w-sm text-lg leading-8 text-mist">
              A project goes up when there are real photos of the finished part.
            </p>
            <div className="mt-8 flex justify-center">
              <RedButton href="/contact">START A PROJECT</RedButton>
            </div>
          </div>
        ) : (
          <div className="mt-16">
            <ProjectGrid projects={projects} />
          </div>
        )}
      </div>
    </div>
  );
}
