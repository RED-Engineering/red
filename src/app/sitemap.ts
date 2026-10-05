import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/work",
    "/products",
    "/engineering",
    "/about",
    "/contact",
    "/legal/privacy",
    "/legal/terms",
    "/legal/shipping",
    "/legal/returns",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
  }));

  const work = projects.map((project) => ({
    url: `${site.url}/work/${project.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...work];
}
