"use client";

import { useEffect } from "react";

export function SiteMotionController() {
  useEffect(() => {
    const root = document.querySelector("[data-site-root]");
    const video = root?.querySelector("[data-hero-video]");
    const reduceMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const saveData = navigator.connection?.saveData === true;

    if (!root) {
      return undefined;
    }

    let cancelled = false;
    let animationContext = null;

    const pauseAtStart = () => {
      if (!video) {
        return;
      }

      video.pause();

      if (video.readyState >= 1) {
        video.currentTime = 0;
      }
    };

    const syncVideoPlayback = () => {
      if (!video) {
        return;
      }

      if (reduceMotionQuery.matches || saveData) {
        pauseAtStart();
        return;
      }

      if (document.hidden) {
        video.pause();
        return;
      }

      video.play().catch(() => {
        // Autoplay engellenirse statik video karesi tasarımı tamamlamaya devam eder.
      });
    };

    const handleVisibilityChange = () => {
      syncVideoPlayback();
    };

    const handleMotionPreferenceChange = () => {
      syncVideoPlayback();

      if (reduceMotionQuery.matches) {
        animationContext?.revert();
        animationContext = null;
      }
    };

    video?.addEventListener("loadedmetadata", syncVideoPlayback, { once: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reduceMotionQuery.addEventListener("change", handleMotionPreferenceChange);
    syncVideoPlayback();

    async function setupExperience() {
      if (reduceMotionQuery.matches) {
        return;
      }

      const { gsap } = await import("gsap");

      if (cancelled || reduceMotionQuery.matches) {
        return;
      }

      animationContext = gsap.context(() => {
        const timeline = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        timeline
          .from("[data-header-reveal]", {
            y: -18,
            autoAlpha: 0,
            duration: 0.82,
            clearProps: "transform,opacity,visibility",
          })
          .from(
            "[data-hero-line]",
            {
              yPercent: 112,
              autoAlpha: 0,
              duration: 1.05,
              stagger: 0.08,
              ease: "expo.out",
              clearProps: "transform,opacity,visibility",
            },
            "-=0.5",
          )
          .from(
            "[data-hero-support]",
            {
              y: 20,
              autoAlpha: 0,
              duration: 0.72,
              clearProps: "transform,opacity,visibility",
            },
            "-=0.58",
          )
          .from(
            "[data-hero-cta]",
            {
              y: 18,
              autoAlpha: 0,
              duration: 0.78,
              clearProps: "transform,opacity,visibility",
            },
            "-=0.5",
          );
      }, root);
    }

    setupExperience();

    return () => {
      cancelled = true;
      animationContext?.revert();
      video?.removeEventListener("loadedmetadata", syncVideoPlayback);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reduceMotionQuery.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, []);

  return null;
}
