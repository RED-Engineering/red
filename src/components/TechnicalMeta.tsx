export function TechnicalMeta({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
      {items.map((item) => (
        <div key={labelKey(item.label, item.value)} className="border-t border-paper/15 pt-3">
          <dt className="tech">{item.label}</dt>
          <dd className="mt-2 font-mono text-[12px] uppercase tracking-[0.12em] text-paper">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function labelKey(label: string, value: string) {
  return `${label}-${value}`;
}
