import type { Metadata } from "next";
import { EngineeringProcess } from "@/components/EngineeringProcess";
import { RedButton } from "@/components/RedButton";

export const metadata: Metadata = {
  title: "Engineering",
  description: "From an idea on paper to something you can hold.",
};

const capabilities = [
  "CAD",
  "PRODUCT DESIGN",
  "MECHANICAL DESIGN",
  "SHEET METAL",
  "LASER CUTTING",
  "WATERJET",
  "BENDING",
  "FABRICATION",
  "PROTOTYPING",
  "ASSEMBLY",
];

export default function EngineeringPage() {
  return (
    <>
      <header className="shell grid gap-12 py-20 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="tech text-red">INDEX / ENGINEERING</p>
          <h1 className="section-title mt-5">
            FROM IDEA
            <br />
            TO OBJECT.
          </h1>
        </div>
        <div className="self-end lg:col-span-3 lg:col-start-10">
          <p className="text-xl leading-8 text-mist">
            From an idea on paper to something you can hold.
          </p>
          <p className="mt-6 leading-7 text-mute">
            RED takes a problem through CAD, mechanical design and prototyping, using manufacturing
            partners where the process demands it.
          </p>
        </div>
      </header>

      <section className="surface-graphite border-y border-paper/10 py-16 md:py-20">
        <div className="shell">
          <p className="tech mb-8 text-red">CAPABILITY / CURRENT</p>
          <ul className="grid grid-cols-2 border-t border-l border-paper/10 sm:grid-cols-5">
            {capabilities.map((item, index) => (
              <li
                key={item}
                className="flex min-h-24 flex-col justify-between border-r border-b border-paper/10 p-4 font-mono text-[10px] tracking-[0.14em]"
              >
                <span className="text-red">{String(index + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="surface-light material-noise py-24 md:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="tech text-red">PROCESS / 01—06</p>
            <h2 className="mt-4 text-5xl tracking-[-0.05em]">WORKFLOW</h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <EngineeringProcess />
          </div>
        </div>
      </section>

      <section className="shell py-24 md:py-32">
        <h2 className="max-w-3xl text-5xl leading-[0.95] tracking-[-0.05em]">
          START A PROJECT.
        </h2>
        <p className="mt-6 max-w-lg text-lg leading-8 text-mist">
          Send the requirements, constraints and reference files.
        </p>
        <div className="mt-9">
          <RedButton href="/contact">SEND PROJECT</RedButton>
        </div>
      </section>
    </>
  );
}
