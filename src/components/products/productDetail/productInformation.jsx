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
    <section className="gridContainer bg-[#f2f2ef] py-[clamp(3.25rem,min(7vw,10vh),7rem)] sm:py-[clamp(3.75rem,min(7vw,10vh),7rem)]">
      <div data-motion-group>
        <div className="mx-auto max-w-[34rem] text-center" data-section-reveal>
          <h2 className="font-sentient [overflow-wrap:anywhere] text-[clamp(1.95rem,8vw,3.8rem)] leading-[1.08] font-light tracking-[-0.04em] text-site-ink sm:text-[clamp(2.1rem,4vw,3.8rem)]">Ürün hakkında</h2>
        </div>
        <div className="mt-[clamp(2.5rem,min(6vw,8vh),5rem)] grid gap-[clamp(2.25rem,5vw,4.5rem)] lg:grid-cols-12 lg:items-start">
          {mainImage ? (
            <figure className="relative mx-auto aspect-square w-full max-w-[38rem] overflow-hidden lg:col-span-5 lg:max-w-none" data-section-reveal>
              <Image className="object-contain" unoptimized src={mainImage} alt={product.fullName || product.name} fill sizes="(min-width: 64rem) 36vw, 92vw" />
            </figure>
          ) : null}
          <div className={`grid gap-[clamp(1.75rem,3vw,2.5rem)] lg:pt-[clamp(0rem,1.5vw,1rem)] ${mainImage ? "lg:col-span-7" : "lg:col-span-12 lg:max-w-[68rem] lg:justify-self-center"}`}>
            {product.description && product.description !== product.shortDescription ? (
              <ContentSection title="Detaylı açıklama">
                <p className="mt-[clamp(0.75rem,1.5vw,1rem)] max-w-[68ch] [overflow-wrap:anywhere] whitespace-pre-line text-[clamp(0.88rem,3.7vw,0.96rem)] leading-[1.65] text-site-copy sm:text-[clamp(0.9rem,1vw,0.96rem)]">{product.description}</p>
              </ContentSection>
            ) : null}
            {benefits.length ? (
              <ContentSection title="Öne çıkan özellikler">
                <ul className="mt-[clamp(1rem,2vw,1.25rem)] grid gap-[clamp(0.8rem,1.5vw,1rem)] sm:grid-cols-2">
                  {benefits.map((item) => (
                    <li className="flex min-w-0 gap-[clamp(0.65rem,1vw,0.75rem)] text-[clamp(0.88rem,3.7vw,0.96rem)] leading-[1.5] text-site-copy sm:text-[clamp(0.9rem,1vw,0.96rem)]" key={item.title}>
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-site-paper text-site-ink">
                        <CheckIcon size={13} weight="light" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 [overflow-wrap:anywhere]">{item.title}</span>
                    </li>
                  ))}
                </ul>
              </ContentSection>
            ) : null}
            {ingredientGroups.length ? (
              <ContentSection title="Aktif içerikler">
                <div className="mt-[clamp(1.25rem,2.5vw,1.5rem)] grid gap-x-[clamp(1.5rem,3vw,2.5rem)] gap-y-[clamp(1.25rem,2.5vw,1.75rem)] sm:grid-cols-2">
                  {ingredientGroups.map((item) => (
                    <article className="min-w-0" key={item.name}>
                      <h4 className="font-sentient [overflow-wrap:anywhere] text-[clamp(1.15rem,5vw,1.7rem)] leading-[1.18] font-light tracking-[-0.035em] text-site-ink sm:text-[clamp(1.2rem,1.9vw,1.7rem)]">{item.name}</h4>
                      {item.descriptions.length ? <p className="mt-[clamp(0.55rem,1.2vw,0.75rem)] [overflow-wrap:anywhere] text-[clamp(0.84rem,3.6vw,0.91rem)] leading-[1.58] text-site-copy sm:text-[clamp(0.86rem,0.95vw,0.91rem)]">{item.descriptions.join(" ")}</p> : null}
                    </article>
                  ))}
                </div>
              </ContentSection>
            ) : null}
            {trendyolAttributes.length ? (
              <ContentSection title="Ürün özellikleri">
                <dl className="mt-[clamp(1rem,2vw,1.25rem)] grid gap-x-[clamp(1.5rem,3vw,2.5rem)] gap-y-[clamp(0.75rem,1.5vw,1rem)] sm:grid-cols-2">
                  {trendyolAttributes.map((attribute, index) => (
                    <div className="grid min-w-0 grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-start gap-[clamp(0.75rem,3vw,1rem)] border-b border-site-ink/10 pb-3" key={`${attribute.id || attribute.name}-${attribute.value}-${index}`}>
                      <dt className="min-w-0 [overflow-wrap:anywhere] text-[clamp(0.8rem,3.4vw,0.84rem)] leading-[1.45] text-site-copy">{attribute.name}</dt>
                      <dd className="m-0 min-w-0 [overflow-wrap:anywhere] text-right text-[clamp(0.82rem,3.5vw,0.88rem)] leading-[1.45] font-medium text-site-ink">{attribute.value}</dd>
                    </div>
                  ))}
                </dl>
              </ContentSection>
            ) : null}
            {product.usageInstructions ? (
              <ContentSection title="Kullanım">
                <p className="mt-[clamp(0.75rem,1.5vw,1rem)] max-w-[52ch] [overflow-wrap:anywhere] whitespace-pre-line text-[clamp(0.88rem,3.7vw,0.96rem)] leading-[1.62] text-site-copy sm:text-[clamp(0.9rem,1vw,0.96rem)]">{product.usageInstructions}</p>
              </ContentSection>
            ) : null}
            {product.warnings ? (
              <ContentSection title="Uyarılar">
                <p className="mt-[clamp(0.75rem,1.5vw,1rem)] max-w-[52ch] [overflow-wrap:anywhere] whitespace-pre-line text-[clamp(0.84rem,3.6vw,0.91rem)] leading-[1.62] text-site-copy sm:text-[clamp(0.86rem,0.95vw,0.91rem)]">{product.warnings}</p>
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
    <div className="border-t border-site-ink/12 pt-[clamp(1.25rem,2.5vw,1.75rem)]" data-section-reveal>
      <h3 className="text-[clamp(0.62rem,0.75vw,0.67rem)] font-semibold tracking-[0.12em] text-site-copy uppercase">{title}</h3>
      {children}
    </div>
  );
}
