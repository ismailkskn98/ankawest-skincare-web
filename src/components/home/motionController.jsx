"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

import { attachFloatingScrollbar } from "@/lib/site/attachFloatingScrollbar";

const HEADER_SCROLL_THRESHOLD = 70;
const PARALLAX_SCROLL_STRENGTH = 1.32;

const INTRO_TARGETS = [
  "[data-header-reveal]",
  "[data-hero-line]",
  "[data-hero-support]",
  "[data-hero-cta]",
  "[data-page-hero-reveal]",
  "[data-page-hero-media]",
  "[data-page-hero-arrow]",
];

function clearMotionIntroGuard() {
  if (document.documentElement.dataset.motionIntro === "pending") {
    delete document.documentElement.dataset.motionIntro;
  }

  if (document.documentElement.dataset.pageIntro === "pending") {
    delete document.documentElement.dataset.pageIntro;
  }
}

function armPageIntroGuard() {
  try {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.dataset.pageIntro = "pending";
    }
  } catch {
    // matchMedia erişilemezse guard kurulmaz; içerik görünür kalır.
  }
}

export function MotionController() {
  const pathname = usePathname();
  const bootIntroPlayedRef = useRef(false);

  // Soft nav'da pageHero flash olmasın: paint öncesi gizle (header hariç).
  useLayoutEffect(() => {
    armPageIntroGuard();
  }, [pathname]);

  useEffect(() => {
    const root = document.querySelector("[data-site-root]");
    const header = root?.querySelector("[data-header]");
    const video = root?.querySelector("[data-hero-video]");
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = navigator.connection?.saveData === true;

    if (!root) {
      clearMotionIntroGuard();
      return undefined;
    }

    const revealScrollDrawPath = () => {
      const scrollDrawPath = root.querySelector("[data-scroll-draw-path]");

      if (!scrollDrawPath) {
        return;
      }

      scrollDrawPath.style.strokeDasharray = "none";
      scrollDrawPath.style.strokeDashoffset = "0";
    };

    let cancelled = false;
    let animationContext = null;
    let parallaxMediaContext = null;
    let gsapInstance = null;
    let scrollTriggerInstance = null;
    let lenisInstance = null;
    let removeLenisScroll = null;
    let removeLenisMotionScroll = null;
    let removeGsapTicker = null;
    let destroyFloatingScrollbar = null;
    let isHeaderVisible = true;

    const setHeaderTheme = (isScrolled) => {
      if (!header) {
        return;
      }

      header.dataset.scrolled = isScrolled ? "true" : "false";
    };

    const setHeaderVisibility = (isVisible, { animate = true, force = false } = {}) => {
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
          header.style.transform = isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, -125%, 0)";
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

    const handleVideoMetadataLoaded = () => {
      syncVideoPlayback();
      scrollTriggerInstance?.refresh();
    };

    const handleMotionPreferenceChange = () => {
      syncVideoPlayback();

      if (reduceMotionQuery.matches) {
        clearMotionIntroGuard();
        animationContext?.revert();
        animationContext = null;
        revealScrollDrawPath();
      }

      setHeaderVisibility(isHeaderVisible, {
        animate: false,
        force: true,
      });
    };

    video?.addEventListener("loadedmetadata", handleVideoMetadataLoaded, {
      once: true,
    });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reduceMotionQuery.addEventListener("change", handleMotionPreferenceChange);
    syncVideoPlayback();

    async function setupExperience() {
      const shouldLoadMotion = !reduceMotionQuery.matches;
      const shouldLoadParallax = shouldLoadMotion && !saveData;
      const [lenisModule, gsapModule, scrollTriggerModule] = await Promise.all([
        import("lenis"),
        shouldLoadMotion ? import("gsap") : Promise.resolve(null),
        shouldLoadParallax ? import("gsap/ScrollTrigger") : Promise.resolve(null),
      ]);

      if (cancelled) {
        return;
      }

      const Lenis = lenisModule.default;
      gsapInstance = gsapModule?.gsap ?? null;
      scrollTriggerInstance = scrollTriggerModule?.ScrollTrigger ?? null;

      if (gsapInstance && scrollTriggerInstance) {
        gsapInstance.registerPlugin(scrollTriggerInstance);
      }

      lenisInstance = new Lenis({
        anchors: true,
        autoRaf: !gsapInstance,
        duration: 1.05,
        respectReducedMotion: true,
        smoothWheel: !saveData,
        syncTouch: false,
        wheelMultiplier: 0.9,
      });

      if (!window.location.hash) {
        lenisInstance.scrollTo(0, { immediate: true });
      }

      destroyFloatingScrollbar?.();
      destroyFloatingScrollbar = attachFloatingScrollbar({ lenis: lenisInstance });

      if (gsapInstance) {
        const updateLenis = (time) => {
          lenisInstance?.raf(time * 1000);
        };

        gsapInstance.ticker.add(updateLenis);
        gsapInstance.ticker.lagSmoothing(0);
        removeGsapTicker = () => {
          gsapInstance?.ticker.remove(updateLenis);
          gsapInstance?.ticker.lagSmoothing(500, 33);
        };
      }

      if (scrollTriggerInstance) {
        removeLenisMotionScroll = lenisInstance.on("scroll", () => {
          scrollTriggerInstance?.update();
        });
      }

      const initialScroll = lenisInstance.scroll;
      const bootIntroPending = document.documentElement.dataset.motionIntro === "pending";
      const pageIntroPending = document.documentElement.dataset.pageIntro === "pending";
      const shouldRunIntro =
        (bootIntroPending || pageIntroPending) && initialScroll <= HEADER_SCROLL_THRESHOLD && !reduceMotionQuery.matches;
      const shouldAnimateHeader = shouldRunIntro && bootIntroPending && !bootIntroPlayedRef.current;

      setHeaderTheme(initialScroll > HEADER_SCROLL_THRESHOLD);

      if (shouldAnimateHeader && header && gsapInstance) {
        isHeaderVisible = true;
        header.dataset.hidden = "false";
        header.style.pointerEvents = "auto";
        gsapInstance.set(header, {
          yPercent: -115,
          autoAlpha: 0,
        });
      } else {
        setHeaderVisibility(true, {
          animate: false,
          force: true,
        });

        if (!shouldRunIntro) {
          clearMotionIntroGuard();
        }
      }

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
        revealScrollDrawPath();
        clearMotionIntroGuard();
        return;
      }

      if (scrollTriggerInstance && !saveData) {
        const heroParallaxSection = root.querySelector("[data-parallax-section]");
        const scrollParallaxSections = Array.from(root.querySelectorAll("[data-scroll-parallax-section]"));
        const motionGroups = Array.from(root.querySelectorAll("[data-motion-group]"));
        const scrollDrawSection = root.querySelector("[data-scroll-draw-section]");
        const scrollDrawPath = scrollDrawSection?.querySelector("[data-scroll-draw-path]");

        parallaxMediaContext = gsapInstance.matchMedia();
        parallaxMediaContext.add(
          {
            canDraw: "(prefers-reduced-motion: no-preference)",
          },
          (drawContext) => {
            if (!drawContext.conditions.canDraw || !scrollDrawSection || !scrollDrawPath) {
              return undefined;
            }

            const pathLength = Math.ceil(scrollDrawPath.getTotalLength());

            if (!Number.isFinite(pathLength) || pathLength <= 0) {
              return undefined;
            }

            const initialReveal = Number(scrollDrawPath.dataset.scrollDrawInitial) || 0.03;
            const initialOffset = pathLength * (1 - initialReveal);

            gsapInstance.set(scrollDrawPath, {
              strokeDasharray: `${pathLength} ${pathLength}`,
              strokeDashoffset: initialOffset,
            });
            gsapInstance.fromTo(
              scrollDrawPath,
              { strokeDashoffset: initialOffset },
              {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: scrollDrawSection,
                  start: "top 35%",
                  end: "bottom 50%",
                  scrub: 0.55,
                },
              },
            );

            return undefined;
          },
        );
        const setupScrollParallax = (strengthScale, scrubValue, { includeDesktopOnly = true } = {}) => {
          scrollParallaxSections.forEach((section) => {
            if (!includeDesktopOnly && section.dataset.parallaxDesktopOnly === "true") {
              return;
            }

            const layers = Array.from(section.querySelectorAll("[data-scroll-parallax-layer]"));
            const sectionStrength = Number(section.dataset.parallaxStrength) || PARALLAX_SCROLL_STRENGTH;
            const sectionDirection = Number(section.dataset.parallaxDirection) || 1;
            const isCenteredParallax = section.dataset.parallaxCentered === "true";

            if (layers.length === 0) {
              return;
            }

            const getLayerTravel = (layer) => (Number(layer.dataset.parallaxDistance) || 0) * sectionStrength * sectionDirection * strengthScale;

            const scrollTrigger = {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: scrubValue,
              invalidateOnRefresh: true,
            };

            if (isCenteredParallax) {
              gsapInstance.fromTo(
                layers,
                {
                  y: (_, layer) => -getLayerTravel(layer) * 0.56,
                },
                {
                  y: (_, layer) => getLayerTravel(layer) * 0.56,
                  force3D: true,
                  ease: "none",
                  scrollTrigger,
                },
              );

              return;
            }

            gsapInstance.to(layers, {
              y: (_, layer) => getLayerTravel(layer),
              force3D: true,
              ease: "none",
              scrollTrigger,
            });
          });
        };

        parallaxMediaContext.add(
          {
            isDesktop: "(min-width: 64rem)",
            hasFinePointer: "(pointer: fine)",
            reduceMotion: "(prefers-reduced-motion: reduce)",
          },
          (mediaContext) => {
            const { isDesktop, hasFinePointer, reduceMotion } = mediaContext.conditions;

            if (!isDesktop || reduceMotion) {
              return undefined;
            }

            if (heroParallaxSection) {
              const heroScrollLayers = Array.from(heroParallaxSection.querySelectorAll("[data-parallax-scroll]"));

              if (heroScrollLayers.length > 0) {
                gsapInstance.to(heroScrollLayers, {
                  y: (_, layer) => (Number(layer.dataset.parallaxDistance) || 0) * PARALLAX_SCROLL_STRENGTH,
                  force3D: true,
                  ease: "none",
                  scrollTrigger: {
                    trigger: heroParallaxSection,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.8,
                    invalidateOnRefresh: true,
                  },
                });
              }
            }

            setupScrollParallax(1, 0.9);

            motionGroups.forEach((group) => {
              const revealItems = Array.from(group.querySelectorAll("[data-section-reveal]"));

              if (group.matches("[data-section-reveal]")) {
                revealItems.unshift(group);
              }

              if (revealItems.length === 0) {
                return;
              }

              gsapInstance.from(revealItems, {
                y: 26,
                autoAlpha: 0,
                duration: 0.78,
                stagger: 0.065,
                ease: "power3.out",
                clearProps: "transform,opacity,visibility",
                scrollTrigger: {
                  trigger: group,
                  start: "top 78%",
                  once: true,
                },
              });
            });

            const pointerLayers = heroParallaxSection ? Array.from(heroParallaxSection.querySelectorAll("[data-parallax-pointer]")) : [];
            const canUsePointerParallax = hasFinePointer && heroParallaxSection && pointerLayers.length > 0;

            const pointerSetters = canUsePointerParallax
              ? pointerLayers.map((layer) => {
                  const depth = Number(layer.dataset.parallaxDepth) || 0;

                  return {
                    depth,
                    x: gsapInstance.quickTo(layer, "x", {
                      duration: 0.58,
                      ease: "power3.out",
                    }),
                    y: gsapInstance.quickTo(layer, "y", {
                      duration: 0.58,
                      ease: "power3.out",
                    }),
                  };
                })
              : [];

            const resetPointerPosition = () => {
              pointerSetters.forEach((setter) => {
                setter.x(0);
                setter.y(0);
              });
            };

            const handlePointerMove = (event) => {
              const horizontalProgress = event.clientX / window.innerWidth - 0.5;
              const verticalProgress = event.clientY / window.innerHeight - 0.5;

              pointerSetters.forEach((setter) => {
                setter.x(horizontalProgress * setter.depth * 2);
                setter.y(verticalProgress * setter.depth * 1.35);
              });
            };

            const handleParallaxVisibilityChange = () => {
              if (document.hidden) {
                resetPointerPosition();
              }
            };

            if (canUsePointerParallax) {
              heroParallaxSection.addEventListener("pointermove", handlePointerMove, { passive: true });
              heroParallaxSection.addEventListener("pointerleave", resetPointerPosition);
              window.addEventListener("blur", resetPointerPosition);
              document.addEventListener("visibilitychange", handleParallaxVisibilityChange);
            }

            return () => {
              if (canUsePointerParallax) {
                heroParallaxSection.removeEventListener("pointermove", handlePointerMove);
                heroParallaxSection.removeEventListener("pointerleave", resetPointerPosition);
                window.removeEventListener("blur", resetPointerPosition);
                document.removeEventListener("visibilitychange", handleParallaxVisibilityChange);
                gsapInstance.killTweensOf(pointerLayers);
                gsapInstance.set(pointerLayers, { clearProps: "transform" });
              }
            };
          },
        );
        parallaxMediaContext.add(
          {
            isTablet: "(min-width: 48rem) and (max-width: 63.9375rem)",
            reduceMotion: "(prefers-reduced-motion: reduce)",
          },
          (mediaContext) => {
            if (!mediaContext.conditions.isTablet || mediaContext.conditions.reduceMotion) {
              return undefined;
            }

            setupScrollParallax(0.78, 0.82, { includeDesktopOnly: false });

            return undefined;
          },
        );
        parallaxMediaContext.add(
          {
            isMobile: "(max-width: 47.9375rem)",
            reduceMotion: "(prefers-reduced-motion: reduce)",
          },
          (mediaContext) => {
            if (!mediaContext.conditions.isMobile || mediaContext.conditions.reduceMotion) {
              return undefined;
            }

            setupScrollParallax(0.58, 0.74, { includeDesktopOnly: false });

            return undefined;
          },
        );

        scrollTriggerInstance.refresh();
        document.fonts?.ready.then(() => {
          if (!cancelled) {
            scrollTriggerInstance?.refresh();
          }
        });
      } else {
        revealScrollDrawPath();
      }

      animationContext = gsapInstance.context(() => {
        if (!shouldRunIntro) {
          clearMotionIntroGuard();
          return;
        }

        if (shouldAnimateHeader) {
          bootIntroPlayedRef.current = true;
        }

        const timeline = gsapInstance.timeline({
          defaults: {
            ease: "power3.out",
          },
          onComplete: () => {
            clearMotionIntroGuard();
            gsapInstance.set(INTRO_TARGETS, {
              clearProps: "transform,opacity,visibility",
            });
          },
        });

        timeline.fromTo(
          "[data-page-hero-media]",
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 1.15,
            ease: "power2.out",
          },
          0,
        );

        if (shouldAnimateHeader) {
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
            0.08,
          );
        }

        timeline
          .fromTo(
            "[data-hero-line]",
            {
              yPercent: 112,
              autoAlpha: 0,
            },
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 1.05,
              stagger: 0.08,
              ease: "expo.out",
            },
            shouldAnimateHeader ? "-=0.5" : 0.05,
          )
          .fromTo(
            "[data-hero-support]",
            {
              y: 20,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.72,
            },
            "-=0.58",
          )
          .fromTo(
            "[data-hero-cta]",
            {
              y: 18,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.78,
            },
            "-=0.5",
          )
          .fromTo(
            "[data-page-hero-reveal]",
            {
              y: 26,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.78,
              stagger: 0.065,
            },
            "-=1.15",
          )
          .fromTo(
            "[data-page-hero-arrow]",
            {
              autoAlpha: 0,
            },
            {
              autoAlpha: 1,
              duration: 0.95,
              ease: "power2.out",
            },
            "-=0.6",
          );
      }, root);
    }

    setupExperience().catch(() => {
      revealScrollDrawPath();
      clearMotionIntroGuard();
      setHeaderTheme(window.scrollY > HEADER_SCROLL_THRESHOLD);
      setHeaderVisibility(true, {
        animate: false,
        force: true,
      });

      if (!cancelled && !destroyFloatingScrollbar) {
        destroyFloatingScrollbar = attachFloatingScrollbar();
      }
    });

    return () => {
      cancelled = true;
      destroyFloatingScrollbar?.();
      destroyFloatingScrollbar = null;
      removeLenisScroll?.();
      removeLenisMotionScroll?.();
      removeGsapTicker?.();
      lenisInstance?.destroy();
      gsapInstance?.killTweensOf(header);
      parallaxMediaContext?.revert();
      animationContext?.revert();
      video?.removeEventListener("loadedmetadata", handleVideoMetadataLoaded);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reduceMotionQuery.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, [pathname]);

  return null;
}
