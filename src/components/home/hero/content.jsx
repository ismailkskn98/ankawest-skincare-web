const lineMaskClassName = "mx-[-0.06em] mt-[-0.11em] mb-[-0.08em] block min-w-0 overflow-hidden px-[0.06em] pt-[0.11em] pb-[0.08em]";

const lineClassName = "block leading-[0.88] whitespace-nowrap min-[901px]:leading-[0.86]";

const editorialClassName = "font-editorial font-normal tracking-[-0.045em]";

const adjustedEditorialClassName = `${editorialClassName} inline-block translate-y-[0.025em]`;

export function Content() {
  return (
    <div className="w-full min-w-0 max-w-[1220px] self-center justify-self-center overflow-hidden pt-[14px] text-center min-[901px]:pt-[clamp(10px,2vh,26px)] short-desktop:pt-0">
      <h1
        id="hero-title"
        className="w-full text-[clamp(2.8rem,12.8vw,4.6rem)] leading-[1.1] font-normal tracking-[-0.062em] text-[#f7f6f1] max-[390px]:text-[clamp(2.55rem,12.6vw,3.1rem)] min-[901px]:text-[clamp(4rem,6.35vw,7.5rem)] min-[901px]:tracking-[-0.068em] short-desktop:text-[clamp(3.6rem,5.7vw,6.4rem)]"
        aria-label="Cildini dinleyen bakım, sana özgü."
      >
        <span className="hidden min-[901px]:grid min-[901px]:gap-[0.055em]" aria-hidden="true" data-hero-title-group>
          <span className={lineMaskClassName}>
            <span className={lineClassName} data-hero-line>
              <span className={editorialClassName}>Cildini</span> dinleyen
            </span>
          </span>
          <span className={lineMaskClassName}>
            <span className={lineClassName} data-hero-line>
              bakım, sana <span className={adjustedEditorialClassName}>özgü.</span>
            </span>
          </span>
        </span>

        <span className="grid gap-[0.045em] min-[901px]:hidden" aria-hidden="true" data-hero-title-group>
          <span className={lineMaskClassName}>
            <span className={lineClassName} data-hero-line>
              <span className={editorialClassName}>Cildini</span>
            </span>
          </span>
          <span className={lineMaskClassName}>
            <span className={lineClassName} data-hero-line>
              dinleyen bakım,
            </span>
          </span>
          <span className={lineMaskClassName}>
            <span className={lineClassName} data-hero-line>
              sana <span className={adjustedEditorialClassName}>özgü.</span>
            </span>
          </span>
        </span>
      </h1>

      <p
        className="mx-auto mt-5 max-w-[370px] text-[0.86rem] leading-[1.4] font-normal tracking-[-0.018em] text-[rgba(247,246,241,0.9)] text-balance max-[390px]:max-w-[330px] min-[901px]:mt-[clamp(18px,2.7vh,30px)] min-[901px]:max-w-[560px] min-[901px]:text-[clamp(0.88rem,1.05vw,1rem)] min-[901px]:leading-[1.35] short-desktop:mt-[18px]"
        data-hero-support
      >
        GLUTANEX ve Exome seçkisini; bakım ihtiyacına, aktif içeriklerine ve kullanım adımlarına göre keşfet.
      </p>
    </div>
  );
}
