const DESKTOP_MEDIA = "(min-width: 1024px)";
const MIN_THUMB_HEIGHT = 44;
const HTML_ACTIVE_CLASS = "has-floating-scrollbar";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function isScrollLocked() {
  const htmlOverflow = document.documentElement.style.overflow;
  const bodyOverflow = document.body.style.overflow;

  return htmlOverflow === "hidden" || bodyOverflow === "hidden";
}

/**
 * Desktop'ta native scrollbar gutter'ını kaldırıp floating overlay thumb gösterir.
 * Mevcut Lenis instance'ına bağlanır; Lenis yoksa native window scroll kullanır.
 */
export function attachFloatingScrollbar({ lenis = null } = {}) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia(DESKTOP_MEDIA);
  const root = document.createElement("div");
  root.className = "floating-scrollbar";
  root.setAttribute("aria-hidden", "true");
  root.hidden = true;

  const thumb = document.createElement("div");
  thumb.className = "floating-scrollbar-thumb";
  root.appendChild(thumb);
  document.body.appendChild(root);

  let thumbHeight = MIN_THUMB_HEIGHT;
  let travel = 0;
  let maxScroll = 0;
  let isDragging = false;
  let dragStartY = 0;
  let dragStartScroll = 0;
  let rafId = 0;
  let removeLenisScroll = null;
  let resizeObserver = null;
  let lockObserver = null;

  const getScrollMetrics = () => {
    if (lenis) {
      const viewportHeight = window.innerHeight;
      const limit = Math.max(0, lenis.limit);
      return {
        scroll: lenis.scroll,
        limit,
        viewportHeight,
        documentHeight: viewportHeight + limit,
      };
    }

    const viewportHeight = window.innerHeight;
    const documentHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      viewportHeight,
    );
    const limit = Math.max(0, documentHeight - viewportHeight);

    return {
      scroll: window.scrollY || document.documentElement.scrollTop || 0,
      limit,
      viewportHeight,
      documentHeight,
    };
  };

  const setScrollPosition = (nextScroll) => {
    const target = clamp(nextScroll, 0, maxScroll);

    if (lenis) {
      lenis.scrollTo(target, { immediate: true, force: true });
      return;
    }

    window.scrollTo(0, target);
  };

  const renderThumb = () => {
    rafId = 0;

    if (!mediaQuery.matches || isScrollLocked()) {
      root.hidden = true;
      document.documentElement.classList.remove(HTML_ACTIVE_CLASS);
      return;
    }

    const { scroll, limit, viewportHeight, documentHeight } = getScrollMetrics();
    maxScroll = limit;

    if (documentHeight <= viewportHeight + 1 || limit <= 0) {
      root.hidden = true;
      document.documentElement.classList.remove(HTML_ACTIVE_CLASS);
      return;
    }

    thumbHeight = Math.max(MIN_THUMB_HEIGHT, viewportHeight * (viewportHeight / documentHeight));
    travel = Math.max(0, viewportHeight - thumbHeight);
    const progress = maxScroll > 0 ? clamp(scroll / maxScroll, 0, 1) : 0;
    const thumbY = progress * travel;

    root.hidden = false;
    document.documentElement.classList.add(HTML_ACTIVE_CLASS);
    thumb.style.height = `${thumbHeight}px`;
    thumb.style.transform = `translate3d(0, ${thumbY}px, 0)`;
  };

  const scheduleRender = () => {
    if (rafId) {
      return;
    }

    rafId = window.requestAnimationFrame(renderThumb);
  };

  const handlePointerDown = (event) => {
    if (!mediaQuery.matches || root.hidden || event.button !== 0) {
      return;
    }

    event.preventDefault();
    isDragging = true;
    dragStartY = event.clientY;
    dragStartScroll = getScrollMetrics().scroll;
    root.dataset.dragging = "true";
    document.documentElement.classList.add("is-floating-scrollbar-dragging");

    thumb.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isDragging) {
      return;
    }

    event.preventDefault();

    if (travel <= 0 || maxScroll <= 0) {
      return;
    }

    const deltaY = event.clientY - dragStartY;
    const nextScroll = dragStartScroll + (deltaY / travel) * maxScroll;
    setScrollPosition(nextScroll);
    scheduleRender();
  };

  const handlePointerUp = (event) => {
    if (!isDragging) {
      return;
    }

    isDragging = false;
    delete root.dataset.dragging;
    document.documentElement.classList.remove("is-floating-scrollbar-dragging");

    if (thumb.hasPointerCapture(event.pointerId)) {
      thumb.releasePointerCapture(event.pointerId);
    }

    scheduleRender();
  };

  const handleNativeScroll = () => {
    if (lenis || isDragging) {
      return;
    }

    scheduleRender();
  };

  const handleMediaChange = () => {
    scheduleRender();
  };

  thumb.addEventListener("pointerdown", handlePointerDown);
  thumb.addEventListener("pointermove", handlePointerMove);
  thumb.addEventListener("pointerup", handlePointerUp);
  thumb.addEventListener("pointercancel", handlePointerUp);
  window.addEventListener("scroll", handleNativeScroll, { passive: true });
  window.addEventListener("resize", scheduleRender);
  mediaQuery.addEventListener("change", handleMediaChange);

  if (lenis) {
    removeLenisScroll = lenis.on("scroll", () => {
      if (!isDragging) {
        scheduleRender();
      }
    });
  }

  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(() => {
      scheduleRender();
    });
    resizeObserver.observe(document.documentElement);
    resizeObserver.observe(document.body);
  }

  if (typeof MutationObserver !== "undefined") {
    lockObserver = new MutationObserver(() => {
      scheduleRender();
    });
    lockObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });
    lockObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });
  }

  scheduleRender();

  return () => {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
    }

    removeLenisScroll?.();
    resizeObserver?.disconnect();
    lockObserver?.disconnect();
    thumb.removeEventListener("pointerdown", handlePointerDown);
    thumb.removeEventListener("pointermove", handlePointerMove);
    thumb.removeEventListener("pointerup", handlePointerUp);
    thumb.removeEventListener("pointercancel", handlePointerUp);
    window.removeEventListener("scroll", handleNativeScroll);
    window.removeEventListener("resize", scheduleRender);
    mediaQuery.removeEventListener("change", handleMediaChange);
    document.documentElement.classList.remove(HTML_ACTIVE_CLASS, "is-floating-scrollbar-dragging");
    root.remove();
  };
}
