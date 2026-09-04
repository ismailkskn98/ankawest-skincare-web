import Image from "next/image";
import Link from "next/link";

export function ProductCard({ product }) {
  const image = product.image || product.primaryImageUrl || "";
  const hoverImage = product.hoverImage || product.hoverImageUrl || null;
  const category = product.category || product.categoryName || "";
  const size = product.size || product.sizeLabel || "";
  const imageAlt = product.imageAlt || product.fullName || product.name || "";
  const tone = product.tone || "bg-[#dbe5e9]";
  const href = product.href || null;

  const content = (
    <>
      {image ? (
        <Image
          className="absolute inset-0 h-full w-full select-none object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.025] group-hover:opacity-0 motion-reduce:transition-none"
          src={image}
          alt={imageAlt}
          fill
          quality={100}
          unoptimized
          sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 34vw, (min-width: 640px) 46vw, 92vw"
          draggable={false}
        />
      ) : null}
      {hoverImage ? (
        <Image
          className="absolute inset-0 h-full w-full select-none object-cover opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.025] group-hover:opacity-100 motion-reduce:transition-none"
          src={hoverImage}
          alt=""
          fill
          quality={100}
          unoptimized
          sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 34vw, (min-width: 640px) 46vw, 92vw"
          draggable={false}
          aria-hidden="true"
        />
      ) : null}

      <div className="absolute inset-x-4 top-4 z-2 flex items-center justify-between gap-3 min-[1024px]:inset-x-5 min-[1024px]:top-5">
        {category ? (
          <span className="rounded-full bg-site-paper px-3.5 py-1.5 text-[0.58rem] font-extralight tracking-[0.08em] text-site-ink uppercase min-[1024px]:px-4 min-[1024px]:py-2 min-[1024px]:text-[0.61rem]">
            {category}
          </span>
        ) : (
          <span />
        )}
      </div>

      <div className="absolute inset-x-4 bottom-4 z-2 flex items-end justify-between gap-4 min-[1024px]:inset-x-5 min-[1024px]:bottom-5 min-[1024px]:gap-5">
        <div>
          <p className="text-[0.6rem] font-light tracking-[0.11em] text-site-copy uppercase min-[1024px]:text-[0.64rem]">{product.brand}</p>
          <h3 className="mt-1.5 max-w-[14ch] text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.02] font-extralight text-site-ink">{product.name}</h3>
        </div>
        {size ? (
          <div className="pb-1 text-right text-[0.64rem] leading-[1.5] text-site-copy min-[1024px]:text-[0.68rem]">
            <span className="block">{size}</span>
          </div>
        ) : null}
      </div>
    </>
  );

  const className = `group relative block aspect-[514/719] w-full overflow-hidden rounded-[1.75rem] ${tone} transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 motion-reduce:transition-none`;

  if (href) {
    return (
      <Link className={className} href={href}>
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}
