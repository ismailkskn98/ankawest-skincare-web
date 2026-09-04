export function Intro() {
  return (
    <div
      className="grid gap-6 nav:grid-cols-12 nav:items-end nav:gap-x-8 nav:gap-y-0"
      data-motion-group
      data-section-reveal
    >
      <div className="nav:col-span-8">
        <p className="mb-4 text-[0.68rem] font-semibold tracking-[0.16em] text-site-copy uppercase nav:mb-6">
          Anka West yaklaşımı
        </p>
        <h2
          id="approach-title"
          className="font-canela text-[clamp(2.45rem,9vw,4.1rem)] leading-[0.96] font-light tracking-[-0.04em] text-site-ink nav:text-[clamp(3.5rem,5vw,5.9rem)] nav-wide:whitespace-nowrap xl:text-[clamp(4rem,5.4vw,6.2rem)]"
        >
          <span className="block">Seçici, açık,</span>
          <span className="mt-[0.02em] block">cildine özgü.</span>
        </h2>
      </div>

      <p className="max-w-[430px] text-[clamp(0.92rem,1.25vw,1.08rem)] leading-[1.5] tracking-[-0.02em] text-site-copy nav:col-span-4 nav:justify-self-end nav:pb-2">
        Bakımı karmaşıklaştırmadan; ihtiyacı, aktif içeriği, dokuyu ve kullanım adımını aynı seçkide buluşturuyoruz.
      </p>
    </div>
  );
}
