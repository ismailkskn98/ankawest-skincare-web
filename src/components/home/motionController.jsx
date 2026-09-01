"use client";

import { useEffect } from "react";

const HEADER_SCROLL_THRESHOLD = 70;

export function MotionController() {
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
    let parallaxMediaContext = null;
    let gsapInstance = null;
    let scrollTriggerInstance = null;
    let lenisInstance = null;
    let removeLenisScroll = null;
    let removeLenisMotionScroll = null;
    let removeGsapTicker = null;
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

    const handleVideoMetadataLoaded = () => {
      syncVideoPlayback();
      scrollTriggerInstance?.refresh();
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
        shouldLoadParallax
          ? import("gsap/ScrollTrigger")
          : Promise.resolve(null),
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

      if (scrollTriggerInstance && !saveData) {
        const heroParallaxSection = root.querySelector(
          "[data-parallax-section]",
        );
        const scrollParallaxSections = Array.from(
          root.querySelectorAll("[data-scroll-parallax-section]"),
        );
        const motionGroups = Array.from(
          root.querySelectorAll("[data-motion-group]"),
        );

        parallaxMediaContext = gsapInstance.matchMedia();
        parallaxMediaContext.add(
          {
            isDesktop: "(min-width: 1024px)",
            hasFinePointer: "(pointer: fine)",
            reduceMotion: "(prefers-reduced-motion: reduce)",
          },
          (mediaContext) => {
            const { isDesktop, hasFinePointer, reduceMotion } =
              mediaContext.conditions;

            if (!isDesktop || reduceMotion) {
              return undefined;
            }

            if (heroParallaxSection) {
              const heroScrollLayers = Array.from(
                heroParallaxSection.querySelectorAll(
                  "[data-parallax-scroll]",
                ),
              );

              if (heroScrollLayers.length > 0) {
                gsapInstance.to(heroScrollLayers, {
                  y: (_, layer) =>
                    Number(layer.dataset.parallaxDistance) || 0,
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

            scrollParallaxSections.forEach((section) => {
              const layers = Array.from(
                section.querySelectorAll("[data-scroll-parallax-layer]"),
              );

              if (layers.length === 0) {
                return;
              }

              gsapInstance.to(layers, {
                y: (_, layer) =>
                  Number(layer.dataset.parallaxDistance) || 0,
                force3D: true,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.9,
                  invalidateOnRefresh: true,
                },
              });
            });

            motionGroups.forEach((group) => {
              const revealItems = Array.from(
                group.querySelectorAll("[data-section-reveal]"),
              );

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

            const pointerLayers = heroParallaxSection
              ? Array.from(
                  heroParallaxSection.querySelectorAll(
                    "[data-parallax-pointer]",
                  ),
                )
              : [];
            const canUsePointerParallax =
              hasFinePointer &&
              heroParallaxSection &&
              pointerLayers.length > 0;

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
              heroParallaxSection.addEventListener(
                "pointermove",
                handlePointerMove,
                { passive: true },
              );
              heroParallaxSection.addEventListener(
                "pointerleave",
                resetPointerPosition,
              );
              window.addEventListener("blur", resetPointerPosition);
              document.addEventListener(
                "visibilitychange",
                handleParallaxVisibilityChange,
              );
            }

            return () => {
              if (canUsePointerParallax) {
                heroParallaxSection.removeEventListener(
                  "pointermove",
                  handlePointerMove,
                );
                heroParallaxSection.removeEventListener(
                  "pointerleave",
                  resetPointerPosition,
                );
                window.removeEventListener("blur", resetPointerPosition);
                document.removeEventListener(
                  "visibilitychange",
                  handleParallaxVisibilityChange,
                );
                gsapInstance.killTweensOf(pointerLayers);
                gsapInstance.set(pointerLayers, { clearProps: "transform" });
              }
            };
          },
        );

        scrollTriggerInstance.refresh();
        document.fonts?.ready.then(() => {
          if (!cancelled) {
            scrollTriggerInstance?.refresh();
          }
        });
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
      removeLenisMotionScroll?.();
      removeGsapTicker?.();
      lenisInstance?.destroy();
      gsapInstance?.killTweensOf(header);
      parallaxMediaContext?.revert();
      animationContext?.revert();
      video?.removeEventListener(
        "loadedmetadata",
        handleVideoMetadataLoaded,
      );
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reduceMotionQuery.removeEventListener(
        "change",
        handleMotionPreferenceChange,
      );
    };
  }, []);

  return null;
}
