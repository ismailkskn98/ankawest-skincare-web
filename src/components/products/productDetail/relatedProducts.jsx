import Link from "next/link";

import { ProductCard } from "@/components/site/productCard";

export function RelatedProducts({ products }) {
  if (!products.length) return null;

  return (
    <section className="gridContainer bg-site-paper py-[clamp(3.25rem,min(7vw,10vh),7rem)] sm:py-[clamp(3.75rem,min(7vw,10vh),7rem)]">
      <div data-motion-group>
        <div className="flex items-end justify-between gap-[clamp(1rem,3vw,1.5rem)]" data-section-reveal>
          <h2 className="font-sentient text-[clamp(2.05rem,3vw,3.15rem)] leading-[1.08] font-light tracking-[-0.035em] text-site-ink">Diğer ürünler</h2>
          <Link className="hidden text-[0.68rem] font-semibold tracking-[0.1em] text-site-ink uppercase underline decoration-site-ink/25 underline-offset-4 transition-colors hover:decoration-site-ink sm:inline-flex" href="/urunler">Tüm ürünler</Link>
        </div>
        <div className="mt-[clamp(1.75rem,3.5vw,2.5rem)] grid grid-cols-2 gap-x-[clamp(0.75rem,2vw,2rem)] gap-y-[clamp(1.25rem,3vw,2.75rem)] xl:grid-cols-3">
          {products.map((product) => <div key={product.id} data-section-reveal><ProductCard product={product} /></div>)}
        </div>
      </div>
    </section>
  );
}
