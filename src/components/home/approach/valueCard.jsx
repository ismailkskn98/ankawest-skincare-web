import { DropIcon } from "@phosphor-icons/react/dist/ssr/Drop";
import { ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { SparkleIcon } from "@phosphor-icons/react/dist/ssr/Sparkle";
import { SunIcon } from "@phosphor-icons/react/dist/ssr/Sun";

const icons = {
  drop: DropIcon,
  shield: ShieldCheckIcon,
  sparkle: SparkleIcon,
  sun: SunIcon,
};

export function ValueCard({
  icon,
  title,
  description,
  className,
  distance,
}) {
  const Icon = icons[icon];

  return (
    <article
      className={`relative z-2 mx-auto w-full max-w-[430px] min-[768px]:mx-0 min-[1024px]:absolute min-[1024px]:aspect-[430/500] min-[1024px]:w-[clamp(260px,20vw,380px)] min-[1280px]:w-[clamp(290px,21vw,410px)] min-[1024px]:will-change-transform ${className}`}
      data-scroll-parallax-layer
      data-parallax-distance={distance}
    >
      <div
        className="group flex min-h-[210px] flex-col rounded-[1.35rem] bg-[#f1f1ee]/95 px-4 py-4 shadow-[0_30px_76px_rgba(31,35,32,0.042)] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 motion-reduce:transition-none min-[640px]:min-h-[240px] min-[768px]:min-h-[260px] min-[1024px]:h-full min-[1024px]:min-h-0 min-[1024px]:rounded-[1.75rem] min-[1024px]:px-6 min-[1024px]:py-6 min-[1280px]:px-8 min-[1280px]:py-8"
        data-section-reveal
      >
        <span className="grid size-11 place-items-center rounded-full bg-site-paper text-site-ink shadow-[0_10px_28px_rgba(34,37,34,0.06)] min-[1024px]:size-12 min-[1280px]:size-14">
          <Icon
            className="size-5 min-[1280px]:size-6"
            weight="thin"
            aria-hidden="true"
          />
        </span>

        <h3 className="mt-5 max-w-[12ch] text-[clamp(1.2rem,4vw,1.5rem)] leading-[1.05] font-light text-site-ink min-[1024px]:mt-6 min-[1024px]:text-[clamp(1.35rem,1.8vw,1.7rem)] min-[1280px]:mt-8 min-[1280px]:text-[clamp(1.5rem,2vw,1.85rem)]">
          {title}
        </h3>
        <p className="mt-auto max-w-[30ch] pt-4 text-[clamp(0.82rem,2.8vw,0.92rem)] leading-[1.48] text-site-copy min-[1024px]:pt-5 min-[1024px]:text-[clamp(0.86rem,1vw,0.96rem)] min-[1280px]:pt-6">
          {description}
        </p>
      </div>
    </article>
  );
}
