"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { Dialog } from "radix-ui";
import { A11y, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function getMediaKey(media, index) {
  return String(media.key || media.externalId || media.id || `${media.type}-${media.url}-${index}`);
}

function ProductMedia({
  media,
  productName,
  posterUrl,
  priority = false,
  sizes,
  onError,
}) {
  if (media.type === "video") {
    return (
      <video
        className="h-full w-full object-contain"
        src={media.url}
        poster={posterUrl || undefined}
        controls
        playsInline
        preload="metadata"
        onError={onError}
        aria-label={`${productName} ürün videosu`}
      />
    );
  }

  return (
    <Image
      className="object-contain"
      src={media.url}
      alt={media.altText || `${productName} ürün görseli`}
      fill
      sizes={sizes}
      priority={priority}
      onError={onError}
    />
  );
}

export function ProductMediaGallery({ mediaItems, productName }) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [failedMedia, setFailedMedia] = useState(() => new Set());
  const media = useMemo(
    () => mediaItems.filter((item, index) => !failedMedia.has(getMediaKey(item, index))),
    [failedMedia, mediaItems],
  );
  const currentIndex = Math.min(activeIndex, Math.max(media.length - 1, 0));
  const currentLightboxIndex = lightboxIndex === null
    ? null
    : Math.min(lightboxIndex, Math.max(media.length - 1, 0));
  const lightboxMedia = currentLightboxIndex === null
    ? null
    : media[currentLightboxIndex];
  const posterUrl = media.find((item) => item.type === "image")?.url || "";

  if (media.length === 0) {
    return (
      <div className="grid min-h-[clamp(20rem,56svh,42rem)] place-items-center px-8 text-center">
        <div>
          <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-site-copy uppercase">{productName}</p>
          <p className="font-sentient mt-3 text-[clamp(1.6rem,3vw,2.7rem)] font-light text-site-ink">Ürün görseli hazırlanıyor</p>
        </div>
      </div>
    );
  }

  const goToMedia = (index) => {
    const nextIndex = Math.max(0, Math.min(index, media.length - 1));
    swiperRef.current?.slideTo(nextIndex);
    setActiveIndex(nextIndex);
  };

  const hideFailedMedia = (key) => {
    setFailedMedia((current) => new Set(current).add(key));
    setActiveIndex((current) => Math.min(current, Math.max(media.length - 2, 0)));
  };

  const changeLightboxMedia = (direction) => {
    setLightboxIndex((index) => {
      const current = index ?? 0;
      return (current + direction + media.length) % media.length;
    });
  };

  return (
    <div className="relative flex min-h-[clamp(22rem,60svh,46rem)] w-full flex-col px-[clamp(1rem,3vw,2.5rem)] pb-[clamp(1.25rem,3vh,2rem)]">
      <div className="relative min-h-0 flex-1">
        <Swiper
          className="h-full min-h-[clamp(17rem,48svh,38rem)] w-full"
          modules={[A11y, Keyboard]}
          slidesPerView={1}
          spaceBetween={16}
          speed={520}
          keyboard={{ enabled: true, onlyInViewport: true }}
          a11y={{ enabled: true }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {media.map((item, index) => {
            const key = getMediaKey(item, index);

            return (
              <SwiperSlide className="h-auto" key={key}>
                <div className="relative mx-auto h-full min-h-[clamp(17rem,48svh,38rem)] w-full max-w-[min(92%,42rem)]">
                  {item.type === "image" ? (
                    <button
                      className="group absolute inset-0 cursor-zoom-in"
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      aria-label={`${productName} görselini büyüt`}
                    >
                      <ProductMedia
                        media={item}
                        productName={productName}
                        posterUrl={posterUrl}
                        priority={index === 0}
                        sizes="(min-width: 64rem) 50vw, 92vw"
                        onError={() => hideFailedMedia(key)}
                      />
                      <span className="absolute right-3 bottom-3 rounded-full bg-site-paper/90 px-4 py-2 text-[0.62rem] font-semibold tracking-[0.1em] text-site-ink uppercase shadow-sm backdrop-blur transition-transform group-hover:-translate-y-0.5">
                        Büyüt
                      </span>
                    </button>
                  ) : (
                    <ProductMedia
                      media={item}
                      productName={productName}
                      posterUrl={posterUrl}
                      sizes="(min-width: 64rem) 50vw, 92vw"
                      onError={() => hideFailedMedia(key)}
                    />
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {media.length > 1 ? (
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-between">
            <button
              className="pointer-events-auto grid size-11 place-items-center rounded-full border border-site-ink/10 bg-site-paper/90 text-lg text-site-ink shadow-sm backdrop-blur transition-transform hover:scale-105 disabled:cursor-default disabled:opacity-30"
              type="button"
              onClick={() => goToMedia(currentIndex - 1)}
              disabled={currentIndex === 0}
              aria-label="Önceki medya"
            >
              ←
            </button>
            <button
              className="pointer-events-auto grid size-11 place-items-center rounded-full border border-site-ink/10 bg-site-paper/90 text-lg text-site-ink shadow-sm backdrop-blur transition-transform hover:scale-105 disabled:cursor-default disabled:opacity-30"
              type="button"
              onClick={() => goToMedia(currentIndex + 1)}
              disabled={currentIndex === media.length - 1}
              aria-label="Sonraki medya"
            >
              →
            </button>
          </div>
        ) : null}
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="product-media-scroll flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1" aria-label="Ürün medya küçük görselleri">
          {media.map((item, index) => {
            const key = getMediaKey(item, index);

            return (
              <button
                className={`relative size-[clamp(3.5rem,5vw,4.5rem)] shrink-0 overflow-hidden rounded-xl border bg-white transition-[border-color,opacity] ${index === currentIndex ? "border-site-ink opacity-100" : "border-site-ink/10 opacity-60 hover:opacity-100"}`}
                type="button"
                key={key}
                onClick={() => goToMedia(index)}
                aria-label={`${index + 1}. medyayı göster`}
                aria-current={index === currentIndex ? "true" : undefined}
              >
                {item.type === "video" ? (
                  <span className="grid h-full place-items-center px-1 text-[0.55rem] font-semibold tracking-[0.08em] text-site-ink uppercase">Video</span>
                ) : (
                  <ProductMedia
                    media={item}
                    productName={productName}
                    posterUrl={posterUrl}
                    sizes="72px"
                    onError={() => hideFailedMedia(key)}
                  />
                )}
              </button>
            );
          })}
        </div>
        <p className="shrink-0 text-[0.68rem] tracking-[0.08em] text-site-copy tabular-nums">
          {String(currentIndex + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}
        </p>
      </div>

      <Dialog.Root
        open={lightboxIndex !== null}
        onOpenChange={(open) => {
          if (!open) setLightboxIndex(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/82 backdrop-blur-sm" />
          <Dialog.Content className="fixed inset-[clamp(0.75rem,2vw,1.5rem)] z-[101] grid place-items-center overflow-hidden rounded-[clamp(1rem,2vw,1.75rem)] bg-[#111] p-[clamp(1rem,3vw,3rem)] text-white shadow-2xl focus:outline-none">
            <Dialog.Title className="sr-only">{productName} medya önizlemesi</Dialog.Title>
            <Dialog.Description className="sr-only">Büyütülmüş ürün görseli veya videosu.</Dialog.Description>

            {lightboxMedia ? (
              <div className="relative h-full max-h-[calc(100svh-3rem)] w-full max-w-[90rem]">
                <ProductMedia
                  media={lightboxMedia}
                  productName={productName}
                  posterUrl={posterUrl}
                  sizes="100vw"
                  onError={() => hideFailedMedia(getMediaKey(lightboxMedia, currentLightboxIndex))}
                />
              </div>
            ) : null}

            <Dialog.Close className="absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-white/12 text-2xl text-white backdrop-blur transition-colors hover:bg-white/20" aria-label="Önizlemeyi kapat">
              ×
            </Dialog.Close>

            {media.length > 1 ? (
              <>
                <button
                  className="absolute top-1/2 left-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/12 text-xl text-white backdrop-blur transition-colors hover:bg-white/20"
                  type="button"
                  onClick={() => changeLightboxMedia(-1)}
                  aria-label="Önceki medya"
                >
                  ←
                </button>
                <button
                  className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/12 text-xl text-white backdrop-blur transition-colors hover:bg-white/20"
                  type="button"
                  onClick={() => changeLightboxMedia(1)}
                  aria-label="Sonraki medya"
                >
                  →
                </button>
              </>
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
