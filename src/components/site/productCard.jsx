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
          sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 34vw, 46vw"
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
          sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 34vw, 46vw"
          draggable={false}
          aria-hidden="true"
        />
      ) : null}

      <div className="absolute inset-x-2.5 top-2.5 z-2 flex items-center justify-between gap-2 min-[640px]:inset-x-4 min-[640px]:top-4 min-[1024px]:inset-x-5 min-[1024px]:top-5">
        {category ? (
          <span className="line-clamp-2 max-w-full rounded-full bg-site-paper px-2 py-1 text-[0.48rem] leading-[1.25] font-extralight tracking-[0.06em] text-site-ink uppercase min-[640px]:px-3.5 min-[640px]:py-1.5 min-[640px]:text-[0.58rem] min-[640px]:tracking-[0.08em] min-[1024px]:px-4 min-[1024px]:py-2 min-[1024px]:text-[0.61rem]">
            {category}
          </span>
        ) : (
          <span />
        )}
      </div>

      <div className="absolute inset-x-2.5 bottom-2.5 z-2 flex items-end justify-between gap-2 min-[640px]:inset-x-4 min-[640px]:bottom-4 min-[640px]:gap-4 min-[1024px]:inset-x-5 min-[1024px]:bottom-5 min-[1024px]:gap-5">
        <div>
          <p className="text-[0.52rem] font-light tracking-[0.09em] text-site-copy uppercase min-[640px]:text-[0.6rem] min-[640px]:tracking-[0.11em] min-[1024px]:text-[0.64rem]">{product.brand}</p>
          <h3 className="mt-1 max-w-[14ch] text-[clamp(0.92rem,2.8vw,1.4rem)] leading-[1.05] font-extralight text-site-ink min-[640px]:mt-1.5 min-[640px]:leading-[1.02]">{product.name}</h3>
        </div>
        {size ? (
          <div className="pb-0.5 text-right text-[0.56rem] leading-[1.4] text-site-copy min-[640px]:pb-1 min-[640px]:text-[0.64rem] min-[640px]:leading-[1.5] min-[1024px]:text-[0.68rem]">
            <span className="block">{size}</span>
          </div>
        ) : null}
      </div>
    </>
  );

  const className = `group relative block aspect-[514/719] w-full overflow-hidden rounded-[1.15rem] min-[640px]:rounded-[1.75rem] ${tone} transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 motion-reduce:transition-none`;

  if (href) {
    return (
      <Link className={className} href={href}>
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}
