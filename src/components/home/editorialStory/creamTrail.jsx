const CREAM_PATH_LENGTH = 16000;
const CREAM_INITIAL_REVEAL = 0.1;

export function CreamTrail() {
  const initialDashOffset = Math.round(
    CREAM_PATH_LENGTH * (1 - CREAM_INITIAL_REVEAL),
  );

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full translate-y-[clamp(4.75rem,9.5vh,7.75rem)]"
      viewBox="0 0 1944.2 7600" preserveAspectRatio="none" overflow="visible" focusable="false" aria-hidden="true">
      <defs>
        <linearGradient id="story-cream-paint" gradientUnits="userSpaceOnUse" x1="250" y1="250" x2="1690" y2="7350">
          <stop offset="0%" stopColor="#e5e0d7" />
          <stop offset="12%" stopColor="#f8f5ef" />
          <stop offset="27%" stopColor="#fffdf9" />
          <stop offset="42%" stopColor="#f0ece5" />
          <stop offset="57%" stopColor="#ffffff" />
          <stop offset="72%" stopColor="#f3efe8" />
          <stop offset="87%" stopColor="#fbf9f5" />
          <stop offset="100%" stopColor="#ded8ce" />
        </linearGradient>

        <filter id="story-cream-volume" x="-25%" y="-8%" width="150%" height="120%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceAlpha" stdDeviation="16" result="shadow" />
          <feOffset in="shadow" dx="8" dy="14" result="offset-shadow" />
          <feFlood floodColor="#79736a" floodOpacity="0.16" result="shadow-color" />
          <feComposite in="shadow-color" in2="offset-shadow" operator="in" result="cream-shadow" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="7" result="surface" />
          <feSpecularLighting in="surface" surfaceScale="8" specularConstant="0.64" specularExponent="24" lightingColor="#ffffff" result="specular">
            <feDistantLight azimuth="225" elevation="55" />
          </feSpecularLighting>
          <feComposite in="specular" in2="SourceAlpha" operator="in" result="specular-cut" />
          <feBlend in="SourceGraphic" in2="specular-cut" mode="screen" result="cream-surface" />
          <feMerge>
            <feMergeNode in="cream-shadow" />
            <feMergeNode in="cream-surface" />
          </feMerge>
        </filter>
      </defs>

      <path
        className="story-cream-path"
        d="M1085 250c-868 126.5-961 907-29.5 1453S1397 3000 733 3318c-552 180-606 650-53.6 808 552.3 230 1689.3 650 475.6 1180-760 250-270 520-120 960 110 322 680 520 260 1090"
        fill="none"
        stroke="url(#story-cream-paint)"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: `${CREAM_PATH_LENGTH} ${CREAM_PATH_LENGTH}`,
          strokeDashoffset: initialDashOffset,
        }}
        data-scroll-draw-path
        data-scroll-draw-initial={CREAM_INITIAL_REVEAL}
      />
    </svg>
  );
}
