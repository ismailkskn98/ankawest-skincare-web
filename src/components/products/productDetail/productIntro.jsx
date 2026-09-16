import { normalizeListItems } from "./helpers";

function StarIcon({ className = "size-11" }) {
  return (
    <svg className={className} width="83" height="92" viewBox="0 0 83 92" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M83 23.974L43.8141 45.8502L83 68.0261L82.0744 69.8241L42.5799 47.9479V92H40.4201V47.9479L1.2342 69.8241L0 68.0261L39.4944 45.8502L0 23.974L1.2342 22.1759L40.4201 44.0521V0H42.5799V44.0521L82.0744 22.1759L83 23.974Z" fill="currentColor" />
    </svg>
  );
}

export function ProductIntro({ product }) {
  const suitableFor = normalizeListItems(product.suitableFor).slice(0, 3);
  const goodToKnow = normalizeListItems(product.benefits).slice(0, 3);
  const leadText = product.shortDescription || product.description || "";
  const detailHeadline = (product.shortDescription || product.fullName || product.name).replace(/[.!]+$/u, "").trim();
  if (!leadText && suitableFor.length === 0 && goodToKnow.length === 0) return null;

  return (
    <section className="gridContainer bg-[#F2F2EF] py-[clamp(3.25rem,min(8vw,12vh),8.5rem)] sm:py-[clamp(4rem,min(8vw,12vh),8.5rem)]">
      <div data-motion-group>
        <div className="mx-auto grid max-w-[62rem] place-items-center text-center" data-section-reveal>
          <StarIcon className="size-[clamp(2.75rem,10vw,5rem)] text-site-ink" />
          <h2 className="font-sentient mt-[clamp(1rem,3vw,2rem)] max-w-[21ch] [overflow-wrap:anywhere] text-[clamp(1.85rem,8.5vw,4.6rem)] leading-[1.08] font-light tracking-[-0.04em] text-site-ink sm:text-[clamp(2.15rem,4.4vw,4.6rem)]">{detailHeadline}</h2>
        </div>
        <div className="mt-[clamp(2.5rem,min(6vw,8vh),5.5rem)] grid gap-[clamp(1.75rem,4vw,3rem)] border-t border-site-ink/10 pt-[clamp(1.5rem,3vw,2rem)] md:grid-cols-2 lg:max-w-[42rem]">
          {suitableFor.length ? <div data-section-reveal><h3 className="text-[clamp(0.62rem,0.75vw,0.67rem)] font-semibold tracking-[0.12em] text-site-copy uppercase">Kimler için uygun</h3><ul className="mt-[clamp(0.75rem,1.5vw,1rem)] grid gap-[clamp(0.3rem,0.7vw,0.45rem)] text-[clamp(0.9rem,1vw,0.96rem)] leading-[1.5] text-site-copy">{suitableFor.map((item) => <li key={item.title}>• {item.title}</li>)}</ul></div> : null}
          {goodToKnow.length ? <div data-section-reveal><h3 className="text-[clamp(0.62rem,0.75vw,0.67rem)] font-semibold tracking-[0.12em] text-site-copy uppercase">Bilmek iyi olur</h3><ul className="mt-[clamp(0.75rem,1.5vw,1rem)] grid gap-[clamp(0.3rem,0.7vw,0.45rem)] text-[clamp(0.9rem,1vw,0.96rem)] leading-[1.5] text-site-copy">{goodToKnow.map((item) => <li key={item.title}>✓ {item.title}</li>)}</ul></div> : null}
        </div>
        {leadText ? <p className="mt-[clamp(2rem,4vw,3.5rem)] max-w-[56rem] [overflow-wrap:anywhere] whitespace-pre-line text-[clamp(0.92rem,3.8vw,1rem)] leading-[1.65] text-site-copy sm:text-[clamp(0.95rem,1.2vw,1.12rem)] lg:ml-auto" data-section-reveal>{leadText}</p> : null}
      </div>
    </section>
  );
}
