import { TechnicalDrawing } from "@/components/TechnicalDrawing";
import { TechnicalLabel } from "@/components/TechnicalLabel";
import type { DrawingId } from "@/content/types";

export function DrawingSheet({
  drawing,
  code,
  revision,
  fig,
  caption,
  explode,
  tall = false,
  variant = "default",
}: {
  drawing: DrawingId;
  code?: string;
  revision?: string;
  fig?: string;
  caption?: string;
  explode?: boolean;
  tall?: boolean;
  variant?: "default" | "hero" | "light";
}) {
  const light = variant === "light";
  return (
    <figure
      className={`frame media-lift overflow-hidden ${
        variant === "hero"
          ? "rounded-[8px] border-paper/10 bg-charcoal shadow-[0_50px_110px_rgba(0,0,0,0.48)]"
          : light
            ? "border-black/10 bg-[#ddd8cd] shadow-[0_30px_70px_rgba(13,13,12,0.16)]"
            : ""
      }`}
    >
      <div
        className={`relative ${light ? "bg-[#ddd8cd]" : "grid-bg"} ${
          tall ? "min-h-[420px]" : "min-h-[280px]"
        }`}
      >
        <TechnicalDrawing
          id={drawing}
          explode={explode}
          light={light}
          className="h-full w-full"
        />
        <div className="pointer-events-none absolute inset-3 flex items-start justify-between">
          <TechnicalLabel tone="red">{fig ?? "FIG. 01"}</TechnicalLabel>
          <TechnicalLabel>{caption ?? "ASSEMBLY"}</TechnicalLabel>
        </div>
      </div>
      {(code || revision) && (
        <figcaption
          className={`flex items-center justify-between border-t px-4 py-3 ${
            light ? "border-black/10" : "border-paper/10"
          }`}
        >
          <TechnicalLabel tone="paper">{code?.replace("-", " / ")}</TechnicalLabel>
          <TechnicalLabel>{revision}</TechnicalLabel>
        </figcaption>
      )}
    </figure>
  );
}
