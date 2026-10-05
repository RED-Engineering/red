export function formatPrice(amount: number, currency = "EUR") {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function formatCode(code: string) {
  return code.replace("-", " / ");
}

export function padCount(n: number) {
  return String(n).padStart(2, "0");
}
