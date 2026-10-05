import type { Metadata } from "next";
import { ProjectGrid } from "@/components/ProjectCard";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected engineering, CAD and manufacturing work from RED.",
};

export default function WorkPage() {
  return (
    <>
      <header className="border-b border-paper/10">
        <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="tech text-red">INDEX / WORK / {String(projects.length).padStart(2, "0")}</p>
            <h1 className="section-title mt-5">ENGINEERING WORK.</h1>
          </div>
        </div>
      </header>
      <div className="shell py-24 md:py-36">
        <ProjectGrid projects={projects} />
      </div>
    </>
  );
}
