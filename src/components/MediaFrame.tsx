import Image from "next/image";

export function MediaFrame({
  src,
  alt,
  tall = false,
  compact = false,
  priority = false,
}: {
  src?: string;
  alt: string;
  tall?: boolean;
  compact?: boolean;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[8px] bg-charcoal ${
        compact
          ? "aspect-square"
          : tall
            ? "aspect-[4/5] min-h-[420px]"
            : "aspect-[4/3] min-h-[280px]"
      }`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 70vw, 100vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 grid-bg" />
      )}
    </div>
  );
}
