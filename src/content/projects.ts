import type { RedProject } from "./types";

export const projects: RedProject[] = [
  // Drop photos in public/work/{slug}/ then add an entry, for example:
  // {
  //   slug: "project-name",
  //   code: "RED-001",
  //   title: "PROJECT NAME",
  //   year: "2026",
  //   oneLiner: "One sentence about the object.",
  //   role: "DESIGN / CAD / ENGINEERING",
  //   process: "CNC / LASER",
  //   material: "AL 6061",
  //   status: "PRODUCT",
  //   featuredSize: "large",
  //   cover: "/work/project-name/cover.jpg",
  //   gallery: [{ src: "/work/project-name/01.jpg", caption: "ASSEMBLY" }],
  //   problem: "",
  //   idea: "",
  //   cad: "",
  //   prototype: "",
  //   manufacturing: "",
  //   result: "",
  //   revisions: [{ rev: "REV.01", note: "Current." }],
  // },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectByCode(code: string) {
  return projects.find((p) => p.code === code);
}
