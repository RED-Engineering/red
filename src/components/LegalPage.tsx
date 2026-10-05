export function LegalPage({ title, body }: { title: string; body: string }) {
  return (
    <div className="surface-light material-noise min-h-[65svh] py-20 md:py-28">
      <div className="shell max-w-[900px]">
        <p className="tech text-red">LEGAL / RED</p>
        <h1 className="mt-5 text-6xl tracking-[-0.055em]">{title}</h1>
        <div className="mt-10 border-t border-black/15 pt-8">
          <p className="max-w-2xl text-lg leading-8 text-[#5d5952]">{body}</p>
        </div>
      </div>
    </div>
  );
}
