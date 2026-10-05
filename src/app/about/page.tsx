import type { Metadata } from "next";
import { DrawingSheet } from "@/components/DrawingSheet";

export const metadata: Metadata = {
  title: "About",
  description: "Why RED exists. Engineering, CAD, manufacturing, and making things real.",
};

export default function AboutPage() {
  return (
    <>
      <header className="shell py-20 md:py-28">
        <p className="tech text-red">INDEX / ABOUT</p>
        <h1 className="section-title mt-6 max-w-[13ch]">
          WE DESIGN THINGS THAT CAN BE MADE.
        </h1>
      </header>

      <section className="surface-light material-noise py-20 md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <DrawingSheet drawing="fixture" fig="WORKSHOP / 01" caption="WORKHOLDING" tall />
          </div>
          <div className="flex flex-col justify-center lg:col-span-4 lg:col-start-9">
            <p className="tech text-red">RED</p>
            <p className="mt-2 font-mono text-[10px] tracking-[0.16em] text-[#69655e]">
              DESIGN / CAD / MANUFACTURING
            </p>
            <div className="mt-8 space-y-5 text-lg leading-8 text-[#5d5952]">
              <p>
                RED is an independent engineering and product design studio.
              </p>
              <p>
                We use CAD to solve how a product works, how its parts fit, and how it will be
                manufactured.
              </p>
              <p>
                Prototypes are built, tested and revised before the final object is made.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-20 md:py-28">
        <div className="mb-10 grid gap-6 md:grid-cols-12">
          <h2 className="text-4xl tracking-[-0.045em] md:col-span-5">THE PROCESS IS THE WORK.</h2>
          <p className="max-w-xl leading-7 text-mist md:col-span-6 md:col-start-7">
            Screen, mechanism, finished object. The gaps between them are where the useful mistakes
            happen.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-12">
          <figure className="md:col-span-5">
            <DrawingSheet drawing="control" fig="CAD / 01" caption="SCREEN" tall />
          </figure>
          <figure className="md:col-span-3 md:mt-24">
            <DrawingSheet drawing="hinge" fig="SHOP / 02" caption="MECHANISM" />
          </figure>
          <figure className="md:col-span-4 md:mt-10">
            <DrawingSheet drawing="mount" fig="OBJECT / 03" caption="FINISHED" tall />
          </figure>
        </div>
      </section>
    </>
  );
}
