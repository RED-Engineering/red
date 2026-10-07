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
      <header className="shell grid gap-12 pt-32 pb-12 md:pt-40 lg:grid-cols-12">
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

      <div className="shell py-12 md:py-16">
        <div className="grid gap-3">
          <Story index="01" title="The problem" body={project.problem} />
          <Story index="02" title="The idea" body={project.idea} />
          <Story index="03" title="The CAD" body={project.cad} />
          <Story index="04" title="The prototype" body={project.prototype} />
          <Story index="05" title="The manufacturing" body={project.manufacturing} />
          <Story index="06" title="The result" body={project.result} />
        </div>

        {gallery.slice(2).length > 0 ? (
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {gallery.slice(2).map((figure) => (
              <div key={figure.src} className="glass-media overflow-hidden rounded-[8px]">
                <MediaFrame src={figure.src} alt={figure.caption} className="rounded-[8px]" />
              </div>
            ))}
          </div>
        ) : null}

        {project.revisions.length > 0 ? (
          <section className="glass-media mt-3 rounded-[8px] p-6 md:p-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-4xl tracking-[-0.045em]">Revision</h2>
              {latest ? <p className="tech text-red">CURRENT / {latest.rev}</p> : null}
            </div>
            <ul className="mt-6 divide-y divide-paper/10">
              {project.revisions.map((rev) => (
                <li key={rev.rev} className="grid gap-3 py-5 md:grid-cols-12">
                  <p className="tech text-red md:col-span-2">{rev.rev}</p>
                  <p className="text-mist md:col-span-10">{rev.note}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      {project.relatedProductHandle && (
        <section className="shell pb-16">
          <div className="glass-media max-w-2xl rounded-[8px] p-8 md:p-10">
            <p className="tech text-red">IN THE SHOP</p>
            <h2 className="mt-4 text-5xl tracking-[-0.05em]">{project.title}</h2>
            <div className="mt-8">
              <RedButton href={`/products/${project.relatedProductHandle}`}>VIEW PRODUCT</RedButton>
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
    <section className="glass-media rounded-[8px] p-6 md:p-8">
      <p className="font-display text-lg font-bold text-red">{index}</p>
      <h2 className="mt-4 text-3xl tracking-[-0.04em]">{title}</h2>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-mist">{body}</p>
    </section>
  );
}
