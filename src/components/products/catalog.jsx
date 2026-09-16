"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { ProductCard } from "@/components/site/productCard";

import { CategoryFilter } from "./categoryFilter";

export function ProductsCatalog({ products, categories, revealDirection = "right" }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const catalogTopRef = useRef(null);
  const productGridRef = useRef(null);
  const shouldScrollToCategoryRef = useRef(false);

  const availableCategories = useMemo(() => {
    const usedSlugs = new Set(
      products.map((product) => product.categorySlug).filter(Boolean),
    );

    return categories.filter((category) => usedSlugs.has(category.slug));
  }, [categories, products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") {
      return products;
    }

    return products.filter((product) => product.categorySlug === activeCategory);
  }, [activeCategory, products]);

  const activeCategoryName =
    activeCategory === "all"
      ? "Tüm ürünler"
      : availableCategories.find((category) => category.slug === activeCategory)
          ?.name || "Tüm ürünler";

  const handleCategoryChange = (slug) => {
    if (slug === activeCategory) {
      return;
    }

    shouldScrollToCategoryRef.current = true;
    setActiveCategory(slug);
  };

  useEffect(() => {
    if (!shouldScrollToCategoryRef.current) {
      return undefined;
    }

    shouldScrollToCategoryRef.current = false;
    let firstFrame;
    let secondFrame;

    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        const target = catalogTopRef.current;

        if (!target) {
          return;
        }

        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        window.dispatchEvent(
          new CustomEvent("ankawest:catalog-scroll", {
            detail: {
              target,
              offset: -96,
              immediate: reduceMotion,
            },
          }),
        );
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [activeCategory]);

  useEffect(() => {
    const grid = productGridRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let context;
    let cancelled = false;

    if (!grid || reduceMotion) {
      return undefined;
    }

    async function setupReveal() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const cards = Array.from(grid.querySelectorAll("[data-product-card-reveal]"));
      const fromLeft = revealDirection === "left";

      context = gsap.context(() => {
        gsap.fromTo(
          cards,
          {
            autoAlpha: 0,
            x: fromLeft ? -34 : 34,
            rotate: fromLeft ? -1.4 : 1.4,
          },
          {
            autoAlpha: 1,
            x: 0,
            rotate: 0,
            duration: 0.72,
            stagger: 0.055,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: grid,
              start: "top 82%",
              once: true,
            },
          },
        );
      }, grid);
    }

    setupReveal();

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [activeCategory, revealDirection]);

  return (
    <section
      ref={catalogTopRef}
      className="scroll-mt-[96px] pt-[clamp(3.25rem,min(7vw,9vh),6.5rem)] pb-[clamp(4rem,min(9vw,11vh),8rem)]"
      aria-label="Ürün listesi"
    >
      <div className="grid gap-[clamp(2rem,4vw,3rem)] lg:grid-cols-[clamp(12.5rem,18vw,17rem)_minmax(0,1fr)] lg:items-start lg:gap-[clamp(2.25rem,4vw,5rem)]">
        <aside className="lg:sticky lg:top-[clamp(6.25rem,8vw,6.75rem)]">
          <CategoryFilter
            categories={availableCategories}
            activeCategory={activeCategory}
            activeCategoryName={activeCategoryName}
            onChange={handleCategoryChange}
          />
        </aside>

        <div>
          <div
            ref={productGridRef}
            className="grid grid-cols-2 gap-x-[clamp(0.75rem,2vw,2rem)] gap-y-[clamp(1.25rem,3vw,2.75rem)] xl:grid-cols-3"
          >
            {filteredProducts.map((product) => (
              <div key={product.id} data-product-card-reveal>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 ? (
            <p className="mt-[clamp(3rem,7vw,5rem)] text-center text-[clamp(0.92rem,1.2vw,1rem)] leading-[1.6] text-site-copy">
              Bu kategoride henüz ürün bulunmuyor.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
