import type { Fulfillment, ProductOption } from "@/content/types";

export function mapVariantTitle(
  title: string,
  fallback: Fulfillment = "PHYSICAL",
): { label: string; fulfillment: Fulfillment } {
  const raw = title.trim();
  const t = raw.toLowerCase();

  if (
    t.includes("cad + physical") ||
    t.includes("file + part") ||
    t.includes("file + physical") ||
    (t.includes("cad") && t.includes("physical"))
  ) {
    return { label: "CAD + PHYSICAL", fulfillment: "PHYSICAL + DIGITAL" };
  }

  if (t.includes("cad") || t.includes("digital") || /\bfile\b/.test(t)) {
    return { label: "CAD FILE", fulfillment: "DIGITAL" };
  }

  if (t.includes("physical") || t.includes("manufactur") || t.includes("part")) {
    return { label: "PHYSICAL", fulfillment: "PHYSICAL" };
  }

  if (raw === "Default Title") {
    if (fallback === "DIGITAL") return { label: "CAD FILE", fulfillment: "DIGITAL" };
    if (fallback === "PHYSICAL + DIGITAL") {
      return { label: "CAD + PHYSICAL", fulfillment: "PHYSICAL + DIGITAL" };
    }
    return { label: "STANDARD", fulfillment: "PHYSICAL" };
  }

  return { label: raw.toUpperCase(), fulfillment: fallback };
}

export function typeFromOptions(options: ProductOption[]): Fulfillment {
  const kinds = new Set(options.map((option) => option.fulfillment));
  if (kinds.has("FREE") && (kinds.has("PHYSICAL") || kinds.has("PHYSICAL + DIGITAL"))) {
    return "PHYSICAL + DIGITAL";
  }
  if (kinds.has("FREE") && kinds.size === 1) return "FREE";
  if (kinds.has("PHYSICAL + DIGITAL") || (kinds.has("DIGITAL") && kinds.has("PHYSICAL"))) {
    return "PHYSICAL + DIGITAL";
  }
  if (kinds.has("DIGITAL") && !kinds.has("PHYSICAL")) return "DIGITAL";
  return "PHYSICAL";
}

export function isFreeOption(fulfillment: Fulfillment) {
  return fulfillment === "FREE";
}

export function hasFreeFile(options: ProductOption[]) {
  return options.some((option) => option.fulfillment === "FREE");
}
