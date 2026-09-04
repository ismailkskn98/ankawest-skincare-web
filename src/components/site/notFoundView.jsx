"use client";

import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";

import { VideoText } from "@/components/site/videoText";

const ease = [0.22, 1, 0.36, 1];

export function NotFoundView() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <main className="fixed inset-0 z-[100] grid min-h-dvh place-items-center overflow-hidden bg-site-paper px-[clamp(1.25rem,5vw,2.5rem)] py-[clamp(2.5rem,6vh,4.5rem)] text-site-ink">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <section
        className="relative z-1 mx-auto flex w-full max-w-[72rem] flex-col items-center text-center"
        aria-labelledby="not-found-title"
      >
        <motion.div
          className="relative h-[clamp(11rem,38vw,26rem)] w-full max-w-[min(100%,58rem)]"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          <h1 id="not-found-title" className="sr-only">
            404 — Sayfa bulunamadı
          </h1>
          <VideoText
            className="size-full"
            src="/videos/hero-background3.mp4"
            fontSize={108}
            fontWeight={700}
            fontFamily="var(--font-pp-mori), ui-sans-serif, system-ui, sans-serif"
          >
            404
          </VideoText>
        </motion.div>

        <motion.p
          className="mt-[clamp(1.75rem,4vw,2.75rem)] max-w-[36ch] text-[clamp(0.98rem,2.2vw,1.12rem)] leading-[1.6] tracking-[-0.02em] text-site-copy/70"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease }}
        >
          Aradığın sayfa yok. Ana sayfaya dönebilir veya burada kalıp sitenin ritmine geri dönebilirsin.
        </motion.p>

        <motion.div
          className="mt-[clamp(2.75rem,6vw,4.25rem)] flex w-full max-w-[min(100%,32rem)] items-center justify-between gap-6"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.22, ease }}
        >
          <Link
            className="group inline-flex min-h-11 min-w-11 items-center justify-center text-site-ink transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-55"
            href="/"
            aria-label="Ana sayfaya dön"
          >
            <ArrowLeftIcon
              className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1"
              size={22}
              weight="light"
              aria-hidden="true"
            />
          </Link>

          <Link
            className="group relative inline-flex min-h-11 items-center text-[0.72rem] font-semibold tracking-[0.08em] text-site-ink uppercase"
            href="/"
          >
            Ana sayfaya dön
            <span
              className="absolute inset-x-0 bottom-2 h-px origin-right scale-x-0 bg-current transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
