export function Intro() {
  return (
    <div
      className="grid gap-6 min-[901px]:grid-cols-12 min-[901px]:items-end min-[901px]:gap-x-8 min-[901px]:gap-y-0"
      data-motion-group
      data-section-reveal
    >
      <div className="min-[901px]:col-span-8">
        <p className="mb-4 text-[0.68rem] font-semibold tracking-[0.16em] text-site-copy uppercase min-[901px]:mb-6">
          Anka West yaklaşımı
        </p>
        <h2
          id="approach-title"
          className="font-canela text-[clamp(2.45rem,9vw,4.1rem)] leading-[0.96] font-light tracking-[-0.04em] text-site-ink min-[901px]:text-[clamp(3.5rem,5vw,5.9rem)] min-[1100px]:whitespace-nowrap min-[1280px]:text-[clamp(4rem,5.4vw,6.2rem)]"
        >
          <span className="block">Seçici, açık,</span>
          <span className="mt-[0.02em] block">cildine özgü.</span>
        </h2>
      </div>

      <p className="max-w-[430px] text-[clamp(0.92rem,1.25vw,1.08rem)] leading-[1.5] tracking-[-0.02em] text-site-copy min-[901px]:col-span-4 min-[901px]:justify-self-end min-[901px]:pb-2">
        Bakımı karmaşıklaştırmadan; ihtiyacı, aktif içeriği, dokuyu ve kullanım adımını aynı seçkide buluşturuyoruz.
      </p>
    </div>
  );
}
