import { HeroAssembly } from "@/components/HeroAssembly";
import { RedButton } from "@/components/RedButton";

const capabilities = [
  ["01", "SHEET METAL"],
  ["02", "MACHINING"],
  ["03", "WELDING"],
  ["04", "ANY PROCESS"],
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-paper/10 bg-panel">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_42%,rgba(255,49,49,0.14),transparent_32%),linear-gradient(90deg,rgba(13,13,12,0.88)_0%,rgba(13,13,12,0.45)_46%,rgba(13,13,12,0.2)_100%)]" />
      <div className="absolute top-0 right-0 h-full w-1.5 bg-red" />

      <div className="shell relative z-10 grid items-center gap-1 pt-28 pb-6 lg:min-h-[740px] lg:grid-cols-12 lg:gap-6 lg:pt-36 lg:pb-16">
        <div className="max-w-xl lg:col-span-5">
          <p className="tech mb-5 text-red">ANY MANUFACTURING PROCESS</p>
          <h1 className="display max-w-[11ch]">
            ENGINEERING
            <br />
            THAT
            <br />
            FEELS
            <br />
            HUMAN.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-8 text-mist lg:mt-6">
            RED designs mechanical parts and assemblies, then prepares them for the process that
            makes them — sheet metal, machining, laser, welding, printing, molding, or another
            process the part needs.
          </p>
          <p className="mt-3 max-w-md text-[15px] leading-7 text-mist/80">
            For a company that needs a part designed, an existing design made manufacturable, or
            extra engineering capacity. A sketch is enough to start. Making the part is arranged
            with partners when the job includes production.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 lg:mt-8">
            <RedButton href="/contact">TELL US WHAT YOU NEED</RedButton>
            <RedButton href="/engineering" variant="ghost">
              SEE THE SERVICES
            </RedButton>
          </div>
        </div>

        <div className="pointer-events-none mx-auto aspect-[4/5] w-full lg:col-span-7 lg:mx-0 lg:aspect-auto lg:h-[640px]">
          <HeroAssembly />
        </div>
      </div>

      <div className="relative border-t border-paper/10 bg-ink/90">
        <div className="shell grid grid-cols-2 lg:grid-cols-4">
          {capabilities.map(([number, label]) => (
            <div
              key={number}
              className="flex min-h-20 items-center gap-4 border-r border-b border-paper/10 px-4 last:border-r-0 lg:border-b-0"
            >
              <span className="font-display text-2xl font-bold text-red">{number}</span>
              <span className="font-display text-sm font-semibold tracking-[0.08em] text-paper">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
