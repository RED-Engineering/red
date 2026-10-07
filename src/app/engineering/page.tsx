import type { Metadata } from "next";
import { EngineeringProcess } from "@/components/EngineeringProcess";
import { RedButton } from "@/components/RedButton";

export const metadata: Metadata = {
  title: "Engineering",
  description: "From an idea on paper to something you can hold.",
};

const bench = [
  "CAD",
  "PRODUCT DESIGN",
  "MECHANICAL",
  "SHEET METAL",
  "LASER",
  "WATERJET",
  "BENDING",
  "FABRICATION",
  "PROTOTYPE",
  "ASSEMBLY",
];

export default function EngineeringPage() {
  return (
    <>
      <header className="shell pt-32 md:pt-40">
        <h1 className="section-title max-w-[12ch]">
          From idea
          <br />
          to object.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-mist">
          CAD, mechanical design, a prototype, then the part. Manufacturing partners step in where
          the process demands it.
        </p>
      </header>

      <section className="shell py-12 md:py-16">
        <h2 className="text-4xl tracking-[-0.04em] md:text-5xl">On the bench.</h2>
        <ul className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {bench.map((item, index) => (
            <li
              key={item}
              className="glass-media flex min-h-28 flex-col justify-between rounded-[8px] p-4"
            >
              <span className="font-display text-lg font-bold text-red">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-lg font-bold tracking-[0.04em]">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="shell pb-8 md:pb-12">
        <h2 className="section-title max-w-[12ch]">How it runs.</h2>
        <p className="mt-5 max-w-xl text-lg leading-8 text-mist">
          Each step hands something real to the next one.
        </p>
        <div className="mt-10">
          <EngineeringProcess />
        </div>
      </section>

      <section className="shell py-12 pb-24 md:py-16">
        <div className="glass-media max-w-2xl rounded-[8px] p-8 md:p-10">
          <h2 className="section-title max-w-[12ch]">Start a project.</h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-mist">
            Send the requirements, constraints and any files you already have.
          </p>
          <div className="mt-8">
            <RedButton href="/contact">SEND PROJECT</RedButton>
          </div>
        </div>
      </section>
    </>
  );
}
