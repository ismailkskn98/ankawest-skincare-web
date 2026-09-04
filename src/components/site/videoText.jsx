"use client";

import { useEffect, useMemo, useState } from "react";

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
  fontFamily = "var(--font-pp-mori), ui-sans-serif, system-ui, sans-serif",
  textAnchor = "middle",
  dominantBaseline = "middle",
}) {
  const content = Array.isArray(children) ? children.join("") : String(children ?? "");
  const [allowVideo, setAllowVideo] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAllowVideo(!media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const svgMask = useMemo(() => {
    const size = typeof fontSize === "number" ? String(fontSize) : fontSize;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 120" width="300" height="120"><text x="150" y="60" dominant-baseline="${dominantBaseline}" text-anchor="${textAnchor}" font-size="${size}" font-weight="${fontWeight}" font-family="${fontFamily}" fill="white">${content}</text></svg>`;
  }, [content, dominantBaseline, fontFamily, fontSize, fontWeight, textAnchor]);

  const maskImage = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`;
  const fallbackSize = typeof fontSize === "number" ? `clamp(5.5rem, ${fontSize * 0.38}vw, 16rem)` : fontSize;

  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      {allowVideo ? (
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage: maskImage,
            maskImage,
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        >
          <video
            className="size-full object-cover"
            src={src}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            playsInline
            preload={preload}
            aria-hidden="true"
          />
        </div>
      ) : (
        <p
          className="absolute inset-0 grid place-items-center font-semibold tracking-[-0.06em] text-site-ink"
          style={{ fontSize: fallbackSize, fontFamily, fontWeight }}
          aria-hidden="true"
        >
          {content}
        </p>
      )}

      <span className="sr-only">{content}</span>
    </div>
  );
}
