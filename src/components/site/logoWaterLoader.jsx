"use client";

import { motion, useReducedMotion } from "motion/react";

const LOGO_SRC = "/images/logo/ankawestskincare-logo.webp";
const MASK_STYLE = {
  WebkitMaskImage: `url(${LOGO_SRC})`,
  maskImage: `url(${LOGO_SRC})`,
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
};

// İki periyotluk dalga; %50 translate ile kesintisiz döner.
const wavePath =
  "M0 12 C 50 0, 100 24, 150 12 S 250 0, 300 12 S 400 24, 450 12 S 550 0, 600 12 S 700 24, 750 12 S 850 0, 900 12 L900 40 L0 40 Z";

export function LogoWaterLoader({ className = "", compact = false }) {
  const reduceMotion = useReducedMotion();
  const stageClass = compact
    ? "min-h-[calc(100dvh-78px)] py-[clamp(3rem,8vh,5rem)]"
    : "min-h-dvh";

  return (
    <div
      className={`grid place-items-center bg-site-paper px-[clamp(1.25rem,5vw,2rem)] [contain:paint] ${stageClass} ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Sayfa yükleniyor"
    >
      <div className="flex w-full max-w-[18rem] flex-col items-center gap-8 sm:max-w-[20rem]">
        <div className="relative aspect-[800/290] w-full">
          <div className="absolute inset-0 bg-site-ink/15" style={MASK_STYLE} aria-hidden="true" />

          <div className="absolute inset-0 overflow-hidden text-site-ink" style={MASK_STYLE} aria-hidden="true">
            {/* Sadece transform animasyonu: dolgu yükselir, dalga yatayda kayar. */}
            <motion.div
              className="absolute inset-x-0 top-0 h-full will-change-transform"
              initial={reduceMotion ? false : { y: "100%" }}
              animate={reduceMotion ? { y: "0%" } : { y: ["100%", "0%", "0%", "100%"] }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 3.2,
                      times: [0, 0.45, 0.7, 1],
                      ease: [0.22, 1, 0.36, 1],
                      repeat: Infinity,
                    }
              }
            >
              <svg
                className={`absolute -top-[11%] left-0 h-[14%] w-[200%] fill-current ${reduceMotion ? "" : "animate-[logo-wave_2.6s_linear_infinite]"}`}
                viewBox="0 0 900 40"
                preserveAspectRatio="none"
              >
                <path d={wavePath} />
              </svg>
              <div className="absolute inset-0 bg-current" />
            </motion.div>
          </div>
        </div>

        <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-site-copy/55 uppercase">Yükleniyor</p>
      </div>
    </div>
  );
}
