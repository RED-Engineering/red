import Link from "next/link";

export function RedButton({
  href,
  children,
  variant = "solid",
  type,
  disabled,
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  const className =
    variant === "solid"
      ? "group relative inline-flex h-12 items-center justify-center gap-6 overflow-hidden rounded-[2px] bg-red px-6 font-display text-sm font-bold tracking-[0.08em] text-warm-white shadow-[0_0_0_rgba(255,49,49,0)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#ff4141] hover:shadow-[0_8px_30px_rgba(255,49,49,0.16)] disabled:opacity-40"
      : "group inline-flex h-12 items-center justify-center gap-6 rounded-[2px] border border-paper/15 bg-panel px-6 font-display text-sm font-bold tracking-[0.08em] text-paper transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-paper/35 hover:bg-charcoal disabled:opacity-40";
  const content = (
    <>
      <span>{children}</span>
      <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
    </>
  );

  if (href) {
    if (href.startsWith("/api/")) {
      return (
        <a href={href} className={className}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} className={className} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
}
