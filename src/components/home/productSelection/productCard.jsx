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

      <div className="absolute inset-x-4 top-4 z-2 flex items-center justify-between gap-3 min-[1024px]:inset-x-5 min-[1024px]:top-5">
        <span className="rounded-full bg-site-paper px-3.5 py-1.5 text-[0.58rem] font-extralight tracking-[0.08em] text-site-ink uppercase min-[1024px]:px-4 min-[1024px]:py-2 min-[1024px]:text-[0.61rem]">{product.category}</span>
        <span className="rounded-full bg-site-paper/90 px-2.5 py-1.5 text-[0.6rem] font-extralight tracking-[0.08em] text-site-ink min-[1024px]:px-3 min-[1024px]:py-2 min-[1024px]:text-[0.64rem]">{product.index}</span>
      </div>

      <div className="absolute inset-x-4 bottom-4 z-2 flex items-end justify-between gap-4 min-[1024px]:inset-x-5 min-[1024px]:bottom-5 min-[1024px]:gap-5">
        <div>
          <p className="text-[0.6rem] font-light tracking-[0.11em] text-site-copy uppercase min-[1024px]:text-[0.64rem]">{product.brand}</p>
          <h3 className="mt-1.5 max-w-[14ch] text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.02] font-extralight text-site-ink">{product.name}</h3>
        </div>
        <div className="pb-1 text-right text-[0.64rem] leading-[1.5] text-site-copy min-[1024px]:text-[0.68rem]">
          <span className="block">{product.size}</span>
          <span className="block text-site-ink">{product.price}</span>
        </div>
      </div>
    </article>
  );
}
