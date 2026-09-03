"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

function ProductCard({ product }) {
  return (
    <Link
      className={`group relative flex aspect-[4/5] flex-col overflow-hidden rounded-[1.75rem] ${product.tone} transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 motion-reduce:transition-none`}
      href={product.href}
    >
      <div className="relative min-h-0 flex-1">
        {product.primaryImageUrl ? (
          <Image
            className="absolute inset-0 h-full w-full select-none object-contain p-[clamp(1.5rem,4vw,2.75rem)] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03] group-hover:opacity-0 motion-reduce:transition-none"
            src={product.primaryImageUrl}
            alt={product.fullName || product.name}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 33vw, 86vw"
            draggable={false}
          />
        ) : null}
        {product.hoverImageUrl ? (
          <Image
            className="absolute inset-0 h-full w-full select-none object-contain p-[clamp(1.5rem,4vw,2.75rem)] opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03] group-hover:opacity-100 motion-reduce:transition-none"
            src={product.hoverImageUrl}
            alt=""
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 33vw, 86vw"
            draggable={false}
            aria-hidden="true"
          />
        ) : null}
      </div>

      <div className="relative z-2 flex items-end justify-between gap-4 px-5 pb-5">
        <div>
          <p className="text-[0.62rem] font-semibold tracking-[0.12em] text-site-copy uppercase">
            {product.brand}
          </p>
          <h3 className="mt-1.5 max-w-[16ch] text-[clamp(1.15rem,1.7vw,1.4rem)] leading-[1.05] font-light tracking-[-0.03em] text-site-ink">
            {product.name}
          </h3>
          {product.categoryName ? (
            <p className="mt-2 text-[0.72rem] text-site-copy">{product.categoryName}</p>
          ) : null}
        </div>
        <div className="pb-0.5 text-right text-[0.68rem] leading-[1.45] text-site-copy">
          {product.sizeLabel ? <span className="block">{product.sizeLabel}</span> : null}
          {product.priceLabel ? (
            <span className="block font-semibold text-site-ink">{product.priceLabel}</span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export function ProductsCatalog({ products, categories }) {
  const [activeCategory, setActiveCategory] = useState("all");

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

  return (
    <section className="pb-20 min-[901px]:pb-32" aria-label="Ürün listesi">
      <div
        className="flex flex-wrap gap-2 border-b border-site-ink/10 pb-6"
        role="tablist"
        aria-label="Kategori filtreleri"
        data-section-reveal
      >
        <button
          className={`rounded-full px-4 py-2.5 text-[0.68rem] font-semibold tracking-[0.08em] uppercase transition-colors duration-300 ${
            activeCategory === "all"
              ? "bg-site-ink text-site-paper"
              : "bg-site-ink/5 text-site-copy hover:bg-site-ink/10"
          }`}
          type="button"
          role="tab"
          aria-selected={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
        >
          Tümü
        </button>
        {availableCategories.map((category) => {
          const isActive = activeCategory === category.slug;

          return (
            <button
              className={`rounded-full px-4 py-2.5 text-[0.68rem] font-semibold tracking-[0.08em] uppercase transition-colors duration-300 ${
                isActive
                  ? "bg-site-ink text-site-paper"
                  : "bg-site-ink/5 text-site-copy hover:bg-site-ink/10"
              }`}
              key={category.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(category.slug)}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-5 min-[640px]:grid-cols-2 min-[1024px]:mt-14 min-[1024px]:grid-cols-3 min-[1024px]:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <p className="mt-16 text-center text-[1rem] text-site-copy">
          Bu kategoride henüz ürün bulunmuyor.
        </p>
      ) : null}
    </section>
  );
}
