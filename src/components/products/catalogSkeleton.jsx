const skeletonCards = Array.from({ length: 6 }, (_, index) => index);

export function ProductsCatalogSkeleton() {
  return (
    <section
      className="pt-[clamp(4rem,7vw,6.5rem)] pb-[clamp(4rem,9vw,8rem)]"
      role="status"
      aria-label="Ürünler yükleniyor"
    >
      <div className="grid gap-8 sm:gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start lg:gap-[clamp(3.25rem,5vw,6rem)] xl:grid-cols-[17rem_minmax(0,1fr)]">
        <div className="grid content-start gap-3" aria-hidden="true">
          <div className="h-3 w-20 animate-pulse rounded-sm bg-site-ink/10 motion-reduce:animate-none" />
          <div className="mt-3 h-11 w-full animate-pulse rounded-full bg-site-ink/8 motion-reduce:animate-none" />
          <div className="h-11 w-full animate-pulse rounded-full bg-site-ink/8 motion-reduce:animate-none" />
          <div className="h-11 w-full animate-pulse rounded-full bg-site-ink/8 motion-reduce:animate-none" />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-[clamp(1.25rem,2vw,2rem)] xl:grid-cols-3" aria-hidden="true">
          {skeletonCards.map((card) => (
            <div className="grid gap-3" key={card}>
              <div className="aspect-[0.82] animate-pulse rounded-[0.4rem] bg-site-ink/8 motion-reduce:animate-none" />
              <div className="h-3 w-2/3 animate-pulse rounded-sm bg-site-ink/10 motion-reduce:animate-none" />
              <div className="h-3 w-1/3 animate-pulse rounded-sm bg-site-ink/8 motion-reduce:animate-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
