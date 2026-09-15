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
    <section className="gridContainer bg-[#F2F2EF] py-[clamp(5rem,9vw,9rem)]">
      <div data-motion-group>
        <div className="mx-auto grid max-w-[62rem] place-items-center text-center" data-section-reveal>
          <StarIcon className="size-14 text-site-ink md:size-20" />
          <h2 className="font-sentient mt-6 md:mt-8 max-w-[21ch] text-[clamp(2.15rem,4.4vw,4.6rem)] leading-[1.14] font-light tracking-[-0.04em] text-site-ink">{detailHeadline}</h2>
        </div>
        <div className="mt-[clamp(3rem,7vw,6rem)] grid gap-8 border-t border-site-ink/10 pt-8 md:grid-cols-2 lg:max-w-[42rem]">
          {suitableFor.length ? <div data-section-reveal><h3 className="text-[0.66rem] font-semibold tracking-[0.12em] text-site-copy uppercase">Kimler için uygun</h3><ul className="mt-4 grid gap-1.5 text-[0.95rem] leading-[1.45] text-site-copy">{suitableFor.map((item) => <li key={item.title}>• {item.title}</li>)}</ul></div> : null}
          {goodToKnow.length ? <div data-section-reveal><h3 className="text-[0.66rem] font-semibold tracking-[0.12em] text-site-copy uppercase">Bilmek iyi olur</h3><ul className="mt-4 grid gap-1.5 text-[0.95rem] leading-[1.45] text-site-copy">{goodToKnow.map((item) => <li key={item.title}>✓ {item.title}</li>)}</ul></div> : null}
        </div>
        {leadText ? <p className="mt-10 max-w-[56rem] whitespace-pre-line text-[clamp(1rem,1.35vw,1.16rem)] leading-[1.6] text-site-copy lg:ml-auto" data-section-reveal>{leadText}</p> : null}
      </div>
    </section>
  );
}
