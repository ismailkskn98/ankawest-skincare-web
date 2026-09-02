export function Intro() {
  return (
    <div
      className="grid gap-8 border-t border-[rgba(59,59,59,0.15)] pt-7 min-[901px]:grid-cols-12 min-[901px]:items-end min-[901px]:gap-x-8 min-[901px]:pt-10"
      data-motion-group
      data-section-reveal
    >
      <div className="min-[901px]:col-span-8">
        <p className="mb-5 text-[0.68rem] font-semibold tracking-[0.16em] text-site-copy uppercase min-[901px]:mb-7">
          Anka West yaklaşımı
        </p>
        <h2
          id="approach-title"
          className="text-[clamp(3rem,12vw,5.6rem)] leading-[0.94] font-normal tracking-[-0.058em] text-site-ink min-[901px]:text-[clamp(4.8rem,6.65vw,7.15rem)] min-[1100px]:whitespace-nowrap"
        >
          <span className="block">Seçici, açık,</span>
          <span className="mt-[0.025em] block font-editorial tracking-[-0.04em]">
            cildine özgü.
          </span>
        </h2>
      </div>

      <p className="max-w-[430px] text-[clamp(0.92rem,1.25vw,1.08rem)] leading-[1.5] tracking-[-0.02em] text-site-copy min-[901px]:col-span-4 min-[901px]:justify-self-end min-[901px]:pb-2">
        Bakımı karmaşıklaştırmadan; ihtiyacı, aktif içeriği, dokuyu ve kullanım adımını aynı seçkide buluşturuyoruz.
      </p>
    </div>
  );
}
