"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const DESKTOP_VIDEO_SRC = "/videos/hero-background.mp4";
const MOBILE_VIDEO_SRC = "/videos/mobil-hero-background.mp4";
const MOBILE_VIDEO_QUERY = "(max-width: 639px)";
const POSTER_SRC = "/images/hero/hero-poster.webp";

const mediaClassName = "absolute inset-0 h-full w-full object-cover object-[55%_center] [filter:saturate(0.9)_contrast(0.96)_brightness(0.94)]";

const overlayClassName =
  "absolute inset-0 h-full w-full [background:linear-gradient(180deg,rgba(9,13,10,0.46)_0%,rgba(9,13,10,0.1)_36%,rgba(9,13,10,0.16)_56%,rgba(9,13,10,0.52)_100%),linear-gradient(90deg,rgba(9,13,10,0.18),rgba(9,13,10,0.06))] nav:[background:linear-gradient(180deg,rgba(9,13,10,0.4)_0%,transparent_31%,transparent_58%,rgba(9,13,10,0.45)_100%),linear-gradient(90deg,rgba(9,13,10,0.16)_0%,rgba(9,13,10,0.05)_48%,rgba(9,13,10,0.12)_100%)]";

function shouldSkipVideo() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return true;
    }

    if (navigator.connection?.saveData === true) {
      return true;
    }
  } catch {
    // matchMedia / connection yoksa video yüklemeyi dene.
  }

  return false;
}

export function BgVideo() {
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState("");
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    if (shouldSkipVideo()) {
      return undefined;
    }

    const mediaQuery = window.matchMedia(MOBILE_VIDEO_QUERY);
    const updateVideoSource = () => {
      setIsVideoReady(false);
      setVideoSrc(mediaQuery.matches ? MOBILE_VIDEO_SRC : DESKTOP_VIDEO_SRC);
    };

    updateVideoSource();
    mediaQuery.addEventListener("change", updateVideoSource);

    return () => mediaQuery.removeEventListener("change", updateVideoSource);
  }, []);

  useEffect(() => {
    if (!videoSrc) {
      return undefined;
    }

    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    const markReady = () => {
      setIsVideoReady(true);
    };

    if (video.readyState >= 3) {
      markReady();
    } else {
      video.addEventListener("canplay", markReady, { once: true });
    }

    video.play().catch(() => {
      // Autoplay engellenirse poster görünür kalır.
    });

    return () => {
      video.removeEventListener("canplay", markReady);
    };
  }, [videoSrc]);

  return (
    <div className="fluid absolute inset-0 -z-1 h-full w-full overflow-hidden bg-[#737a70]" aria-hidden="true">
      <Image className={mediaClassName} src={POSTER_SRC} alt="" fill sizes="100vw" priority />

      {videoSrc ? (
        <video
          ref={videoRef}
          className={`${mediaClassName} transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isVideoReady ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          tabIndex={-1}
          data-hero-video
          src={videoSrc}
        />
      ) : null}

      <div className={overlayClassName} />
    </div>
  );
}
