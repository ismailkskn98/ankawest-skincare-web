import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import Image from "next/image";
import Link from "next/link";

const arrowPath =
  "M554.586 348.365C554.788 348.594 555.137 348.616 555.365 348.414L559.089 345.128C559.317 344.926 559.339 344.577 559.137 344.349C558.936 344.12 558.587 344.099 558.358 344.3L555.049 347.221L552.128 343.912C551.926 343.683 551.577 343.661 551.349 343.863C551.12 344.065 551.098 344.413 551.3 344.642L554.586 348.365ZM1.16986 31.8883C154.053 -17.5738 296.512 -4.53168 398.664 53.8484C500.798 112.218 562.686 215.931 554.449 347.966L555.551 348.035C563.814 215.57 501.702 111.464 399.211 52.8902C296.738 -5.67328 153.947 -18.6996 0.830145 30.8383L1.16986 31.8883Z";

function HeroCta({ label, href }) {
  const className =
    "group inline-flex min-h-12 w-full items-center justify-between gap-4 rounded-full bg-site-ink py-1.5 pr-1.5 pl-5 text-[0.7rem] font-semibold tracking-[0.08em] text-site-paper uppercase transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] motion-reduce:transition-none min-[768px]:min-h-14 min-[768px]:pl-6 min-[768px]:text-[0.72rem]";

  const icon = (
    <span className="relative grid size-10 place-items-center overflow-hidden rounded-full bg-site-paper text-site-ink min-[768px]:size-11">
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
  );

  if (href.startsWith("http")) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {label}
        {icon}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {label}
      {icon}
    </Link>
  );
}

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
      className="fluid gridContainer relative isolate h-svh min-h-[560px] overflow-hidden bg-site-paper max-[767px]:min-h-[100svh] min-[1280px]:min-h-[640px]"
      aria-labelledby="page-hero-title"
      data-scroll-parallax-section
      data-parallax-strength="0.82"
      data-parallax-centered="true"
    >
      {imageSrc ? (
        <div className="fluid absolute inset-0 overflow-hidden" data-page-hero-media>
          <div
            className="fluid absolute inset-x-0 top-[-7rem] bottom-[-7rem] transform-gpu will-change-transform max-[767px]:top-[-3.5rem] max-[767px]:bottom-[-3.5rem]"
            data-scroll-parallax-layer
            data-parallax-distance={parallaxDistance}
          >
            <Image className={`object-cover ${objectPosition}`} src={imageSrc} alt={imageAlt || ""} fill sizes="100vw" quality={100} unoptimized priority />
          </div>
        </div>
      ) : null}

      {/* Desktop / tablet: sağa yaslı büyük ok — uç display satırına iner */}
      <svg
        className="pointer-events-none absolute top-[clamp(10%,10vh,15%)] right-[clamp(20%,20vw,25%)] bottom-[clamp(14%,18vh,24%)] z-1 hidden w-[clamp(17rem,28vw,34rem)] text-site-ink min-[768px]:block min-[1280px]:w-[clamp(20rem,30vw,36rem)]"
        width="560"
        height="349"
        viewBox="0 0 560 349"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
        data-page-hero-arrow
      >
        <path d={arrowPath} fill="currentColor" />
      </svg>

      {/* Mobile: üst başlıkların yanındaki küçük kanca */}
      <svg
        className="pointer-events-none absolute top-[clamp(5.25rem,14vw,6.5rem)] right-[clamp(1rem,6vw,2rem)] z-1 h-[clamp(2.75rem,14vw,3.75rem)] w-[clamp(4.5rem,22vw,6.25rem)] text-site-ink min-[768px]:hidden"
        width="560"
        height="349"
        viewBox="0 0 560 349"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
        data-page-hero-arrow
      >
        <path d={arrowPath} fill="currentColor" />
      </svg>

      <div className="gridContainer relative z-2 flex h-full min-h-[560px] flex-col pt-[calc(72px+clamp(0.75rem,2.4vh,1.75rem))] pb-[clamp(1.15rem,3.2vh,2.25rem)] max-[767px]:min-h-[100svh] min-[901px]:pt-[calc(76px+clamp(1rem,2.8vh,2rem))]">
        <div className="flex flex-1 flex-col justify-between gap-6 min-[768px]:gap-8 min-[1024px]:gap-10">
          <div className="relative max-w-[18ch] min-[768px]:max-w-none" data-page-hero-reveal>
            {eyebrow ? <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-site-copy uppercase">{eyebrow}</p> : null}

            <h1
              id="page-hero-title"
              className="mt-2 max-w-[11ch] text-[clamp(2.65rem,11vw,3.6rem)] leading-[0.88] font-semibold tracking-[-0.075em] text-site-ink min-[768px]:mt-3 min-[768px]:text-[clamp(3.1rem,6.4vw,5.6rem)] min-[1280px]:text-[clamp(4rem,6.2vw,7.2rem)] min-[1280px]:leading-[0.84]"
            >
              {lines[0] || "Seçki"}
              {displayText ? <span className="sr-only"> {displayText}</span> : null}
            </h1>

            {displayText ? (
              <p className="font-canela mt-1 max-w-[12ch] text-[clamp(2.35rem,10.5vw,3.25rem)] leading-[0.9] font-light tracking-[-0.05em] text-site-ink min-[768px]:hidden">{displayText}</p>
            ) : null}

            {meta ? (
              <p className="mt-3 hidden text-[0.66rem] tracking-[0.1em] text-site-copy/70 uppercase min-[640px]:mt-0 min-[640px]:block min-[640px]:pt-2 min-[768px]:absolute min-[768px]:top-0 min-[768px]:right-0 min-[768px]:text-right">
                {meta}
              </p>
            ) : null}
          </div>

          <div className="grid items-end gap-5 min-[768px]:grid-cols-12 min-[768px]:gap-6 min-[1024px]:gap-10">
            <div
              className="relative w-full max-w-[min(100%,24rem)] rounded-[1.15rem] bg-site-paper/96 p-[clamp(1.25rem,3vw,2.15rem)] shadow-[0_28px_90px_rgba(35,38,34,0.1)] ring-1 ring-site-ink/8 min-[768px]:col-span-5 min-[768px]:max-w-[min(100%,26rem)] min-[768px]:rounded-[1.25rem] min-[1280px]:max-w-[430px]"
              data-page-hero-reveal
            >
              <h2 className="max-w-[13ch] text-[clamp(1.7rem,5.6vw,2.35rem)] leading-[0.98] font-semibold tracking-[-0.065em] text-site-ink min-[768px]:text-[clamp(1.85rem,3.2vw,2.75rem)] min-[1280px]:text-[clamp(2rem,3.4vw,3rem)] min-[1280px]:leading-[0.95]">
                {cardHeading}
                {cardTitleAccent ? (
                  <>
                    {" "}
                    <span className="tracking-[-0.03em]">{cardTitleAccent}</span>
                  </>
                ) : null}
              </h2>

              {cardCopy ? (
                <p className="mt-4 max-w-[37ch] text-[clamp(0.88rem,2.8vw,0.95rem)] leading-[1.5] text-site-copy/70 min-[768px]:mt-5 min-[768px]:text-[clamp(0.9rem,1.1vw,0.95rem)] min-[768px]:leading-[1.52]">
                  {cardCopy}
                </p>
              ) : null}

              {ctaLabel ? (
                <div className="mt-6 pt-4 min-[768px]:mt-8 min-[768px]:pt-6">
                  <HeroCta label={ctaLabel} href={resolvedCtaHref} />
                </div>
              ) : null}

              {meta ? <p className="mt-4 text-[0.66rem] tracking-[0.1em] text-site-copy/65 uppercase min-[640px]:hidden">{meta}</p> : null}
            </div>

            {displayText ? (
              <div className="hidden min-[768px]:col-span-7 min-[768px]:flex min-[768px]:justify-end" data-page-hero-reveal>
                <p className="font-canela max-w-[11ch] text-[clamp(2.6rem,5.8vw,4.6rem)] leading-[0.9] font-light tracking-[-0.05em] text-site-ink min-[768px]:text-right min-[1024px]:text-[clamp(3rem,6.4vw,5.6rem)] min-[1280px]:text-[clamp(3.6rem,6.8vw,7.2rem)] min-[1280px]:leading-[0.86]">
                  {displayText}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
