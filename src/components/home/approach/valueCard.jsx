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
      className={`relative z-2 min-[1024px]:absolute min-[1024px]:w-[clamp(238px,18.5vw,292px)] ${className}`}
      data-scroll-parallax-layer
      data-parallax-distance={distance}
    >
      <div
        className="group h-full rounded-[2rem] bg-black/[0.035] p-1.5 ring-1 ring-black/[0.045] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 motion-reduce:transition-none"
        data-section-reveal
      >
        <div className="flex min-h-[286px] h-full flex-col rounded-[calc(2rem-0.375rem)] bg-[#f1f1ee] px-7 py-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.72)] min-[1024px]:min-h-[320px] min-[1024px]:px-8 min-[1024px]:py-8">
          <span className="grid size-14 place-items-center rounded-full bg-site-paper text-site-ink shadow-[0_10px_28px_rgba(34,37,34,0.06)]">
            <Icon size={25} weight="thin" aria-hidden="true" />
          </span>

          <h3 className="mt-10 max-w-[12ch] text-[clamp(1.3rem,2vw,1.65rem)] leading-[1.02] font-normal tracking-[-0.045em] text-site-ink">
            {title}
          </h3>
          <p className="mt-auto pt-8 text-[0.9rem] leading-[1.45] tracking-[-0.018em] text-site-copy">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}
