"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

import { PAGE_MOTION_READY_EVENT } from "@/components/site/pageMotionReady";
import { attachFloatingScrollbar } from "@/lib/site/attachFloatingScrollbar";

const HEADER_SCROLL_THRESHOLD = 70;
const PARALLAX_SCROLL_STRENGTH = 1.32;
const INTRO_ANIMATION_PREFIX = "site-";
const INTRO_WAIT_LIMIT_MS = 4000;
const INTRO_SAFETY_MS = 8000;

let motionLibsPromise = null;

function loadMotionLibs() {
  if (!motionLibsPromise) {
    motionLibsPromise = Promise.all([
      import("lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([lenisModule, gsapModule, scrollTriggerModule]) => {
      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      return {
        Lenis: lenisModule.default,
        gsap,
        ScrollTrigger,
      };
    });
  }

  return motionLibsPromise;
}

function prefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

function isIntroPending() {
  const { motionIntro, pageIntro } = document.documentElement.dataset;

  return motionIntro === "pending" || pageIntro === "pending";
}

function clearIntroGuards() {
  delete document.documentElement.dataset.motionIntro;
  delete document.documentElement.dataset.pageIntro;
}

function getRunningIntroAnimations(root) {
  if (typeof root.getAnimations !== "function") {
    return [];
  }

  return root
    .getAnimations({ subtree: true })
    .filter(
      (animation) =>
        typeof animation.animationName === "string" &&
        animation.animationName.startsWith(INTRO_ANIMATION_PREFIX) &&
        animation.playState !== "finished",
    );
}

export function MotionController() {
  const pathname = usePathname();
  const lastArmedPathRef = useRef(pathname);

  // Soft nav: yeni sayfa ilk paint'te CSS intro ile gelir. İlk yükleme head script'teki
  // data-motion-intro ile zaten hazır; StrictMode tekrarına karşı pathname karşılaştırılır.
  useLayoutEffect(() => {
    if (lastArmedPathRef.current === pathname) {
      return undefined;
    }

    lastArmedPathRef.current = pathname;

    if (prefersReducedMotion()) {
      return undefined;
    }

    document.documentElement.dataset.pageIntro = "pending";

    // PageMotionReady hiç gelmezse (beklenmedik sayfa) içerik kilitli kalmasın.
    const safetyTimer = window.setTimeout(() => {
      if (document.documentElement.dataset.pageIntro === "pending") {
        delete document.documentElement.dataset.pageIntro;
      }
    }, INTRO_SAFETY_MS);

    return () => window.clearTimeout(safetyTimer);
  }, [pathname]);

  // Lenis + header bir kez kurulur; sayfa scroll animasyonları her route'ta yeniden bağlanır.
  useEffect(() => {
    const root = document.querySelector("[data-site-root]");
    const header = root?.querySelector("[data-header]");
    const mainElement = root?.querySelector("main");
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = navigator.connection?.saveData === true;

    if (!root) {
      clearIntroGuards();
      return undefined;
    }

    let cancelled = false;
    let pageEpoch = 0;
    let activePageMarker = null;
    let activePageKey = null;
    let parallaxMediaContext = null;
    let resizeObserver = null;
    let refreshFrame = 0;
    let gsapInstance = null;
    let scrollTriggerInstance = null;
    let lenisInstance = null;
    let removeLenisScroll = null;
    let removeLenisMotionScroll = null;
    let removeGsapTicker = null;
    let destroyFloatingScrollbar = null;
    let isHeaderVisible = true;
    let activeVideo = null;

    const bootSafetyTimer = window.setTimeout(() => {
      if (!cancelled && document.documentElement.dataset.motionIntro === "pending") {
        delete document.documentElement.dataset.motionIntro;
      }
    }, INTRO_SAFETY_MS);

    const revealScrollDrawPath = () => {
      const scrollDrawPath = root.querySelector("[data-scroll-draw-path]");

      if (!scrollDrawPath) {
        return;
      }

      scrollDrawPath.style.strokeDasharray = "none";
      scrollDrawPath.style.strokeDashoffset = "0";
    };

    const resetHeaderStyles = () => {
      if (!header) {
        return;
      }

      gsapInstance?.killTweensOf(header);

      if (gsapInstance) {
        gsapInstance.set(header, { clearProps: "transform,opacity,visibility" });
      } else {
        header.style.transform = "";
        header.style.opacity = "";
        header.style.visibility = "";
      }

      header.style.pointerEvents = "auto";
      header.dataset.hidden = "false";
      isHeaderVisible = true;
    };

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

      // Intro sürerken CSS animasyonu header'ın sahibi; gizleme isteği yutulur.
      if (!isVisible && isIntroPending()) {
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

    const finishIntro = () => {
      if (!isIntroPending()) {
        return;
      }

      clearIntroGuards();
      resetHeaderStyles();
    };

    // Intro bitişi timer değil, gerçek CSS animasyon bitişine bağlı. Stream ile geç gelen
    // elemanlar için her turda yeniden bakılır; üst sınır sadece güvenlik içindir.
    const waitForIntroEnd = (epoch) => {
      const deadline = performance.now() + INTRO_WAIT_LIMIT_MS;
      let emptyChecks = 0;

      const check = () => {
        if (cancelled || epoch !== pageEpoch) {
          return;
        }

        const running = getRunningIntroAnimations(root);

        // Yeni commit'in stilleri ilk karede henüz hesaplanmamış olabilir; iki boş kare tolere edilir.
        if (running.length === 0 && emptyChecks < 2 && performance.now() <= deadline) {
          emptyChecks += 1;
          requestAnimationFrame(check);
          return;
        }

        if (running.length === 0 || performance.now() > deadline) {
          finishIntro();
          return;
        }

        Promise.allSettled(running.map((animation) => animation.finished)).then(() => {
          requestAnimationFrame(check);
        });
      };

      requestAnimationFrame(check);
    };

    const scheduleScrollRefresh = () => {
      if (refreshFrame || !scrollTriggerInstance) {
        return;
      }

      refreshFrame = requestAnimationFrame(() => {
        refreshFrame = 0;

        if (!cancelled) {
          scrollTriggerInstance?.refresh();
        }
      });
    };

    const pauseAtStart = (video) => {
      if (!video) {
        return;
      }

      video.pause();

      if (video.readyState >= 1) {
        video.currentTime = 0;
      }
    };

    const syncVideoPlayback = () => {
      const video = activeVideo ?? root.querySelector("[data-hero-video]");

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
        pauseAtStart(video);
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
      scheduleScrollRefresh();
    };

    const handleMotionPreferenceChange = () => {
      syncVideoPlayback();

      if (reduceMotionQuery.matches) {
        clearIntroGuards();
        parallaxMediaContext?.revert();
        parallaxMediaContext = null;
        revealScrollDrawPath();
      }

      setHeaderVisibility(isHeaderVisible, {
        animate: false,
        force: true,
      });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    reduceMotionQuery.addEventListener("change", handleMotionPreferenceChange);

    const revertPageMotion = () => {
      parallaxMediaContext?.revert();
      parallaxMediaContext = null;
      resizeObserver?.disconnect();
      resizeObserver = null;

      if (refreshFrame) {
        cancelAnimationFrame(refreshFrame);
        refreshFrame = 0;
      }
    };

    const setupScrollAndParallax = (epoch) => {
      if (cancelled || epoch !== pageEpoch || !gsapInstance || !scrollTriggerInstance) {
        return;
      }

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

          const getLayerTravel = (layer) =>
            (Number(layer.dataset.parallaxDistance) || 0) * sectionStrength * sectionDirection * strengthScale;

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

          const pointerLayers = heroParallaxSection
            ? Array.from(heroParallaxSection.querySelectorAll("[data-parallax-pointer]"))
            : [];
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
        if (!cancelled && epoch === pageEpoch) {
          scheduleScrollRefresh();
        }
      });

      // Suspense (katalog) ve görseller yüklendiğinde trigger konumları güncel kalsın.
      if (mainElement && typeof ResizeObserver !== "undefined") {
        let skipInitialEntry = true;

        resizeObserver = new ResizeObserver(() => {
          if (skipInitialEntry) {
            skipInitialEntry = false;
            return;
          }

          scheduleScrollRefresh();
        });
        resizeObserver.observe(mainElement);
      }
    };

    const bindPageAnimations = () => {
      if (cancelled || !lenisInstance) {
        return;
      }

      const pageMarker = root.querySelector("[data-page-motion-ready]");
      const pageKey = pageMarker?.dataset.pageMotionReady;

      if (!pageMarker || (pageMarker === activePageMarker && pageKey === activePageKey)) {
        return;
      }

      activePageMarker = pageMarker;
      activePageKey = pageKey;
      const epoch = ++pageEpoch;
      revertPageMotion();

      activeVideo?.removeEventListener("loadedmetadata", handleVideoMetadataLoaded);
      activeVideo = root.querySelector("[data-hero-video]");
      activeVideo?.addEventListener("loadedmetadata", handleVideoMetadataLoaded, {
        once: true,
      });

      if (!window.location.hash) {
        lenisInstance.scrollTo(0, { immediate: true, force: true });
      }

      setHeaderTheme(lenisInstance.scroll > HEADER_SCROLL_THRESHOLD);
      setHeaderVisibility(true, {
        animate: false,
        force: true,
      });
      syncVideoPlayback();

      if (gsapInstance && scrollTriggerInstance && !saveData && !reduceMotionQuery.matches) {
        setupScrollAndParallax(epoch);
      } else {
        revealScrollDrawPath();
      }

      if (isIntroPending()) {
        waitForIntroEnd(epoch);
      }
    };

    async function setupExperience() {
      const { Lenis, gsap, ScrollTrigger } = await loadMotionLibs();

      if (cancelled) {
        return;
      }

      const shouldLoadMotion = !reduceMotionQuery.matches;
      const shouldLoadParallax = shouldLoadMotion && !saveData;

      gsapInstance = shouldLoadMotion ? gsap : null;
      scrollTriggerInstance = shouldLoadParallax ? ScrollTrigger : null;

      lenisInstance = new Lenis({
        anchors: true,
        autoRaf: !gsapInstance,
        duration: 1.05,
        respectReducedMotion: true,
        smoothWheel: !saveData,
        syncTouch: false,
        wheelMultiplier: 0.9,
      });

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

      bindPageAnimations();
    }

    const handlePageReady = () => {
      bindPageAnimations();
    };

    window.addEventListener(PAGE_MOTION_READY_EVENT, handlePageReady);

    setupExperience().catch(() => {
      revealScrollDrawPath();
      clearIntroGuards();
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
      pageEpoch += 1;
      window.clearTimeout(bootSafetyTimer);
      window.removeEventListener(PAGE_MOTION_READY_EVENT, handlePageReady);
      revertPageMotion();
      destroyFloatingScrollbar?.();
      destroyFloatingScrollbar = null;
      removeLenisScroll?.();
      removeLenisMotionScroll?.();
      removeGsapTicker?.();
      lenisInstance?.destroy();
      resetHeaderStyles();
      activeVideo?.removeEventListener("loadedmetadata", handleVideoMetadataLoaded);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reduceMotionQuery.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, []);

  return null;
}
