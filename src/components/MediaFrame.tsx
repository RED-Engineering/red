import Image from "next/image";

export function MediaFrame({
  src,
  alt,
  tall = false,
  compact = false,
  priority = false,
  contain = false,
  tight = false,
  sizes = "(min-width: 1024px) 70vw, 100vw",
  className = "rounded-[8px]",
  imageClassName,
}: {
  src?: string;
  alt: string;
  tall?: boolean;
  compact?: boolean;
  priority?: boolean;
  contain?: boolean;
  tight?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className} ${
        contain ? "bg-transparent" : "bg-charcoal"
      } ${
        compact
          ? "aspect-square"
          : tall
            ? "aspect-[4/5] min-h-[420px]"
            : tight || contain
              ? "aspect-[4/3]"
              : "aspect-[4/3] min-h-[280px]"
      }`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={
            contain
              ? "object-contain p-5 sm:p-7"
              : `object-cover object-center ${imageClassName ?? ""}`
          }
        />
      ) : (
        <div className="absolute inset-0 grid-bg" />
      )}
    </div>
  );
}
