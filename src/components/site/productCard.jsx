import Image from "next/image";
import Link from "next/link";

export function ProductCard({ product, variant = "default" }) {
  const isCarousel = variant === "carousel";
  const image = product.image || product.primaryImageUrl || "";
  const hoverImage = product.hoverImage || product.hoverImageUrl || null;
  const category = product.category || product.categoryName || "";
  const size = product.size || product.sizeLabel || "";
  const imageAlt = product.imageAlt || product.fullName || product.name || "";
  const href = product.href || null;
  const imageSizes = isCarousel
    ? "(min-width: 120rem) 20vw, (min-width: 96rem) 22vw, (min-width: 64rem) 27vw, (min-width: 48rem) 54vw, 88vw"
    : "(min-width: 80rem) 28vw, (min-width: 64rem) 34vw, 46vw";
  const labelClassName = isCarousel
    ? "line-clamp-1 max-w-full rounded-full bg-site-paper px-2 py-1 text-[0.52rem] leading-[1.2] font-extralight tracking-[0.055em] text-site-ink uppercase sm:px-3 sm:py-1.5 sm:text-[0.54rem] lg:px-4 lg:py-2 lg:text-[0.61rem]"
    : "line-clamp-2 max-w-full rounded-full bg-site-paper px-2 py-1 text-[0.48rem] leading-[1.25] font-extralight tracking-[0.06em] text-site-ink uppercase sm:px-3 sm:py-1.5 sm:text-[0.55rem] sm:tracking-[0.08em] lg:px-3.5 lg:text-[0.56rem] 2xl:px-4 2xl:py-2 2xl:text-[0.61rem]";
  const brandClassName = isCarousel
    ? "text-[0.49rem] font-light tracking-[0.085em] text-site-copy uppercase sm:text-[0.54rem] lg:text-[0.64rem] lg:tracking-[0.11em]"
    : "text-[0.5rem] font-light tracking-[0.09em] text-site-copy uppercase sm:text-[0.56rem] sm:tracking-[0.1em] lg:text-[0.57rem] 2xl:text-[0.64rem] 2xl:tracking-[0.11em]";
  const titleClassName = isCarousel
    ? "mt-1 line-clamp-3 max-w-[22ch] text-[clamp(0.82rem,3.5vw,1.04rem)] leading-[1.08] font-extralight text-site-ink sm:mt-1.5 sm:text-[clamp(0.86rem,2.1vw,1.06rem)] lg:max-w-[21ch] lg:text-[clamp(0.92rem,1.8vw,1.4rem)] lg:leading-[1.05]"
    : "mt-1 line-clamp-3 max-w-[21ch] text-[clamp(0.86rem,3.6vw,1rem)] leading-[1.08] font-extralight text-site-ink sm:mt-1.5 sm:text-[clamp(0.92rem,2vw,1.05rem)] sm:leading-[1.05] lg:text-[clamp(1rem,1.1vw,1.05rem)] 2xl:text-[clamp(1.12rem,1.25vw,1.4rem)] 2xl:leading-[1.02]";
  const sizeClassName = isCarousel
    ? "pb-0.5 text-right text-[0.5rem] leading-[1.35] text-site-copy sm:text-[0.56rem] lg:pb-1 lg:text-[0.68rem] lg:leading-[1.5]"
    : "pb-0.5 text-right text-[0.52rem] leading-[1.4] text-site-copy sm:pb-1 sm:text-[0.59rem] sm:leading-[1.5] lg:text-[0.6rem] 2xl:text-[0.68rem]";

  const content = (
    <>
      {image ? (
        <Image
          className={`absolute inset-0 h-full w-full select-none object-contain transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${hoverImage ? "group-hover:opacity-0" : ""}`}
          src={image}
          alt={imageAlt}
          fill
          quality={100}
          unoptimized
          sizes={imageSizes}
          draggable={false}
        />
      ) : null}
      {hoverImage ? (
        <Image
          className="absolute inset-0 h-full w-full select-none object-contain opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-100 motion-reduce:transition-none"
          src={hoverImage}
          alt=""
          fill
          quality={100}
          unoptimized
          sizes={imageSizes}
          draggable={false}
          aria-hidden="true"
        />
      ) : null}

      <div className="absolute inset-x-2.5 top-2.5 z-2 flex items-center justify-between gap-2 sm:inset-x-4 sm:top-4 lg:inset-x-5 lg:top-5">
        {category ? (
          <span className={labelClassName}>
            {category}
          </span>
        ) : (
          <span />
        )}
      </div>

      <div className="absolute inset-x-2.5 bottom-2.5 z-2 flex items-end justify-between gap-2 sm:inset-x-4 sm:bottom-4 sm:gap-4 lg:inset-x-5 lg:bottom-5 lg:gap-5">
        <div className="min-w-0 flex-1">
          <p className={brandClassName}>{product.brand}</p>
          <h3 className={titleClassName}>{product.name}</h3>
        </div>
        {size ? (
          <div className={`shrink-0 ${sizeClassName}`}>
            <span className="block">{size}</span>
          </div>
        ) : null}
      </div>
    </>
  );

  const className = "group relative block aspect-[514/719] w-full overflow-hidden rounded-[1.15rem] bg-white sm:rounded-[1.75rem] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 motion-reduce:transition-none";

  if (href) {
    return (
      <Link className={className} href={href}>
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}
