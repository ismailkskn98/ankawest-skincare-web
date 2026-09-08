"use client";

import { useEffect, useRef } from "react";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { ProductCard } from "@/components/site/productCard";

export function ProductRail({
  products,
  ariaLabel,
  reverseAutoplay = false,
  revealDirection = "right",
}) {
  const swiperRef = useRef(null);
  const railRef = useRef(null);
  const revealContextRef = useRef(null);
  const revealDirectionRef = useRef(revealDirection);
  const cancelledRef = useRef(false);

  revealDirectionRef.current = revealDirection;

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const connection = navigator.connection;

    const syncAutoplay = () => {
      const swiper = swiperRef.current;

      if (!swiper?.autoplay) {
        return;
      }

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

  useEffect(() => {
    cancelledRef.current = false;
    revealContextRef.current?.revert();
    revealContextRef.current = null;

    return () => {
      cancelledRef.current = true;
      revealContextRef.current?.revert();
      revealContextRef.current = null;
    };
  }, [products, revealDirection]);

  const startReveal = () => {
    if (
      cancelledRef.current ||
      revealContextRef.current ||
      !railRef.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelledRef.current || !railRef.current || revealContextRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const cards = Array.from(
        railRef.current.querySelectorAll("[data-product-card-reveal]"),
      ).filter((card) => !card.closest(".swiper-slide-duplicate"));

      if (cards.length === 0) {
        return;
      }

      const fromLeft = revealDirectionRef.current === "left";

      revealContextRef.current = gsap.context(() => {
        gsap.fromTo(
          cards,
          {
            autoAlpha: 0,
            x: fromLeft ? -34 : 34,
            rotate: fromLeft ? -1.4 : 1.4,
          },
          {
            autoAlpha: 1,
            x: 0,
            rotate: 0,
            duration: 0.72,
            stagger: 0.055,
            ease: "power3.out",
            force3D: true,
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: railRef.current,
              start: "top 82%",
              once: true,
            },
          },
        );
      }, railRef.current);
    })();
  };

  return (
    <div ref={railRef} className="mt-8 nav:mt-10 xl:mt-12">
      <Swiper
        className="cursor-grab active:cursor-grabbing"
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
          startReveal();
        }}
        wrapperTag="ul"
        aria-label={ariaLabel}
      >
        {products.map((product) => (
          <SwiperSlide key={product.name} tag="li" className="h-auto">
            <div data-product-card-reveal className="h-full">
              <ProductCard product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
