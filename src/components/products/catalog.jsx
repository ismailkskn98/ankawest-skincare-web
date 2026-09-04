"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { ProductCard } from "@/components/site/productCard";

import { CategoryFilter } from "./categoryFilter";

export function ProductsCatalog({ products, categories, revealDirection = "right" }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const catalogTopRef = useRef(null);
  const productGridRef = useRef(null);

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
    setActiveCategory(slug);

    window.requestAnimationFrame(() => {
      catalogTopRef.current?.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    });
  };

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
      className="scroll-mt-[96px] pt-[clamp(4rem,7vw,6.5rem)] pb-[clamp(4rem,9vw,8rem)]"
      aria-label="Ürün listesi"
    >
      <div className="grid gap-8 sm:gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start lg:gap-[clamp(3.25rem,5vw,6rem)] xl:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-[100px] xl:top-[108px]">
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
            className="grid grid-cols-2 gap-3 sm:gap-[clamp(1.25rem,2vw,2rem)] xl:grid-cols-3"
          >
            {filteredProducts.map((product) => (
              <div key={product.id} data-product-card-reveal>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 ? (
            <p className="mt-16 text-center text-[1rem] text-site-copy">
              Bu kategoride henüz ürün bulunmuyor.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
