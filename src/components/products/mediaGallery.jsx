/* eslint-disable @next/next/no-img-element -- Trendyol medya alan adları dinamik olduğu için native lazy image kullanılır. */

function getMediaUrl(media) {
  return media?.url || media?.imageUrl || "";
}

export function ProductMediaGallery({ product }) {
  const media = (Array.isArray(product.media) ? product.media : [])
    .filter((item) => item?.source === "trendyol")
    .filter((item) => item.type !== "video" || item.isApproved === true)
    .filter((item) => getMediaUrl(item));

  if (media.length === 0) {
    return null;
  }

  return (
    <section
      className="gridContainer bg-site-paper py-[clamp(4rem,8vw,7rem)]"
      aria-labelledby="product-media-title"
    >
      <div>
        <div className="flex items-end justify-between gap-6" data-section-reveal>
          <div>
            <p className="text-[0.66rem] font-semibold tracking-[0.12em] text-site-copy uppercase">
              Ürün detayları
            </p>
            <h2
              id="product-media-title"
              className="font-sentient mt-3 text-[clamp(2.15rem,3vw,3.15rem)] leading-[1.12] font-light tracking-[-0.035em] text-site-ink"
            >
              Detay galerisi
            </h2>
          </div>
        </div>

        <ul className="mt-8 flex snap-x snap-mandatory gap-[clamp(0.75rem,2vw,1.5rem)] overflow-x-auto pb-4">
          {media.map((item, index) => {
            const url = getMediaUrl(item);
            const key = item.externalId || item.id || `${item.type}-${index}`;

            return (
              <li
                className="relative aspect-[4/5] w-[min(82vw,28rem)] shrink-0 snap-start overflow-hidden rounded-[clamp(1rem,2vw,1.75rem)] bg-[#f2f2ef] sm:w-[min(56vw,30rem)] lg:w-[min(34vw,32rem)]"
                key={key}
              >
                {item.type === "video" ? (
                  <video
                    className="h-full w-full object-contain"
                    src={url}
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={`${product.fullName || product.name} ürün videosu`}
                  />
                ) : (
                  <img
                    className="h-full w-full object-contain"
                    src={url}
                    alt={item.altText || `${product.fullName || product.name} detay görseli`}
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
