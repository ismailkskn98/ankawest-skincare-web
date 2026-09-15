export function Intro() {
  return (
    <div
      className="grid gap-[clamp(1.5rem,3vw,3rem)] nav:grid-cols-12 nav:items-end nav:gap-x-[clamp(2rem,3vw,4rem)] nav:gap-y-0"
      data-motion-group
      data-section-reveal
    >
      <div className="nav:col-span-8">
        <p className="mb-[clamp(0.9rem,1.5vw,1.5rem)] text-[clamp(0.58rem,0.8vw,0.68rem)] font-semibold tracking-[0.16em] text-site-copy uppercase">
          Anka West yaklaşımı
        </p>
        <h2
          id="approach-title"
          className="font-sentient max-w-[11ch] text-[clamp(2.35rem,8.5vw,3.6rem)] leading-[0.96] font-light tracking-[-0.04em] text-site-ink nav:max-w-none nav:text-[clamp(3.25rem,4.8vw,5.6rem)] nav-wide:whitespace-nowrap xl:text-[clamp(3.75rem,5.1vw,6rem)]"
        >
          <span className="block">Seçici, açık,</span>
          <span className="mt-[0.02em] block">cildine özgü</span>
        </h2>
      </div>

      <p className="max-w-[390px] text-[clamp(0.88rem,1.05vw,1rem)] leading-[1.55] tracking-[-0.02em] text-site-copy nav:col-span-4 nav:justify-self-end nav:pb-1">
        Bakımı karmaşıklaştırmadan; ihtiyacı, aktif içeriği, dokuyu ve kullanım adımını aynı yerde buluşturuyoruz.
      </p>
    </div>
  );
}
