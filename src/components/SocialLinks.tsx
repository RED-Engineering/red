import { site } from "@/lib/site";

const ease = "duration-700 ease-[cubic-bezier(0.45,0.05,0.2,1)]";

const links = [
  { href: site.social.instagram, label: "Instagram", icon: InstagramIcon },
  { href: site.social.tiktok, label: "TikTok", icon: TikTokIcon },
  { href: site.social.youtube, label: "YouTube", icon: YouTubeIcon },
] as const;

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {links.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
            className={`group inline-flex h-12 items-center gap-2.5 rounded-[8px] border border-paper/15 bg-paper/[0.04] px-3 text-paper transition-[transform,background-color,border-color,box-shadow,color] ${ease} hover:-translate-y-1 hover:border-red hover:bg-red hover:text-warm-white hover:shadow-[0_14px_34px_rgba(255,49,49,0.28)]`}
          >
            <item.icon />
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase">{item.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle
        cx="12"
        cy="12"
        r="3.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className={`origin-center [transform-box:fill-box] transition-transform ${ease} group-hover:scale-125`}
      />
      <circle
        cx="16.6"
        cy="7.4"
        r="0.9"
        fill="currentColor"
        className={`origin-center transition-transform ${ease} group-hover:scale-150`}
      />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 overflow-visible" aria-hidden>
      <g className={`translate-x-px translate-y-px text-red transition-transform ${ease} group-hover:translate-x-1 group-hover:text-ink`}>
        <Note />
      </g>
      <g className={`transition-transform ${ease} group-hover:-translate-x-0.5`}>
        <Note />
      </g>
    </svg>
  );
}

function Note() {
  return (
    <path
      d="M14.2 4.2v9.1a2.7 2.7 0 1 1-1.7-2.5V7.1L8.2 8.4v6.6a2.7 2.7 0 1 1-1.7-2.5V6.4l7.7-2.2Z"
      fill="currentColor"
    />
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <rect x="3" y="6.2" width="18" height="11.6" rx="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M10.4 9.4v5.2l4.6-2.6Z"
        fill="currentColor"
        className={`origin-center transition-transform ${ease} group-hover:translate-x-0.5 group-hover:scale-110`}
      />
    </svg>
  );
}
