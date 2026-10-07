export function LegalPage({ title, body }: { title: string; body: string }) {
  return (
    <div className="shell py-32 md:py-40">
      <article className="glass-media mx-auto max-w-3xl rounded-[8px] p-8 md:p-12">
        <p className="tech text-red">LEGAL</p>
        <h1 className="mt-4 text-5xl tracking-[-0.05em] md:text-6xl">{title}</h1>
        <p className="mt-8 text-lg leading-8 text-mist">{body}</p>
      </article>
    </div>
  );
}
