import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import { LeafIcon } from "@phosphor-icons/react/dist/ssr/Leaf";
import { SparkleIcon } from "@phosphor-icons/react/dist/ssr/Sparkle";
import Image from "next/image";
import Link from "next/link";

import { ProductCard } from "@/components/site/productCard";
import { TRENDYOL_STORE_URL } from "@/config/site-content";

function normalizeListItems(items) {
  if (!items?.length) {
    return [];
  }

  return items
    .map((item) => {
      if (typeof item === "string") {
        return { title: item.replace(/^✔\s*/, "").replace(/^[-•]\s*/, "").trim(), description: "" };
      }

      if (item && typeof item === "object") {
        return {
          title: item.name || item.title || "",
          description: item.description || "",
        };
      }

      return null;
    })
    .filter((item) => item?.title);
}

function getIngredientGroups(items) {
  if (!items?.length) {
    return [];
  }

  const grouped = [];
  let current = null;

  for (const raw of items) {
    if (typeof raw !== "string") {
      if (raw?.name || raw?.title) {
        grouped.push({
          name: raw.name || raw.title,
          descriptions: raw.description ? [raw.description] : [],
        });
      }
      continue;
    }

    const line = raw.trim();
    if (!line) continue;

    if (line.startsWith("-") || line.startsWith("•")) {
      if (current) {
        current.descriptions.push(line.replace(/^[-•]\s*/, ""));
      }
      continue;
    }

    current = { name: line, descriptions: [] };
    grouped.push(current);
  }

  return grouped;
}

function DetailCta({ href }) {
  return (
    <a
      className="group inline-flex min-h-14 w-full max-w-[22rem] items-center justify-between gap-4 rounded-full bg-site-ink py-1.5 pr-1.5 pl-6 text-[0.7rem] font-semibold tracking-[0.08em] text-site-paper uppercase transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] motion-reduce:transition-none"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      Trendyol’da incele
      <span className="relative grid size-11 place-items-center overflow-hidden rounded-full bg-site-paper text-site-ink">
        <ArrowUpRightIcon
          className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[160%] group-hover:-translate-y-[160%] motion-reduce:transition-none"
          size={18}
          weight="light"
          aria-hidden="true"
        />
        <ArrowUpRightIcon
          className="absolute -translate-x-[160%] translate-y-[160%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0 motion-reduce:hidden"
          size={18}
          weight="light"
          aria-hidden="true"
        />
      </span>
    </a>
  );
}

function IntroArrow() {
  return (
    <svg
      className="pointer-events-none absolute top-[7%] right-[8%] hidden h-[clamp(7rem,17vw,13rem)] w-[clamp(12rem,28vw,24rem)] text-site-ink min-[768px]:block"
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
  );
}

function ProductIntro({ product }) {
  const suitableFor = normalizeListItems(product.suitableFor).slice(0, 3);
  const goodToKnow = normalizeListItems(product.benefits).slice(0, 3);
  const leadText =
    product.description ||
    product.shortDescription ||
    `${product.name} ürününü bakım ihtiyacına ve rutin adımına göre değerlendir.`;

  return (
    <section className="gridContainer bg-site-paper py-[clamp(5rem,9vw,9rem)]">
      <div data-section-reveal>
        <div className="mx-auto grid max-w-[62rem] place-items-center text-center">
          <SparkleIcon size={44} weight="thin" aria-hidden="true" />
          <h2 className="mt-10 max-w-[18ch] text-[clamp(2.4rem,5vw,5.6rem)] leading-[0.94] font-light tracking-[-0.055em] text-site-ink">
            {product.shortDescription || product.name}
          </h2>
        </div>

        <div className="mt-[clamp(3rem,7vw,6rem)] grid gap-8 border-t border-site-ink/10 pt-8 min-[768px]:grid-cols-2 min-[1024px]:max-w-[42rem]">
          {suitableFor.length ? (
            <div>
              <h3 className="text-[0.66rem] font-semibold tracking-[0.12em] text-site-copy uppercase">
                Kimler için uygun
              </h3>
              <ul className="mt-4 grid gap-1.5 text-[0.95rem] leading-[1.45] text-site-copy">
                {suitableFor.map((item) => (
                  <li key={item.title}>• {item.title}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {goodToKnow.length ? (
            <div>
              <h3 className="text-[0.66rem] font-semibold tracking-[0.12em] text-site-copy uppercase">
                Bilmek iyi olur
              </h3>
              <ul className="mt-4 grid gap-1.5 text-[0.95rem] leading-[1.45] text-site-copy">
                {goodToKnow.map((item) => (
                  <li key={item.title}>✓ {item.title}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <p className="mt-10 max-w-[56rem] text-[clamp(1rem,1.35vw,1.16rem)] leading-[1.6] text-site-copy min-[1024px]:ml-auto">
          {leadText}
        </p>
      </div>
    </section>
  );
}

function ProductInformation({ product, mainImage }) {
  const ingredientGroups = getIngredientGroups(product.activeIngredients);
  const benefits = normalizeListItems(product.benefits);

  return (
    <section className="gridContainer bg-[#f2f2ef] py-[clamp(4rem,8vw,7rem)]">
      <div data-section-reveal>
        <div className="mx-auto max-w-[34rem] text-center">
          <p className="font-canela text-[clamp(2.3rem,4.6vw,4.7rem)] leading-[0.82] font-light tracking-[-0.045em] text-site-ink">
            tüm detaylar
          </p>
          <h2 className="text-[clamp(1.45rem,2.2vw,2.4rem)] leading-[0.95] font-semibold tracking-[-0.05em] text-site-ink uppercase">
            ürün hakkında
          </h2>
        </div>

        <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-10 min-[1024px]:grid-cols-12 min-[1024px]:items-start">
          <figure className="relative aspect-[1/1] overflow-hidden bg-site-paper min-[1024px]:col-span-5">
            {mainImage ? (
              <Image
                className="object-contain p-[clamp(2rem,5vw,4.5rem)] drop-shadow-[0_20px_28px_rgba(59,59,59,0.1)]"
                src={mainImage}
                alt={product.fullName || product.name}
                fill
                sizes="(min-width: 1024px) 36vw, 92vw"
              />
            ) : null}
          </figure>

          <div className="grid gap-8 min-[1024px]:col-span-7 min-[1024px]:pt-4">
            {benefits.length ? (
              <div className="border-t border-site-ink/12 pt-7">
                <h3 className="text-[0.66rem] font-semibold tracking-[0.12em] text-site-copy uppercase">
                  Öne çıkan özellikler
                </h3>
                <ul className="mt-5 grid gap-4 min-[640px]:grid-cols-2">
                  {benefits.map((item) => (
                    <li className="flex gap-3 text-[0.95rem] leading-[1.45] text-site-copy" key={item.title}>
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-site-paper text-site-ink">
                        <CheckIcon size={13} weight="light" aria-hidden="true" />
                      </span>
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {ingredientGroups.length ? (
              <div className="border-t border-site-ink/12 pt-7">
                <h3 className="text-[0.66rem] font-semibold tracking-[0.12em] text-site-copy uppercase">
                  Aktif içerikler
                </h3>
                <div className="mt-6 grid gap-x-10 gap-y-7 min-[640px]:grid-cols-2">
                  {ingredientGroups.map((item) => (
                    <article key={item.name}>
                      <h4 className="text-[clamp(1.25rem,2vw,1.85rem)] leading-[1] font-light tracking-[-0.045em] text-site-ink">
                        {item.name}
                      </h4>
                      {item.descriptions.length ? (
                        <p className="mt-3 text-[0.9rem] leading-[1.55] text-site-copy">
                          {item.descriptions.join(" ")}
                        </p>
                      ) : null}
                    </article>
                  ))}
                </div>
              </div>
            ) : null}

            {product.usageInstructions ? (
              <div className="border-t border-site-ink/12 pt-7">
                <h3 className="text-[0.66rem] font-semibold tracking-[0.12em] text-site-copy uppercase">
                  Kullanım
                </h3>
                <p className="mt-4 max-w-[52ch] whitespace-pre-line text-[0.94rem] leading-[1.6] text-site-copy">
                  {product.usageInstructions}
                </p>
              </div>
            ) : null}

            {product.warnings ? (
              <div className="border-t border-site-ink/12 pt-7">
                <h3 className="text-[0.66rem] font-semibold tracking-[0.12em] text-site-copy uppercase">
                  Uyarılar
                </h3>
                <p className="mt-4 max-w-[52ch] whitespace-pre-line text-[0.9rem] leading-[1.6] text-site-copy">
                  {product.warnings}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductDetail({ product, relatedProducts = [] }) {
  const mainImage =
    product.transparentImageUrl ||
    product.detailImageUrl ||
    product.primaryImageUrl ||
    product.image ||
    null;
  const detailUrl = product.trendyolUrl || TRENDYOL_STORE_URL;
  const heroTone = product.tone || "bg-[#ded7eb]";

  return (
    <article className="fluid bg-site-paper text-site-ink" data-motion-group>
      <section className="fluid relative min-h-[100svh] bg-[#ededeb]" aria-labelledby="product-title">
        <div className="grid min-h-[100svh] min-[1024px]:grid-cols-[54%_46%]">
          <div className={`relative isolate min-h-[52svh] overflow-hidden ${heroTone} min-[1024px]:min-h-[100svh]`} data-scroll-parallax-section data-parallax-strength="0.72" data-parallax-centered="true">
            <IntroArrow />
            <Link
              className="absolute top-[calc(74px+1rem)] left-[clamp(1rem,4vw,4.5rem)] z-2 inline-flex min-h-10 items-center text-[0.68rem] font-semibold tracking-[0.1em] text-site-copy uppercase transition-opacity duration-300 hover:opacity-70 min-[901px]:top-[calc(78px+1.5rem)]"
              href="/urunler"
            >
              ← Tüm ürünler
            </Link>
            {mainImage ? (
              <div
                className="absolute inset-x-0 top-[-3rem] bottom-[-3rem] transform-gpu will-change-transform"
                data-scroll-parallax-layer
                data-parallax-distance="130"
              >
                <Image
                  className="object-contain p-[clamp(3rem,8vw,7rem)] drop-shadow-[0_22px_34px_rgba(59,59,59,0.12)]"
                  src={mainImage}
                  alt={product.fullName || product.name}
                  fill
                  sizes="(min-width: 1024px) 54vw, 100vw"
                  priority
                />
              </div>
            ) : null}
          </div>

          <div className="relative z-2 flex min-h-[100svh] flex-col justify-center bg-[#f0f0ee] px-[clamp(1.1rem,5vw,5.5rem)] py-[calc(74px+2rem)] min-[1024px]:-mb-[clamp(2rem,6vw,5rem)] min-[1024px]:py-[calc(78px+4rem)]">
            <div data-section-reveal>
              {product.categoryName ? (
                <span className="inline-flex rounded-full border border-site-ink/60 px-6 py-2 text-[0.68rem] font-light tracking-[0.08em] text-site-ink uppercase">
                  {product.categoryName}
                </span>
              ) : null}

              <h1
                id="product-title"
                className="mt-7 max-w-[13ch] text-[clamp(2.65rem,5.5vw,5.45rem)] leading-[0.9] font-semibold tracking-[-0.07em] text-site-ink"
              >
                {product.name}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                {product.sizeLabel ? (
                  <span className="rounded-full bg-site-ink px-4 py-2 text-[0.72rem] font-semibold tracking-[0.08em] text-site-paper uppercase">
                    {product.sizeLabel}
                  </span>
                ) : null}
                {product.priceLabel ? (
                  <span className="text-[clamp(1.1rem,1.7vw,1.5rem)] font-light tracking-[-0.03em] text-site-ink">
                    {product.priceLabel}
                  </span>
                ) : null}
              </div>

              {product.shortDescription || product.description ? (
                <p className="mt-8 max-w-[52ch] text-[clamp(0.98rem,1.2vw,1.12rem)] leading-[1.55] text-site-copy">
                  {product.shortDescription || product.description}
                </p>
              ) : null}

              <div className="mt-10">
                <DetailCta href={detailUrl} />
              </div>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-5 text-center min-[640px]:grid-cols-4" data-section-reveal>
              {[
                ["30", "Günlük rutin"],
                ["", "Net içerik"],
                ["", "Cruelty Free"],
                ["", "Anlaşılır seçim"],
              ].map(([short, label]) => (
                <div key={label}>
                  <span className="mx-auto grid size-12 place-items-center rounded-full bg-site-paper text-site-ink">
                    {short ? <span className="text-[0.72rem] font-semibold">{short}</span> : <LeafIcon size={18} weight="light" aria-hidden="true" />}
                  </span>
                  <p className="mt-3 text-[0.78rem] leading-[1.25] text-site-copy">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProductIntro product={product} />
      <ProductInformation product={product} mainImage={mainImage} />

      {relatedProducts.length > 0 ? (
        <section className="gridContainer bg-site-paper py-[clamp(4rem,8vw,7rem)]" data-section-reveal>
          <div>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="font-canela text-[clamp(2.4rem,4vw,4rem)] leading-[0.9] font-light tracking-[-0.04em] text-site-ink">
                  devam et
                </p>
                <h2 className="text-[clamp(1.5rem,2.5vw,2.7rem)] leading-[0.95] font-semibold tracking-[-0.05em] text-site-ink uppercase">
                  seçkiden diğerleri
                </h2>
              </div>
              <Link
                className="hidden text-[0.68rem] font-semibold tracking-[0.1em] text-site-ink uppercase underline decoration-site-ink/25 underline-offset-4 transition-colors hover:decoration-site-ink min-[640px]:inline-flex"
                href="/urunler"
              >
                Tüm ürünler
              </Link>
            </div>

            <div className="mt-8 grid gap-6 min-[640px]:grid-cols-2 min-[640px]:gap-[clamp(1.25rem,2vw,2rem)] min-[1024px]:grid-cols-3 min-[1280px]:grid-cols-4">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
