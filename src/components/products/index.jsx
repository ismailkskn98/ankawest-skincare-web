import { ProductsCatalog } from "./catalog";

export function ProductsPage({ products, categories, source }) {
  return (
    <div className="bg-site-paper text-site-ink" data-motion-group>
      <section
        className="relative overflow-hidden pt-[calc(74px+3.5rem)] pb-14 min-[901px]:pt-[calc(78px+5rem)] min-[901px]:pb-20"
        aria-labelledby="products-title"
      >
        <div
          className="pointer-events-none absolute top-24 right-[-8%] h-[280px] w-[280px] rounded-full bg-[#e8e4dc] opacity-70 blur-3xl min-[901px]:top-32 min-[901px]:h-[420px] min-[901px]:w-[420px]"
          aria-hidden="true"
        />

        <div className="relative grid gap-8 min-[1024px]:grid-cols-12 min-[1024px]:items-end">
          <div className="min-[1024px]:col-span-8" data-section-reveal>
            <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-site-copy uppercase">
              Seçki
            </p>
            <h1
              id="products-title"
              className="font-canela mt-5 max-w-[11ch] text-[clamp(3.1rem,11vw,6.6rem)] leading-[0.9] font-light tracking-[-0.045em] text-site-ink"
            >
              Temiz
              <span className="block">bakım seçkisi.</span>
            </h1>
          </div>

          <div
            className="max-w-[380px] min-[1024px]:col-span-4 min-[1024px]:justify-self-end"
            data-section-reveal
          >
            <p className="text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.5] tracking-[-0.02em] text-site-copy">
              GLUTANEX ve Exome ürünlerini bakım ihtiyacına, dokuya ve aktif
              içeriğe göre keşfet. Şeffaf formüller, anlaşılır seçim.
            </p>
            <p className="mt-4 text-[0.72rem] tracking-[0.06em] text-site-copy/70 uppercase">
              {products.length} ürün
              {source === "demo" ? " · demo katalog" : ""}
            </p>
          </div>
        </div>
      </section>

      <ProductsCatalog products={products} categories={categories} />
    </div>
  );
}
