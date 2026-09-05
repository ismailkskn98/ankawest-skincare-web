"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

export const PAGE_MOTION_READY_EVENT = "ankawest:page-motion-ready";

export function PageMotionReady() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    window.dispatchEvent(new Event(PAGE_MOTION_READY_EVENT));
  }, [pathname]);

  return <span hidden data-page-motion-ready={pathname} />;
}
