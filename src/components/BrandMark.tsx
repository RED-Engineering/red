import Image from "next/image";

export function BrandMark({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={`brand-mark ${className}`} aria-label="RED">
      <Image
        src="/brand/red-mark.png"
        alt=""
        width={233}
        height={237}
        priority={priority}
        className="h-full w-full object-contain"
      />
    </span>
  );
}
