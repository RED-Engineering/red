import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MediaFrame } from "@/components/MediaFrame";
import { RedButton } from "@/components/RedButton";
import { TechnicalMeta } from "@/components/TechnicalMeta";
import { getProject, projects } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.oneLiner,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const latest = project.revisions.at(-1);
  const gallery = project.gallery.length
    ? project.gallery
    : project.cover
      ? [{ src: project.cover, caption: project.title }]
      : [];

  return (
    <article>
      <header className="shell grid gap-12 py-16 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3">
            <span className="red-led" aria-hidden />
            <p className="tech text-red">{project.code.replace("-", " / ")}</p>
          </div>
          <h1 className="section-title mt-6">{project.title}</h1>
          <p className="mt-7 max-w-2xl text-xl leading-8 text-mist">{project.oneLiner}</p>
        </div>
        <div className="self-end lg:col-span-4 lg:col-start-9">
          <TechnicalMeta
            items={[
              { label: "YEAR", value: project.year },
              { label: "ROLE", value: project.role },
              { label: "PROCESS", value: project.process },
              { label: "STATUS", value: project.status },
            ].filter((item) => item.value)}
          />
        </div>
      </header>

      {gallery.length > 0 ? (
        <div className="relative border-y border-paper/10 bg-panel py-10 md:py-16">
          <div className="shell grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <MediaFrame src={gallery[0]?.src} alt={gallery[0]?.caption || project.title} tall />
            </div>
            {gallery[1] ? (
              <div className="lg:col-span-3 lg:mt-32">
                <MediaFrame src={gallery[1].src} alt={gallery[1].caption} />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="surface-light material-noise py-20 md:py-32">
        <div className="shell">
          <Story index="01" title="THE PROBLEM" body={project.problem} />
          <Story index="02" title="THE IDEA" body={project.idea} />
          <Story index="03" title="THE CAD" body={project.cad} />
          <Story index="04" title="THE PROTOTYPE" body={project.prototype} />
          <Story index="05" title="THE MANUFACTURING" body={project.manufacturing} />
          <Story index="06" title="THE RESULT" body={project.result} />

          {gallery.slice(2).length > 0 ? (
            <div className="mt-16 grid gap-6 md:grid-cols-2">
              {gallery.slice(2).map((figure) => (
                <MediaFrame key={figure.src} src={figure.src} alt={figure.caption} />
              ))}
            </div>
          ) : null}

          {project.revisions.length > 0 ? (
            <section className="mt-24 border-t border-black/15 pt-10">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="tech text-red">CHANGE LOG</p>
                  <h2 className="mt-3 text-4xl tracking-[-0.045em]">REVISION</h2>
                </div>
                {latest ? <p className="tech">CURRENT / {latest.rev}</p> : null}
              </div>
              <ul className="mt-10 divide-y divide-black/15 border-y border-black/15">
                {project.revisions.map((rev) => (
                  <li key={rev.rev} className="grid gap-3 py-6 md:grid-cols-12">
                    <p className="tech text-red md:col-span-2">{rev.rev}</p>
                    <p className="text-[#625e57] md:col-span-10">{rev.note}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </div>

      {project.relatedProductHandle && (
        <section className="surface-graphite py-20 md:py-28">
          <div className="shell">
            <p className="tech text-red">RELATED PRODUCT</p>
            <h2 className="mt-4 text-5xl tracking-[-0.05em]">{project.title}</h2>
            <div className="mt-8">
              <RedButton href={`/products/${project.relatedProductHandle}`}>
                VIEW PRODUCT
              </RedButton>
            </div>
          </div>
        </section>
      )}

      <p className="shell py-10">
        <Link href="/work" className="tech link-line inline-block py-2 hover:text-red">
          ← ALL WORK
        </Link>
      </p>
    </article>
  );
}

function Story({ index, title, body }: { index: string; title: string; body: string }) {
  if (!body) return null;
  return (
    <section className="grid gap-6 border-t border-black/15 py-12 lg:grid-cols-12 lg:py-16">
      <div className="lg:col-span-4">
        <p className="tech text-red">{index} / PROCESS</p>
        <h2 className="mt-3 text-3xl tracking-[-0.04em]">{title}</h2>
      </div>
      <p className="max-w-2xl text-xl leading-9 text-[#625e57] lg:col-span-7 lg:col-start-6">{body}</p>
    </section>
  );
}
