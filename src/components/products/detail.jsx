import Image from "next/image";
import Link from "next/link";

import { TRENDYOL_STORE_URL } from "@/config/site-content";

export function ProductDetail({ product }) {
  return (
    <article className="bg-site-paper text-site-ink" data-motion-group>
      <div className="pt-[calc(74px+2.5rem)] pb-20 min-[901px]:pt-[calc(78px+4rem)] min-[901px]:pb-32">
        <div className="mb-8" data-section-reveal>
          <Link
            className="inline-flex min-h-10 items-center text-[0.7rem] font-semibold tracking-[0.1em] text-site-copy uppercase"
            href="/urunler"
          >
            ← Tüm ürünler
          </Link>
        </div>

        <div className="grid gap-10 min-[1024px]:grid-cols-12 min-[1024px]:gap-12">
          <figure
            className={`relative aspect-[4/5] overflow-hidden rounded-[2rem] ${product.tone} min-[1024px]:col-span-6`}
            data-section-reveal
          >
            {product.primaryImageUrl ? (
              <Image
                className="object-contain p-[clamp(2rem,6vw,4.5rem)]"
                src={product.primaryImageUrl}
                alt={product.fullName || product.name}
                fill
                sizes="(min-width: 1024px) 42vw, 92vw"
                priority
              />
            ) : null}
          </figure>

          <div className="min-[1024px]:col-span-6 min-[1024px]:pt-6" data-section-reveal>
            <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-site-copy uppercase">
              {product.brand}
              {product.categoryName ? ` · ${product.categoryName}` : ""}
            </p>
            <h1 className="mt-5 max-w-[16ch] text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[0.96] font-light tracking-[-0.04em]">
              {product.name}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-[0.92rem] text-site-copy">
              {product.sizeLabel ? <span>{product.sizeLabel}</span> : null}
              {product.priceLabel ? (
                <span className="rounded-full bg-site-ink px-4 py-2 text-[0.78rem] font-semibold tracking-[0.06em] text-site-paper">
                  {product.priceLabel}
                </span>
              ) : null}
            </div>

            {product.shortDescription || product.description ? (
              <p className="mt-8 max-w-[48ch] text-[clamp(1rem,1.2vw,1.12rem)] leading-[1.55] text-site-copy">
                {product.shortDescription || product.description}
              </p>
            ) : null}

            <a
              className="group mt-10 inline-flex items-center gap-4 rounded-full bg-site-ink py-2 pr-2 pl-6 text-[0.7rem] font-semibold tracking-[0.08em] text-site-paper uppercase"
              href={TRENDYOL_STORE_URL}
              target="_blank"
              rel="noreferrer"
            >
              Trendyol’da incele
              <span className="grid size-10 place-items-center rounded-full bg-site-paper text-site-ink transition-transform duration-500 group-hover:translate-x-0.5 motion-reduce:transition-none">
                →
              </span>
            </a>

            {product.benefits?.length > 0 ? (
              <div className="mt-14 border-t border-site-ink/15 pt-8">
                <h2 className="text-[0.68rem] font-semibold tracking-[0.14em] text-site-copy uppercase">
                  Faydalar
                </h2>
                <ul className="mt-5 grid gap-3">
                  {product.benefits.slice(0, 8).map((benefit) => (
                    <li
                      className="text-[0.92rem] leading-[1.5] text-site-ink"
                      key={benefit}
                    >
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {product.usageInstructions ? (
              <div className="mt-10 border-t border-site-ink/15 pt-8">
                <h2 className="text-[0.68rem] font-semibold tracking-[0.14em] text-site-copy uppercase">
                  Kullanım
                </h2>
                <p className="mt-4 whitespace-pre-line text-[0.92rem] leading-[1.55] text-site-copy">
                  {product.usageInstructions}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
