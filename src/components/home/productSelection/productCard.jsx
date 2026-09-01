import Image from "next/image";

export function ProductCard({ product }) {
  return (
    <li className="w-[min(82vw,320px)] shrink-0 snap-start min-[768px]:w-[310px]">
      <article
        className="group h-full rounded-[2rem] bg-black/[0.035] p-1.5 ring-1 ring-black/[0.04] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1.5 motion-reduce:transition-none"
        data-section-reveal
      >
        <div className={`flex min-h-[510px] h-full flex-col overflow-hidden rounded-[calc(2rem-0.375rem)] ${product.tone} px-5 pt-5 pb-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.68)]`}>
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-site-paper px-4 py-2 text-[0.62rem] font-semibold tracking-[0.08em] text-site-ink uppercase">
              {product.category}
            </span>
            <span className="text-[0.65rem] font-semibold tracking-[0.08em] text-site-copy">
              {product.index}
            </span>
          </div>

          <div className="relative grid min-h-[330px] grow place-items-center py-7">
            <div
              className="absolute top-1/2 left-1/2 h-[54%] w-[42%] -translate-x-1/2 -translate-y-[38%] rounded-full bg-[#26312e]/10 blur-[1px]"
              aria-hidden="true"
            />
            <Image
              className={`relative z-1 h-auto select-none object-contain drop-shadow-[0_28px_24px_rgba(30,37,34,0.17)] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-2 group-hover:scale-[1.025] motion-reduce:transition-none ${product.imageClassName}`}
              src={product.image}
              alt={product.imageAlt}
              width={product.width}
              height={product.height}
              sizes="310px"
              draggable={false}
            />
          </div>

          <div className="mt-auto flex items-end justify-between gap-5">
            <div>
              <p className="text-[0.68rem] font-semibold tracking-[0.11em] text-site-copy uppercase">
                GLUTANEX
              </p>
              <h3 className="mt-2 max-w-[13ch] text-[1.45rem] leading-[1.02] font-normal tracking-[-0.045em] text-site-ink">
                {product.name}
              </h3>
            </div>
            <span className="pb-1 text-[0.7rem] text-site-copy">{product.size}</span>
          </div>
        </div>
      </article>
    </li>
  );
}
