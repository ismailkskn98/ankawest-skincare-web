"use client";

import { useEffect } from "react";

const HEADER_SCROLL_THRESHOLD = 70;

export function SiteMotionController() {
  useEffect(() => {
    const root = document.querySelector("[data-site-root]");
    const header = root?.querySelector("[data-header]");
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
    let gsapInstance = null;
    let lenisInstance = null;
    let removeLenisScroll = null;
    let isHeaderVisible = true;

    const setHeaderTheme = (isScrolled) => {
      if (!header) {
        return;
      }

      header.dataset.scrolled = isScrolled ? "true" : "false";
    };

    const setHeaderVisibility = (
      isVisible,
      { animate = true, force = false } = {},
    ) => {
      if (!header || (!force && isHeaderVisible === isVisible)) {
        return;
      }

      isHeaderVisible = isVisible;
      header.dataset.hidden = isVisible ? "false" : "true";

      if (!animate || reduceMotionQuery.matches || !gsapInstance) {
        gsapInstance?.killTweensOf(header);

        if (gsapInstance) {
          gsapInstance.set(header, {
            yPercent: isVisible ? 0 : -125,
            autoAlpha: isVisible ? 1 : 0,
          });
        } else {
          header.style.transform = isVisible
            ? "translate3d(0, 0, 0)"
            : "translate3d(0, -125%, 0)";
          header.style.opacity = isVisible ? "1" : "0";
          header.style.visibility = isVisible ? "visible" : "hidden";
        }

        header.style.pointerEvents = isVisible ? "auto" : "none";
        return;
      }

      gsapInstance.killTweensOf(header);

      if (isVisible) {
        header.style.pointerEvents = "auto";
      }

      gsapInstance.to(header, {
        yPercent: isVisible ? 0 : -125,
        autoAlpha: isVisible ? 1 : 0,
        duration: isVisible ? 0.56 : 0.42,
        ease: isVisible ? "power3.out" : "power2.in",
        overwrite: true,
        onComplete: () => {
          if (!isVisible) {
            header.style.pointerEvents = "none";
          }
        },
      });
    };

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
      if (document.hidden) {
        video?.pause();
        lenisInstance?.stop();
        return;
      }

      lenisInstance?.start();

      if (!video) {
        return;
      }

      if (reduceMotionQuery.matches || saveData) {
        pauseAtStart();
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

      setHeaderVisibility(isHeaderVisible, {
        animate: false,
        force: true,
      });
    };

    video?.addEventListener("loadedmetadata", syncVideoPlayback, { once: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reduceMotionQuery.addEventListener("change", handleMotionPreferenceChange);
    syncVideoPlayback();

    async function setupExperience() {
      const [lenisModule, gsapModule] = await Promise.all([
        import("lenis"),
        reduceMotionQuery.matches ? Promise.resolve(null) : import("gsap"),
      ]);

      if (cancelled) {
        return;
      }

      const Lenis = lenisModule.default;
      gsapInstance = gsapModule?.gsap ?? null;
      lenisInstance = new Lenis({
        anchors: true,
        autoRaf: true,
        duration: 1.05,
        respectReducedMotion: true,
        smoothWheel: !saveData,
        syncTouch: false,
        wheelMultiplier: 0.9,
      });

      const initialScroll = lenisInstance.scroll;
      setHeaderTheme(initialScroll > HEADER_SCROLL_THRESHOLD);
      setHeaderVisibility(true, {
        animate: false,
        force: true,
      });

      removeLenisScroll = lenisInstance.on("scroll", (lenis) => {
        const isAtTop = lenis.scroll <= HEADER_SCROLL_THRESHOLD;

        setHeaderTheme(!isAtTop);

        if (isAtTop) {
          setHeaderVisibility(true);
          return;
        }

        if (Math.abs(lenis.velocity) < 0.05) {
          return;
        }

        if (lenis.direction > 0) {
          setHeaderVisibility(false);
        } else if (lenis.direction < 0) {
          setHeaderVisibility(true);
        }
      });

      syncVideoPlayback();

      if (!gsapInstance || reduceMotionQuery.matches) {
        return;
      }

      animationContext = gsapInstance.context(() => {
        const timeline = gsapInstance.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        if (initialScroll <= HEADER_SCROLL_THRESHOLD) {
          timeline.fromTo(
            "[data-header-reveal]",
            {
              yPercent: -115,
              autoAlpha: 0,
            },
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 0.82,
            },
          );
        }

        timeline
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
            initialScroll <= HEADER_SCROLL_THRESHOLD ? "-=0.5" : 0,
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

    setupExperience().catch(() => {
      setHeaderTheme(window.scrollY > HEADER_SCROLL_THRESHOLD);
      setHeaderVisibility(true, {
        animate: false,
        force: true,
      });
    });

    return () => {
      cancelled = true;
      removeLenisScroll?.();
      lenisInstance?.destroy();
      gsapInstance?.killTweensOf(header);
      animationContext?.revert();
      video?.removeEventListener("loadedmetadata", syncVideoPlayback);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reduceMotionQuery.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, []);

  return null;
}
