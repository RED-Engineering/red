"use client";

import { useEffect, useState } from "react";
import { MediaFrame } from "@/components/MediaFrame";

export function ProductViewer({
  title,
  images,
  glb,
}: {
  title: string;
  images: { url: string; alt?: string }[];
  glb?: string;
}) {
  const [mode, setMode] = useState<"image" | "model">(images[0] ? "image" : glb ? "model" : "image");
  const [active, setActive] = useState(images[0]?.url);
  const [modelReady, setModelReady] = useState(false);

  useEffect(() => {
    if (!glb) return;
    let cancelled = false;
    void import("@google/model-viewer").then(() => {
      if (!cancelled) setModelReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [glb]);

  return (
    <div>
      <div className="relative overflow-hidden rounded-[8px] bg-charcoal">
        {mode === "model" && glb ? (
          <div className="relative aspect-[4/5] min-h-[420px]">
            {modelReady ? (
              <model-viewer
                src={glb}
                alt={title}
                camera-controls
                touch-action="pan-y"
                shadow-intensity="0.35"
                interaction-prompt="none"
              />
            ) : (
              <div className="absolute inset-0 grid-bg" />
            )}
          </div>
        ) : (
          <MediaFrame src={active} alt={title} tall />
        )}
      </div>

      {(images.length > 1 || glb) ? (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((image) => (
            <button
              key={image.url}
              type="button"
              onClick={() => {
                setMode("image");
                setActive(image.url);
              }}
              className={`overflow-hidden rounded-[4px] border ${
                mode === "image" && active === image.url ? "border-red" : "border-paper/10"
              }`}
            >
              <MediaFrame src={image.url} alt={image.alt || title} compact />
            </button>
          ))}
          {glb ? (
            <button
              type="button"
              onClick={() => setMode("model")}
              className={`flex min-h-[72px] items-center justify-center rounded-[4px] border bg-charcoal font-display text-sm font-bold tracking-[0.08em] ${
                mode === "model" ? "border-red text-paper" : "border-paper/10 text-mute"
              }`}
            >
              3D
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
