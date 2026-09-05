"use client";

import { useEffect, useId, useState } from "react";

export function VideoText({
  src,
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = 100,
  fontWeight = 700,
  fontFamily = "ui-sans-serif, system-ui, sans-serif",
}) {
  const content = Array.isArray(children) ? children.join("") : String(children ?? "");
  const reactId = useId().replace(/:/g, "");
  const maskId = `video-text-mask-${reactId}`;
  const [allowVideo, setAllowVideo] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setAllowVideo(!media.matches);
      if (media.matches) {
        setIsReady(true);
      }
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const glyphSize = typeof fontSize === "number" ? fontSize : 100;
  const fallbackSize = `clamp(5.5rem, ${glyphSize * 0.38}vw, 16rem)`;

  if (!allowVideo) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <p
          className="absolute inset-0 grid place-items-center font-semibold tracking-[-0.06em] text-site-ink"
          style={{ fontSize: fallbackSize, fontFamily, fontWeight }}
          aria-hidden="true"
        >
          {content}
        </p>
        <span className="sr-only">{content}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isReady ? (
        <p
          className="absolute inset-0 grid place-items-center font-semibold tracking-[-0.06em] text-site-ink/18"
          style={{ fontSize: fallbackSize, fontFamily, fontWeight }}
          aria-hidden="true"
        >
          {content}
        </p>
      ) : null}

      <svg
        className={`absolute inset-0 size-full transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isReady ? "opacity-100" : "opacity-0"}`}
        viewBox="0 0 300 120"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="300" height="120">
            <rect width="300" height="120" fill="#000" />
            <text
              x="150"
              y="62"
              fill="#fff"
              stroke="#fff"
              strokeWidth="1"
              paintOrder="stroke fill"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize={glyphSize}
              fontWeight={fontWeight}
              fontFamily={fontFamily}
            >
              {content}
            </text>
          </mask>
        </defs>

        <g mask={`url(#${maskId})`}>
          <foreignObject x="0" y="0" width="300" height="120">
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                margin: 0,
              }}
            >
              <video
                src={src}
                autoPlay={autoPlay}
                muted={muted}
                loop={loop}
                playsInline
                preload={preload}
                onLoadedData={() => setIsReady(true)}
                onCanPlay={() => setIsReady(true)}
                onPlaying={() => setIsReady(true)}
                style={{
                  width: "112%",
                  height: "112%",
                  marginTop: "-6%",
                  marginLeft: "-6%",
                  objectFit: "cover",
                  display: "block",
                  border: 0,
                  outline: "none",
                }}
              />
            </div>
          </foreignObject>
        </g>
      </svg>

      <span className="sr-only">{content}</span>
    </div>
  );
}
