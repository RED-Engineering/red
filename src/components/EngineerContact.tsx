import Image from "next/image";
import { site } from "@/lib/site";

function displayPhone(phone: string) {
  if (phone.startsWith("+40") && phone.length === 12) {
    return `+40 ${phone.slice(3, 6)} ${phone.slice(6, 9)} ${phone.slice(9)}`;
  }
  return phone;
}

const action =
  "inline-flex h-12 flex-1 items-center justify-center rounded-[2px] font-display text-sm font-bold tracking-[0.08em] transition-[transform,border-color,background-color,box-shadow] duration-200 hover:-translate-y-0.5";

export function EngineerContact() {
  return (
    <aside className="glass-media rounded-[8px] p-6 md:p-8">
      <div className="grid grid-cols-[1fr_minmax(6.75rem,40%)] items-center gap-5 md:gap-7">
        <div className="min-w-0">
          <p className="tech text-red">CONTACT</p>
          <h2 className="mt-4 text-4xl tracking-[-0.04em] md:text-5xl">{site.contactName}</h2>
          <p className="mt-2 font-display text-sm font-semibold tracking-[0.14em] text-mist">
            {site.contactRole}
          </p>
          <p className="mt-6 font-mono text-[11px] tracking-[0.08em] break-all text-mist">
            {site.email}
          </p>
          <p className="mt-2 font-mono text-[11px] tracking-[0.08em] text-mist">
            {displayPhone(site.phone)}
          </p>
        </div>
        <div className="portrait-mask relative aspect-[141/160] w-full overflow-hidden">
          <Image
            src="/brand/david-toth.jpg"
            alt={site.contactName}
            fill
            sizes="(min-width: 1024px) 180px, 40vw"
            className="object-cover object-[50%_42%]"
          />
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={`mailto:${site.email}`}
          className={`${action} bg-red px-6 text-warm-white hover:bg-[#ff4141] hover:shadow-[0_8px_30px_rgba(255,49,49,0.16)]`}
        >
          EMAIL
        </a>
        <a
          href={`tel:${site.phone}`}
          className={`${action} border border-paper/15 bg-paper/[0.04] px-6 text-paper hover:border-paper/35 hover:bg-paper/[0.08]`}
        >
          CALL
        </a>
      </div>
    </aside>
  );
}
