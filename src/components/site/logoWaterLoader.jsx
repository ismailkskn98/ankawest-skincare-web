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

export function LogoWaterLoader({ className = "", compact = false }) {
  const reduceMotion = useReducedMotion();
  const stageClass = compact
    ? "min-h-[calc(100dvh-78px)] py-[clamp(3rem,8vh,5rem)]"
    : "min-h-dvh";

  return (
    <div
      className={`grid place-items-center bg-site-paper px-[clamp(1.25rem,5vw,2rem)] ${stageClass} ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Sayfa yükleniyor"
    >
      <div className="flex w-full max-w-[18rem] flex-col items-center gap-8 sm:max-w-[20rem]">
        <div className="relative aspect-[800/290] w-full">
          <div className="absolute inset-0 bg-site-ink/15" style={MASK_STYLE} aria-hidden="true" />

          <motion.div
            className="absolute inset-0 overflow-hidden"
            style={MASK_STYLE}
            initial={reduceMotion ? false : { clipPath: "inset(100% 0 0 0)" }}
            animate={reduceMotion ? { clipPath: "inset(0% 0 0 0)" } : { clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)", "inset(0% 0 0 0)", "inset(100% 0 0 0)"] }}
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
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-site-ink" />

            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 800 290" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <filter id="logo-water-turbulence" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.018 0.05"
                    numOctaves="2"
                    seed="3"
                    result="noise"
                  >
                    {reduceMotion ? null : (
                      <animate
                        attributeName="baseFrequency"
                        dur="5s"
                        values="0.018 0.05;0.032 0.07;0.018 0.05"
                        repeatCount="indefinite"
                      />
                    )}
                  </feTurbulence>
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale={reduceMotion ? 0 : 14}
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
                <linearGradient id="logo-water-sheen" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
                  <stop offset="35%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.12" />
                </linearGradient>
              </defs>
              <rect width="800" height="290" fill="url(#logo-water-sheen)" filter="url(#logo-water-turbulence)" />
            </svg>
          </motion.div>
        </div>

        <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-site-copy/55 uppercase">Yükleniyor</p>
      </div>
    </div>
  );
}
