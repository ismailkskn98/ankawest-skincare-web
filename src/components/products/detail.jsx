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
        return {
          title: item
            .replace(/^✔\s*/, "")
            .replace(/^[-•]\s*/, "")
            .trim(),
          description: "",
        };
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

const desktopArrowPath =
  "M339.216 79.8976C339.492 79.8733 339.695 79.6306 339.67 79.3555L339.274 74.873C339.25 74.5979 339.007 74.3947 338.732 74.419C338.457 74.4433 338.254 74.686 338.278 74.9611L338.63 78.9456L334.646 79.2979C334.371 79.3223 334.168 79.565 334.192 79.84C334.216 80.1151 334.459 80.3184 334.734 80.2941L339.216 79.8976ZM1.20783 31.418C72.0569 -5.46989 212.351 -26.1603 338.851 79.7829L339.493 79.0162C212.623 -27.2366 71.8787 -6.50452 0.74602 30.5311L1.20783 31.418Z";

function IntroArrow() {
  return (
    <svg
      className="pointer-events-none absolute top-[clamp(6.5rem,14vh,8.5rem)] right-[clamp(1rem,6%,3rem)] z-1 hidden w-[clamp(11rem,28vw,21rem)] text-site-ink min-[768px]:block min-[1024px]:right-[-4%] min-[1280px]:right-[-2%]"
      width="340"
      height="81"
      viewBox="0 0 340 81"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <path d={desktopArrowPath} fill="currentColor" />
    </svg>
  );
}

function ProductIntro({ product }) {
  const suitableFor = normalizeListItems(product.suitableFor).slice(0, 3);
  const goodToKnow = normalizeListItems(product.benefits).slice(0, 3);
  const leadText = product.description || product.shortDescription || `${product.name} ürününü bakım ihtiyacına ve rutin adımına göre değerlendir.`;

  return (
    <section className="gridContainer bg-site-paper py-[clamp(5rem,9vw,9rem)]">
      <div data-section-reveal>
        <div className="mx-auto grid max-w-[62rem] place-items-center text-center">
          <SparkleIcon size={44} weight="thin" aria-hidden="true" />
          <h2 className="font-canela mt-10 max-w-[18ch] text-[clamp(2.15rem,4.4vw,4.6rem)] leading-[1.14] font-light tracking-[-0.04em] text-site-ink">{product.shortDescription || product.name}</h2>
        </div>

        <div className="mt-[clamp(3rem,7vw,6rem)] grid gap-8 border-t border-site-ink/10 pt-8 min-[768px]:grid-cols-2 min-[1024px]:max-w-[42rem]">
          {suitableFor.length ? (
            <div>
              <h3 className="text-[0.66rem] font-semibold tracking-[0.12em] text-site-copy uppercase">Kimler için uygun</h3>
              <ul className="mt-4 grid gap-1.5 text-[0.95rem] leading-[1.45] text-site-copy">
                {suitableFor.map((item) => (
                  <li key={item.title}>• {item.title}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {goodToKnow.length ? (
            <div>
              <h3 className="text-[0.66rem] font-semibold tracking-[0.12em] text-site-copy uppercase">Bilmek iyi olur</h3>
              <ul className="mt-4 grid gap-1.5 text-[0.95rem] leading-[1.45] text-site-copy">
                {goodToKnow.map((item) => (
                  <li key={item.title}>✓ {item.title}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <p className="mt-10 max-w-[56rem] text-[clamp(1rem,1.35vw,1.16rem)] leading-[1.6] text-site-copy min-[1024px]:ml-auto">{leadText}</p>
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
          <h2 className="font-canela text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.12] font-light tracking-[-0.04em] text-site-ink">Ürün hakkında</h2>
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
                <h3 className="text-[0.66rem] font-semibold tracking-[0.12em] text-site-copy uppercase">Öne çıkan özellikler</h3>
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
                <h3 className="text-[0.66rem] font-semibold tracking-[0.12em] text-site-copy uppercase">Aktif içerikler</h3>
                <div className="mt-6 grid gap-x-10 gap-y-7 min-[640px]:grid-cols-2">
                  {ingredientGroups.map((item) => (
                    <article key={item.name}>
                      <h4 className="font-canela text-[clamp(1.2rem,1.9vw,1.7rem)] leading-[1.18] font-light tracking-[-0.035em] text-site-ink">{item.name}</h4>
                      {item.descriptions.length ? <p className="mt-3 text-[0.9rem] leading-[1.55] text-site-copy">{item.descriptions.join(" ")}</p> : null}
                    </article>
                  ))}
                </div>
              </div>
            ) : null}

            {product.usageInstructions ? (
              <div className="border-t border-site-ink/12 pt-7">
                <h3 className="text-[0.66rem] font-semibold tracking-[0.12em] text-site-copy uppercase">Kullanım</h3>
                <p className="mt-4 max-w-[52ch] whitespace-pre-line text-[0.94rem] leading-[1.6] text-site-copy">{product.usageInstructions}</p>
              </div>
            ) : null}

            {product.warnings ? (
              <div className="border-t border-site-ink/12 pt-7">
                <h3 className="text-[0.66rem] font-semibold tracking-[0.12em] text-site-copy uppercase">Uyarılar</h3>
                <p className="mt-4 max-w-[52ch] whitespace-pre-line text-[0.9rem] leading-[1.6] text-site-copy">{product.warnings}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductDetail({ product, relatedProducts = [] }) {
  const mainImage = product.transparentImageUrl || product.detailImageUrl || product.primaryImageUrl || product.image || null;
  const detailUrl = product.trendyolUrl || TRENDYOL_STORE_URL;
  const heroTone = product.tone || "bg-[#ded7eb]";

  return (
    <article className="fluid bg-site-paper text-site-ink" data-motion-group>
      <section className="fluid relative bg-[#ededeb]" aria-labelledby="product-title">
        <div
          className={`grid min-[1024px]:min-h-svh min-[1024px]:items-stretch min-[1024px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] pt-[calc(74px+clamp(1.75rem,3.5vw,2.75rem))] min-[901px]:pt-[calc(78px+clamp(2rem,3.8vw,3.25rem))] ${heroTone}`}
        >
          <div
            className={`relative isolate z-3 flex min-h-[clamp(18rem,52svh,28rem)] flex-col pb-[clamp(1.25rem,4vw,3rem)] ${heroTone} min-[768px]:min-h-[clamp(22rem,58svh,34rem)] min-[1024px]:min-h-0`}
            data-scroll-parallax-section
            data-parallax-strength="0.55"
            data-parallax-centered="true"
          >
            <IntroArrow />
            <Link
              className="relative z-2 ml-[clamp(1rem,4vw,4.5rem)] inline-flex min-h-10 w-fit items-center text-[0.68rem] font-semibold tracking-[0.1em] text-site-copy uppercase transition-opacity duration-300 hover:opacity-70"
              href="/urunler"
            >
              ← Tüm ürünler
            </Link>

            {mainImage ? (
              <div className="relative z-1 mx-auto flex w-full flex-1 items-center justify-center px-[clamp(1.25rem,5vw,3.5rem)] py-[clamp(0.5rem,2vw,1.25rem)]">
                <div
                  className="relative h-[clamp(13rem,38svh,20rem)] w-full max-w-[clamp(9.5rem,42vw,16rem)] transform-gpu will-change-transform min-[768px]:h-[clamp(18rem,46svh,26rem)] min-[768px]:max-w-[clamp(14rem,28vw,20rem)] min-[1280px]:h-[min(54svh,30rem)] min-[1280px]:max-w-[21rem]"
                  data-scroll-parallax-layer
                  data-parallax-distance="90"
                >
                  <Image
                    className="object-contain drop-shadow-[0_22px_34px_rgba(59,59,59,0.12)]"
                    src={mainImage}
                    alt={product.fullName || product.name}
                    fill
                    sizes="(min-width: 1280px) 21rem, (min-width: 768px) 20rem, 42vw"
                    unoptimized
                    priority
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className="relative z-2 flex flex-col bg-[#F2F2F2] p-[clamp(1.5rem,4vw,3rem)] min-[1024px]:min-h-full min-[1024px]:-mb-[clamp(1.5rem,4vw,3.5rem)]">
            <div className="flex flex-1 flex-col justify-between gap-[clamp(1.75rem,4vh,2.75rem)]" data-section-reveal>
              <div className="flex flex-col gap-[clamp(1.15rem,2.4vh,1.65rem)]">
                {product.categoryName ? (
                  <span className="inline-flex w-fit rounded-full border border-site-ink/55 px-5 py-2 text-[0.66rem] font-light tracking-[0.08em] text-site-ink uppercase">
                    {product.categoryName}
                  </span>
                ) : null}

                <h1
                  id="product-title"
                  className="font-canela max-w-[14ch] text-[clamp(2.35rem,5vw,4.35rem)] leading-[1.1] font-medium tracking-[-0.04em] text-site-ink"
                >
                  {product.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4">
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
                  <p className="max-w-[44ch] text-[clamp(0.95rem,1.15vw,1.08rem)] leading-[1.62] text-site-copy">
                    {product.shortDescription || product.description}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-[clamp(1.5rem,3.5vh,2.25rem)]">
                <DetailCta href={detailUrl} />

                <div className="grid grid-cols-2 gap-x-5 gap-y-5 text-center min-[640px]:grid-cols-4">
                  {[
                    ["30", "Günlük rutin"],
                    ["", "Net içerik"],
                    ["", "Cruelty Free"],
                    ["", "Anlaşılır seçim"],
                  ].map(([short, label]) => (
                    <div key={label}>
                      <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#ebebe9] text-site-ink min-[1024px]:size-[3.75rem]">
                        {short ? (
                          <span className="text-[0.8rem] font-semibold">{short}</span>
                        ) : (
                          <LeafIcon size={22} weight="light" aria-hidden="true" />
                        )}
                      </span>
                      <p className="mt-3 text-[0.8rem] leading-[1.3] text-site-copy">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
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
              <h2 className="font-canela text-[clamp(2.15rem,3.8vw,3.5rem)] leading-[1.12] font-light tracking-[-0.04em] text-site-ink">Seçkiden diğerleri</h2>
              <Link
                className="hidden text-[0.68rem] font-semibold tracking-[0.1em] text-site-ink uppercase underline decoration-site-ink/25 underline-offset-4 transition-colors hover:decoration-site-ink min-[640px]:inline-flex"
                href="/urunler"
              >
                Tüm ürünler
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-[clamp(0.85rem,2.5vw,1.5rem)]">
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
