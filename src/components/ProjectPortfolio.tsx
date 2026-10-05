"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projects";

const filters = ["ALL", "PRODUCTS", "CAD", "ENGINEERING", "PROTOTYPES", "MANUFACTURING"] as const;

function matches(project: (typeof projects)[number], filter: (typeof filters)[number]) {
  if (filter === "ALL") return true;
  const source = `${project.status} ${project.role} ${project.process}`.toUpperCase();
  if (filter === "PRODUCTS") return source.includes("PRODUCT");
  if (filter === "PROTOTYPES") return source.includes("PROTOTYPE") || source.includes("EXPERIMENT");
  return source.includes(filter.replace(/S$/, ""));
}

export function ProjectPortfolio() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("ALL");
  const reduce = useReducedMotion();
  const visible = useMemo(() => projects.filter((project) => matches(project, filter)), [filter]);

  return (
    <>
      <div className="mb-16 flex flex-wrap gap-x-7 gap-y-3 border-y border-paper/10 py-5">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            className={`font-display text-sm font-semibold tracking-[0.08em] transition-colors ${
              filter === item ? "text-red" : "text-mute hover:text-paper"
            }`}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-y-20 md:grid-cols-12 md:gap-x-8">
        <AnimatePresence mode="popLayout">
          {visible.map((project, index) => (
            <motion.div
              layout
              key={project.slug}
              className={
                index % 3 === 0
                  ? "md:col-span-8"
                  : index % 3 === 1
                    ? "md:col-span-4 md:mt-28"
                    : "md:col-span-6 md:col-start-4"
              }
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: 12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} size={index === 0 ? "large" : "medium"} index={0} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
