import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import Image from "next/image";
import Link from "next/link";

export function PageHero({
  eyebrow,
  title,
  titleLines,
  displayLine,
  description,
  meta,
  cardTitle,
  cardTitleAccent,
  cardBody,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
  imagePosition = "center",
  parallaxDistance = 170,
}) {
  const lines = titleLines?.length ? titleLines : title ? [title] : [];
  const objectPosition = imagePosition === "top" ? "object-[50%_22%]" : imagePosition === "bottom" ? "object-[50%_72%]" : "object-center";
  const displayText = displayLine || lines.slice(1).join(" ") || lines[0];

  const cardHeading = cardTitle || lines.join(" ");
  const cardCopy = cardBody || description;
  const resolvedCtaHref = ctaHref || "#urun-listesi";

  return (
    <section
      className="fluid gridContainer relative isolate h-svh min-h-[660px] overflow-hidden bg-site-paper max-[767px]:min-h-[100svh]"
      aria-labelledby="page-hero-title"
      data-scroll-parallax-section
      data-parallax-strength="0.82"
      data-parallax-centered="true"
    >
      {imageSrc ? (
        <div className="fluid absolute inset-0 overflow-hidden">
          <div
            className="fluid absolute inset-x-0 top-[-7rem] bottom-[-7rem] transform-gpu will-change-transform max-[767px]:top-[-3.5rem] max-[767px]:bottom-[-3.5rem]"
            data-scroll-parallax-layer
            data-parallax-distance={parallaxDistance}
          >
            <Image className={`object-cover ${objectPosition}`} src={imageSrc} alt={imageAlt || ""} fill sizes="100vw" quality={100} unoptimized priority />
          </div>
        </div>
      ) : null}

      <svg
        className="pointer-events-none absolute top-[7%] right-[14%] z-1 hidden h-[clamp(11rem,24vw,21.8rem)] w-[clamp(18rem,39vw,35rem)] text-site-ink min-[768px]:block"
        width="560"
        height="349"
        viewBox="0 0 560 349"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M554.586 348.365C554.788 348.594 555.137 348.616 555.365 348.414L559.089 345.128C559.317 344.926 559.339 344.577 559.137 344.349C558.936 344.12 558.587 344.099 558.358 344.3L555.049 347.221L552.128 343.912C551.926 343.683 551.577 343.661 551.349 343.863C551.12 344.065 551.098 344.413 551.3 344.642L554.586 348.365ZM1.16986 31.8883C154.053 -17.5738 296.512 -4.53168 398.664 53.8484C500.798 112.218 562.686 215.931 554.449 347.966L555.551 348.035C563.814 215.57 501.702 111.464 399.211 52.8902C296.738 -5.67328 153.947 -18.6996 0.830145 30.8383L1.16986 31.8883Z"
          fill="currentColor"
        />
      </svg>

      <div className="gridContainer relative z-2 flex h-full min-h-[660px] flex-col pt-[calc(72px+clamp(1rem,3vh,2rem))] pb-[clamp(1.5rem,4vh,2.5rem)] max-[767px]:min-h-[100svh] min-[901px]:pt-[calc(76px+clamp(1.25rem,3vh,2.25rem))]">
        <div className="flex flex-1 flex-col justify-between gap-8 min-[768px]:gap-10">
          <div className="flex items-start justify-between gap-6" data-section-reveal>
            <div>
              {eyebrow ? <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-site-copy uppercase">{eyebrow}</p> : null}
              <h1 id="page-hero-title" className="mt-3 max-w-[11ch] text-[clamp(3.5rem,10vw,7.2rem)] leading-[0.84] font-semibold tracking-[-0.075em] text-site-ink">
                {lines[0] || "Seçki"}
                {displayText ? <span className="sr-only"> {displayText}</span> : null}
              </h1>
            </div>

            {meta ? <p className="hidden pt-2 text-right text-[0.66rem] tracking-[0.1em] text-site-copy/70 uppercase min-[640px]:block">{meta}</p> : null}
          </div>

          <div className="grid items-end gap-8 min-[900px]:grid-cols-12 min-[900px]:gap-10">
            <div
              className="relative max-w-[430px] rounded-[1.25rem] bg-site-paper/96 p-[clamp(1.6rem,3vw,2.15rem)] shadow-[0_28px_90px_rgba(35,38,34,0.1)] ring-1 ring-site-ink/8 min-[900px]:col-span-5"
              data-section-reveal
            >
              <h2 className="max-w-[13ch] text-[clamp(2rem,4.1vw,3rem)] leading-[0.95] font-semibold tracking-[-0.065em] text-site-ink">
                {cardHeading}
                {cardTitleAccent ? (
                  <>
                    {" "}
                    <span className="tracking-[-0.03em]">{cardTitleAccent}</span>
                  </>
                ) : null}
              </h2>

              {cardCopy ? <p className="mt-5 max-w-[37ch] text-[clamp(0.92rem,1.15vw,0.9rem)] leading-[1.52] text-site-copy/70">{cardCopy}</p> : null}

              {ctaLabel ? (
                <div className="mt-8 pt-6">
                  {resolvedCtaHref.startsWith("http") ? (
                    <a
                      className="group inline-flex min-h-14 w-full items-center justify-between gap-4 rounded-full bg-site-ink py-1.5 pr-1.5 pl-6 text-[0.72rem] font-semibold tracking-[0.08em] text-site-paper uppercase transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] motion-reduce:transition-none"
                      href={resolvedCtaHref}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {ctaLabel}
                      <span className="relative grid size-11 place-items-center overflow-hidden rounded-full bg-site-paper text-site-ink">
                        <ArrowUpRightIcon
                          className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[160%] group-hover:-translate-y-[160%] motion-reduce:transition-none"
                          size={16}
                          weight="light"
                          aria-hidden="true"
                        />
                        <ArrowUpRightIcon
                          className="absolute -translate-x-[160%] translate-y-[160%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0 motion-reduce:hidden"
                          size={16}
                          weight="light"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  ) : (
                    <Link
                      className="group inline-flex min-h-14 w-full items-center justify-between gap-4 rounded-full bg-site-ink py-1.5 pr-1.5 pl-6 text-[0.72rem] font-semibold tracking-[0.08em] text-site-paper uppercase transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] motion-reduce:transition-none"
                      href={resolvedCtaHref}
                    >
                      {ctaLabel}
                      <span className="relative grid size-11 place-items-center overflow-hidden rounded-full bg-site-paper text-site-ink">
                        <ArrowUpRightIcon
                          className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[160%] group-hover:-translate-y-[160%] motion-reduce:transition-none"
                          size={16}
                          weight="light"
                          aria-hidden="true"
                        />
                        <ArrowUpRightIcon
                          className="absolute -translate-x-[160%] translate-y-[160%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0 motion-reduce:hidden"
                          size={16}
                          weight="light"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  )}
                </div>
              ) : null}

              {meta ? <p className="mt-5 text-[0.66rem] tracking-[0.1em] text-site-copy/65 uppercase min-[640px]:hidden">{meta}</p> : null}
            </div>

            <div className="min-[900px]:col-span-7 min-[900px]:flex min-[900px]:justify-end" data-section-reveal>
              <p className="font-canela max-w-[11ch] text-[clamp(3.4rem,8.6vw,7.2rem)] leading-[0.86] font-light tracking-[-0.055em] text-site-ink min-[900px]:text-right" aria-hidden="true">
                {displayText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
