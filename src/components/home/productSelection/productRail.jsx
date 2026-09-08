"use client";

import { useEffect, useRef, useState } from "react";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { ProductCard } from "@/components/site/productCard";

const SLIDE_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function syncSlideMotion(swiper, enabled) {
  swiper.slides.forEach((slideEl) => {
    const card = slideEl.querySelector("[data-product-card-reveal]");

    if (!card) {
      return;
    }

    if (!enabled) {
      card.style.opacity = "";
      card.style.transform = "";
      return;
    }

    const progress = Number(slideEl.progress) || 0;
    const clamped = Math.max(-1, Math.min(1, progress));

    card.style.opacity = String(1 - Math.abs(clamped) * 0.14);
    card.style.transform = `translateX(${clamped * -10}px) rotate(${clamped * -1.15}deg)`;
  });
}

export function ProductRail({
  products,
  ariaLabel,
  reverseAutoplay = false,
  revealDirection = "right",
}) {
  const swiperRef = useRef(null);
  const railRef = useRef(null);
  const revealDoneRef = useRef(false);
  const [swiperReady, setSwiperReady] = useState(false);

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
    const rail = railRef.current;
    let context;
    let cancelled = false;

    revealDoneRef.current = false;

    if (!swiperReady || !rail) {
      return undefined;
    }

    if (prefersReducedMotion()) {
      revealDoneRef.current = true;
      return undefined;
    }

    async function setupReveal() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled || !railRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const cards = Array.from(
        railRef.current.querySelectorAll("[data-product-card-reveal]"),
      );
      const fromLeft = revealDirection === "left";

      context = gsap.context(() => {
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
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: railRef.current,
              start: "top 82%",
              once: true,
            },
            onComplete: () => {
              revealDoneRef.current = true;

              if (swiperRef.current && !prefersReducedMotion()) {
                syncSlideMotion(swiperRef.current, true);
              }
            },
          },
        );
      }, railRef.current);
    }

    setupReveal();

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [products, revealDirection, swiperReady]);

  return (
    <div ref={railRef} className="mt-8 nav:mt-10 xl:mt-12">
      <Swiper
        className="cursor-grab active:cursor-grabbing"
        style={{
          "--swiper-wrapper-transition-timing-function": SLIDE_EASE,
        }}
        modules={[Autoplay, A11y]}
        slidesPerView={1.08}
        spaceBetween={12}
        speed={1100}
        loop
        grabCursor
        watchSlidesProgress
        autoplay={{
          delay: 3200,
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
          setSwiperReady(true);
        }}
        onProgress={(swiper) => {
          if (!revealDoneRef.current || prefersReducedMotion()) {
            return;
          }

          syncSlideMotion(swiper, true);
        }}
        onSetTransition={(swiper, duration) => {
          swiper.slides.forEach((slideEl) => {
            const card = slideEl.querySelector("[data-product-card-reveal]");

            if (!card) {
              return;
            }

            card.style.transitionProperty = "transform, opacity";
            card.style.transitionDuration = `${duration}ms`;
            card.style.transitionTimingFunction = SLIDE_EASE;
          });
        }}
        wrapperTag="ul"
        aria-label={ariaLabel}
      >
        {products.map((product) => (
          <SwiperSlide key={product.name} tag="li" className="!h-auto">
            <div data-product-card-reveal className="h-full will-change-transform">
              <ProductCard product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
