import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import Image from "next/image";

import { getDisplayAttributes, getIngredientGroups, normalizeListItems } from "./helpers";

export function ProductInformation({ product, mainImage }) {
  const ingredientGroups = getIngredientGroups(product.activeIngredients);
  const benefits = normalizeListItems(product.benefits);
  const trendyolAttributes = getDisplayAttributes(product);
  const hasInformation = Boolean(product.description || benefits.length || ingredientGroups.length || trendyolAttributes.length || product.usageInstructions || product.warnings);

  if (!mainImage && !hasInformation) return null;

  return (
    <section className="gridContainer bg-[#f2f2ef] py-[clamp(4rem,8vw,7rem)]">
      <div data-motion-group>
        <div className="mx-auto max-w-[34rem] text-center" data-section-reveal>
          <h2 className="font-sentient text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.12] font-light tracking-[-0.04em] text-site-ink">Ürün hakkında</h2>
        </div>
        <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-10 lg:grid-cols-12 lg:items-start">
          {mainImage ? (
            <figure className="relative aspect-[1/1] overflow-hidden lg:col-span-5" data-section-reveal>
              <Image className="object-contain" unoptimized src={mainImage} alt={product.fullName || product.name} fill sizes="(min-width: 64rem) 36vw, 92vw" />
            </figure>
          ) : null}
          <div className={`grid gap-8 lg:pt-4 ${mainImage ? "lg:col-span-7" : "lg:col-span-12 lg:max-w-[68rem] lg:justify-self-center"}`}>
            {product.description && product.description !== product.shortDescription ? (
              <ContentSection title="Detaylı açıklama">
                <p className="mt-4 max-w-[68ch] whitespace-pre-line text-[0.94rem] leading-[1.65] text-site-copy">{product.description}</p>
              </ContentSection>
            ) : null}
            {benefits.length ? (
              <ContentSection title="Öne çıkan özellikler">
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {benefits.map((item) => (
                    <li className="flex gap-3 text-[0.95rem] leading-[1.45] text-site-copy" key={item.title}>
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-site-paper text-site-ink">
                        <CheckIcon size={13} weight="light" aria-hidden="true" />
                      </span>
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>
              </ContentSection>
            ) : null}
            {ingredientGroups.length ? (
              <ContentSection title="Aktif içerikler">
                <div className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2">
                  {ingredientGroups.map((item) => (
                    <article key={item.name}>
                      <h4 className="font-sentient text-[clamp(1.2rem,1.9vw,1.7rem)] leading-[1.18] font-light tracking-[-0.035em] text-site-ink">{item.name}</h4>
                      {item.descriptions.length ? <p className="mt-3 text-[0.9rem] leading-[1.55] text-site-copy">{item.descriptions.join(" ")}</p> : null}
                    </article>
                  ))}
                </div>
              </ContentSection>
            ) : null}
            {trendyolAttributes.length ? (
              <ContentSection title="Ürün özellikleri">
                <dl className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                  {trendyolAttributes.map((attribute, index) => (
                    <div className="flex items-baseline justify-between gap-4 border-b border-site-ink/10 pb-3" key={`${attribute.id || attribute.name}-${attribute.value}-${index}`}>
                      <dt className="text-[0.84rem] text-site-copy">{attribute.name}</dt>
                      <dd className="m-0 text-right text-[0.88rem] font-medium text-site-ink">{attribute.value}</dd>
                    </div>
                  ))}
                </dl>
              </ContentSection>
            ) : null}
            {product.usageInstructions ? (
              <ContentSection title="Kullanım">
                <p className="mt-4 max-w-[52ch] whitespace-pre-line text-[0.94rem] leading-[1.6] text-site-copy">{product.usageInstructions}</p>
              </ContentSection>
            ) : null}
            {product.warnings ? (
              <ContentSection title="Uyarılar">
                <p className="mt-4 max-w-[52ch] whitespace-pre-line text-[0.9rem] leading-[1.6] text-site-copy">{product.warnings}</p>
              </ContentSection>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContentSection({ title, children }) {
  return (
    <div className="border-t border-site-ink/12 pt-7" data-section-reveal>
      <h3 className="text-[0.66rem] font-semibold tracking-[0.12em] text-site-copy uppercase">{title}</h3>
      {children}
    </div>
  );
}
