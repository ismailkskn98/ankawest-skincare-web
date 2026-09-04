"use client";

import { useEffect, useRef } from "react";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { ProductCard } from "@/components/site/productCard";

export function ProductRail({ products, ariaLabel, reverseAutoplay = false }) {
  const swiperRef = useRef(null);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const connection = navigator.connection;

    const syncAutoplay = () => {
      const swiper = swiperRef.current;

      if (!swiper?.autoplay) return;

      if (reducedMotionQuery.matches || connection?.saveData) {
        swiper.autoplay.stop();
        return;
      }

      swiper.autoplay.start();
    };

    syncAutoplay();
    reducedMotionQuery.addEventListener("change", syncAutoplay);

    return () => {
      reducedMotionQuery.removeEventListener("change", syncAutoplay);
    };
  }, []);

  return (
    <Swiper
      className="mt-8 cursor-grab active:cursor-grabbing min-[901px]:mt-10 min-[1280px]:mt-12"
      style={{
        "--swiper-wrapper-transition-timing-function":
          "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      modules={[Autoplay, A11y]}
      slidesPerView={1.08}
      spaceBetween={12}
      speed={820}
      loop
      grabCursor
      watchSlidesProgress
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        reverseDirection: reverseAutoplay,
      }}
      breakpoints={{
        520: { slidesPerView: 1.28, spaceBetween: 14 },
        768: { slidesPerView: 1.7, spaceBetween: 14 },
        1024: { slidesPerView: 1.75, spaceBetween: 16 },
        1280: { slidesPerView: 1.95, spaceBetween: 18 },
        1536: { slidesPerView: 2.18, spaceBetween: 20 },
      }}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      wrapperTag="ul"
      aria-label={ariaLabel}
      data-section-reveal
    >
      {products.map((product) => (
        <SwiperSlide key={product.name} tag="li" className="h-auto">
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
