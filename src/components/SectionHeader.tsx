export function SectionHeader({
  index,
  title,
  action,
}: {
  index?: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6 border-b border-paper/15 pb-4">
      <div className="flex items-baseline gap-4">
        {index ? <span className="tech text-red">{index}</span> : null}
        <h2 className="text-[13px] font-medium tracking-[0.22em] text-paper">{title}</h2>
      </div>
      {action}
    </div>
  );
}
