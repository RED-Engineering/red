export function TechnicalLabel({
  children,
  tone = "mute",
  as: Tag = "span",
}: {
  children: React.ReactNode;
  tone?: "mute" | "paper" | "red";
  as?: "span" | "p" | "div";
}) {
  const color =
    tone === "red" ? "text-red" : tone === "paper" ? "text-paper" : "text-mute";
  return <Tag className={`tech ${color}`}>{children}</Tag>;
}

export function RevisionTag({ rev }: { rev: string }) {
  return <span className="tech text-red">{rev}</span>;
}
