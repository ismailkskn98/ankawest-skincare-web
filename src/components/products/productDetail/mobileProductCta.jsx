"use client";

import { useEffect, useState } from "react";

import { ProductCta } from "./productCta";

export function MobileProductCta({ href }) {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");

    if (!footer) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      {
        rootMargin: "0px 0px 96px 0px",
        threshold: 0,
      },
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 flex justify-center bg-gradient-to-t from-site-paper via-site-paper/96 to-transparent px-[clamp(0.75rem,4vw,1.25rem)] pt-7 pb-[calc(0.75rem+env(safe-area-inset-bottom))] transition-[transform,opacity,visibility] duration-300 ease-out md:hidden motion-reduce:transition-none ${
        isFooterVisible
          ? "pointer-events-none invisible translate-y-full opacity-0"
          : "visible translate-y-0 opacity-100"
      }`}
    >
      <ProductCta href={href} className="inline-flex" />
    </div>
  );
}
