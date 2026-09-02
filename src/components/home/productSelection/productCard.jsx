import Image from "next/image";

export function ProductCard({ product }) {
  return (
    <article
      className={`group relative aspect-[514/719] w-full overflow-hidden rounded-[1.75rem] ${product.tone} transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 motion-reduce:transition-none`}
    >
      <Image
        className="absolute inset-0 h-full w-full select-none object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.025] group-hover:opacity-0 motion-reduce:transition-none"
        src={product.image}
        alt={product.imageAlt}
        fill
        sizes="(min-width: 1536px) 22vw, (min-width: 1024px) 31vw, (min-width: 768px) 52vw, 86vw"
        draggable={false}
      />
      {product.hoverImage ? (
        <Image
          className="absolute inset-0 h-full w-full select-none object-cover opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.025] group-hover:opacity-100 motion-reduce:transition-none"
          src={product.hoverImage}
          alt=""
          fill
          sizes="(min-width: 1536px) 22vw, (min-width: 1024px) 31vw, (min-width: 768px) 52vw, 86vw"
          draggable={false}
          aria-hidden="true"
        />
      ) : null}

      <div className="absolute inset-x-5 top-5 z-2 flex items-center justify-between gap-3">
        <span className="rounded-full bg-site-paper px-4 py-2 text-[0.61rem] font-extralight tracking-[0.08em] text-site-ink uppercase">{product.category}</span>
        <span className="rounded-full bg-site-paper/90 px-3 py-2 text-[0.64rem] font-extralight tracking-[0.08em] text-site-ink">{product.index}</span>
      </div>

      <div className="absolute inset-x-5 bottom-5 z-2 flex items-end justify-between gap-5">
        <div>
          <p className="text-[0.64rem] font-light tracking-[0.11em] text-site-copy uppercase">{product.brand}</p>
          <h3 className="mt-1.5 max-w-[14ch] text-[clamp(1.2rem,1.8vw,1.46rem)] leading-[1.02] font-extralight text-site-ink">{product.name}</h3>
        </div>
        <div className="pb-1 text-right text-[0.68rem] leading-[1.5] text-site-copy">
          <span className="block">{product.size}</span>
          <span className="block text-site-ink">{product.price}</span>
        </div>
      </div>
    </article>
  );
}
