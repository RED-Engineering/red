import Link from "next/link";
import { MediaFrame } from "@/components/MediaFrame";
import type { RedProject } from "@/content/types";

export function ProjectCard({
  project,
  size = "medium",
  index = 0,
}: {
  project: RedProject;
  size?: "large" | "medium" | "small";
  index?: number;
}) {
  const placements = [
    "md:col-span-8",
    "md:col-span-5 md:col-start-8 md:mt-28",
    "md:col-span-7 md:col-start-2 md:mt-8",
    "md:col-span-4 md:col-start-9 md:mt-36",
  ];
  const span = placements[index % placements.length] ??
    (size === "large" ? "md:col-span-8" : size === "small" ? "md:col-span-4" : "md:col-span-6");

  return (
    <article className={span}>
      <Link href={`/work/${project.slug}`} className="group block">
        <div className="glass-media relative overflow-hidden rounded-[8px] transition-[border-color,background-color] duration-300">
          <MediaFrame
            src={project.cover}
            alt={project.title}
            tall={index % 3 !== 1}
            className="rounded-[8px]"
          />
          <span className="absolute right-4 bottom-4 translate-y-2 rounded-[2px] bg-red px-3 py-2 font-mono text-[9px] tracking-[0.15em] text-warm-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            VIEW PROJECT →
          </span>
        </div>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="tech text-red">{project.code.replace("-", " / ")}</p>
            <h3 className="mt-2 text-3xl tracking-[-0.035em] transition-transform duration-300 group-hover:translate-x-1">
              {project.title}
            </h3>
          </div>
          <p className="tech max-w-[34ch] text-right leading-5">
            {project.year}
            <br />
            {project.role}
          </p>
        </div>
      </Link>
    </article>
  );
}

export function ProjectGrid({
  projects,
}: {
  projects: RedProject[];
}) {
  if (projects.length === 0) return null;

  return (
    <div className="grid gap-y-20 md:grid-cols-12 md:gap-x-8 md:gap-y-10">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          size={project.featuredSize}
          index={index}
        />
      ))}
    </div>
  );
}
