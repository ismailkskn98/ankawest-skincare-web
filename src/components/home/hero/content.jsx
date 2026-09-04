const lineMaskClassName = "mx-[-0.06em] mt-[-0.08em] nav:mt-[-0.11em] mb-[-0.15em] nav:mb-[-0.15em] block min-w-0 overflow-hidden px-[0.06em]";

const lineClassName = "block leading-[1.35] whitespace-nowrap nav:leading-[1.35]";

export function Content() {
  return (
    <div className="w-full min-w-0 max-w-[1220px] self-center justify-self-center overflow-hidden pt-[14px] text-center nav:pt-[clamp(10px,2vh,26px)] short-desktop:pt-0">
      <h1
        id="hero-title"
        className="font-canela w-full text-[clamp(2.35rem,10vw,3.7rem)] leading-[1.08] font-light tracking-[-0.04em] text-[#f7f6f1] max-xs:text-[clamp(2.15rem,10.5vw,2.65rem)] nav:text-[clamp(3.25rem,5.1vw,6.1rem)] nav:tracking-[-0.05em] short-desktop:text-[clamp(3rem,4.8vw,5.3rem)]"
        aria-label="Cildini dinleyen bakım, sana özgü."
      >
        <span className="hidden nav:grid nav:gap-[0.04em]" aria-hidden="true" data-hero-title-group>
          <span className={lineMaskClassName}>
            <span className={lineClassName} data-hero-line>
              Cildini dinleyen
            </span>
          </span>
          <span className={lineMaskClassName}>
            <span className={lineClassName} data-hero-line>
              bakım, sana özgü.
            </span>
          </span>
        </span>

        <span className="grid gap-[0.035em] nav:hidden" aria-hidden="true" data-hero-title-group>
          <span className={lineMaskClassName}>
            <span className={lineClassName} data-hero-line>
              Cildini
            </span>
          </span>
          <span className={lineMaskClassName}>
            <span className={lineClassName} data-hero-line>
              dinleyen bakım,
            </span>
          </span>
          <span className={lineMaskClassName}>
            <span className={lineClassName} data-hero-line>
              sana özgü.
            </span>
          </span>
        </span>
      </h1>

      <p
        className="mx-auto mt-5 max-w-[370px] text-[0.86rem] leading-[1.4] font-normal tracking-[-0.018em] text-[rgba(247,246,241,0.9)] text-balance max-xs:max-w-[330px] nav:mt-[clamp(18px,2.7vh,30px)] nav:max-w-[560px] nav:text-[clamp(0.88rem,1.05vw,1rem)] nav:leading-[1.35] short-desktop:mt-[18px]"
        data-hero-support
      >
        GLUTANEX ve Exome seçkisini; bakım ihtiyacına, aktif içeriklerine ve kullanım adımlarına göre keşfet.
      </p>
    </div>
  );
}
