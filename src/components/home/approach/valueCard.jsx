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
      className={`relative z-2 mx-auto w-full max-w-[430px] md:mx-0 lg:absolute lg:aspect-[430/500] lg:w-[clamp(15.5rem,20vw,23.75rem)] lg:will-change-transform ${className}`}
      data-scroll-parallax-layer
      data-parallax-distance={distance}
    >
      <div
        className="group flex min-h-[clamp(11.5rem,48vw,15rem)] flex-col rounded-[clamp(1.2rem,3vw,1.75rem)] bg-[#f1f1ee]/95 p-[clamp(1rem,3vw,1.5rem)] shadow-[0_30px_76px_rgba(31,35,32,0.042)] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 motion-reduce:transition-none md:min-h-[clamp(13.5rem,30vw,16rem)] lg:h-full lg:min-h-0 lg:p-[clamp(1.25rem,1.8vw,2rem)]"
        data-section-reveal
      >
        <span className="grid size-[clamp(2.75rem,4vw,3.5rem)] place-items-center rounded-full bg-site-paper text-site-ink shadow-[0_10px_28px_rgba(34,37,34,0.06)]">
          <Icon
            className="size-[clamp(1.25rem,2vw,1.5rem)]"
            weight="thin"
            aria-hidden="true"
          />
        </span>

        <h3 className="mt-[clamp(1.25rem,2vw,2rem)] max-w-[12ch] text-[clamp(1.15rem,4vw,1.5rem)] leading-[1.08] font-light text-site-ink lg:text-[clamp(1.3rem,1.8vw,1.8rem)]">
          {title}
        </h3>
        <p className="mt-auto max-w-[30ch] pt-[clamp(1rem,1.8vw,1.5rem)] text-[clamp(0.8rem,2.8vw,0.92rem)] leading-[1.52] text-site-copy lg:text-[clamp(0.84rem,0.95vw,0.96rem)]">
          {description}
        </p>
      </div>
    </article>
  );
}
