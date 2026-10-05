const words = ["PRECISION", "DESIGN", "ENGINEERING", "MANUFACTURING"];

export function EngineeringMarquee() {
  const sequence = [...words, ...words];
  return (
    <div className="overflow-hidden border-y border-paper/10 bg-red py-4 text-ink">
      <div className="flex w-max animate-[marquee_26s_linear_infinite] motion-reduce:animate-none">
        {sequence.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="flex items-center font-display text-xl font-bold tracking-[0.08em] md:text-2xl"
          >
            <span className="mx-7 h-1.5 w-1.5 rounded-full bg-ink" aria-hidden />
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
