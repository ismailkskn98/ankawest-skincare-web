"use client";

import { FunnelSimpleIcon } from "@phosphor-icons/react/dist/ssr/FunnelSimple";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

function CategoryButton({ label, isActive, indicatorId, onClick, reduceMotion }) {
  return (
    <button
      className={`relative block w-full py-2.5 pr-1 pl-4 text-left text-[0.96rem] leading-[1.35] tracking-[-0.02em] transition-[color,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none motion-reduce:transition-none ${
        isActive ? "font-medium text-site-ink" : "font-light text-site-copy hover:opacity-70"
      }`}
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
    >
      {label}
      {isActive ? (
        <motion.span
          className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-site-ink"
          layoutId={indicatorId}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 520, damping: 42, mass: 0.65 }
          }
          aria-hidden="true"
        />
      ) : null}
    </button>
  );
}

function CategoryList({ items, activeCategory, indicatorId, onChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <LayoutGroup id={indicatorId}>
      <div className="grid gap-0.5" role="tablist">
        {items.map((category) => (
          <CategoryButton
            key={category.slug}
            label={category.name}
            isActive={activeCategory === category.slug}
            indicatorId={indicatorId}
            onClick={() => onChange(category.slug)}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </LayoutGroup>
  );
}

export function CategoryFilter({ categories, activeCategory, activeCategoryName, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const desktopScrollRef = useRef(null);
  const previousOverflowRef = useRef("");
  const items = [{ slug: "all", name: "Tüm ürünler" }, ...categories];

  const unlockPage = useCallback(() => {
    document.documentElement.style.overflow = previousOverflowRef.current;
  }, []);

  const closeDrawer = useCallback(
    (restoreFocus = true) => {
      const dialog = dialogRef.current;

      if (dialog?.open) {
        dialog.close();
      }

      setIsOpen(false);
      unlockPage();

      if (restoreFocus) {
        window.requestAnimationFrame(() => triggerRef.current?.focus());
      }
    },
    [unlockPage],
  );

  const openDrawer = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    previousOverflowRef.current = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    dialog.showModal();
    setIsOpen(true);

    window.requestAnimationFrame(() => closeButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    const handleClose = () => {
      setIsOpen(false);
      unlockPage();
    };

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [unlockPage]);

  const handleSelect = (slug) => {
    onChange(slug);
    closeDrawer(false);
  };

  const handleDesktopSelect = (slug) => {
    const scrollContainer = desktopScrollRef.current;
    const currentScrollTop = scrollContainer?.scrollTop || 0;

    onChange(slug);

    window.requestAnimationFrame(() => {
      if (scrollContainer) {
        scrollContainer.scrollTop = currentScrollTop;
      }
    });
  };

  return (
    <nav aria-label="Ürün kategorileri">
      <div className="hidden lg:block" data-section-reveal>
        <p className="text-[0.62rem] font-semibold tracking-[0.14em] text-site-copy uppercase">Kategoriler</p>
        <div className="relative mt-5">
          <div
            ref={desktopScrollRef}
            className="category-scroll-content max-h-[min(50dvh,23rem)] overflow-y-auto overscroll-contain pr-5 xl:max-h-[min(54dvh,25rem)]"
            data-lenis-prevent
          >
            <CategoryList
              items={items}
              activeCategory={activeCategory}
              indicatorId="desktop-category-indicator"
              onChange={handleDesktopSelect}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 lg:hidden" data-section-reveal>
        <div className="min-w-0">
          <p className="text-[0.62rem] font-semibold tracking-[0.12em] text-site-copy uppercase">{activeCategoryName}</p>
        </div>

        <button
          ref={triggerRef}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-site-ink px-4 py-2 text-[0.66rem] font-semibold tracking-[0.08em] text-site-paper uppercase outline-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-site-ink/25 focus-visible:ring-offset-2 focus-visible:ring-offset-site-paper active:scale-[0.98] motion-reduce:transition-none"
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls="category-filter-drawer"
          onClick={openDrawer}
        >
          <FunnelSimpleIcon size={16} weight="light" aria-hidden="true" />
          Filtrele
        </button>
      </div>

      <dialog
        ref={dialogRef}
        id="category-filter-drawer"
        className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 text-site-ink open:flex open:flex-col open:justify-end backdrop:bg-site-ink/40 backdrop:backdrop-blur-[2px]"
        aria-labelledby="category-filter-title"
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            closeDrawer();
          }
        }}
      >
        <div className="flex max-h-[min(80dvh,45rem)] flex-col overflow-hidden rounded-t-[1.75rem] bg-site-paper px-[clamp(1.25rem,5vw,1.75rem)] pt-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-[0_-18px_48px_rgba(20,20,18,0.12)]">
          <div className="flex shrink-0 items-center justify-between gap-4">
            <div>
              <p id="category-filter-title" className="text-[0.66rem] font-semibold tracking-[0.14em] text-site-copy uppercase">
                Kategori
              </p>
            </div>

            <button
              ref={closeButtonRef}
              className="inline-flex size-11 items-center justify-center rounded-full bg-site-ink/5 text-site-ink outline-none transition-colors hover:bg-site-ink/10 focus-visible:ring-2 focus-visible:ring-site-ink/25"
              type="button"
              aria-label="Filtreyi kapat"
              onClick={() => closeDrawer()}
            >
              <XIcon size={18} weight="light" aria-hidden="true" />
            </button>
          </div>

          <div
            className="mt-5 min-h-0 flex-1 overflow-y-auto overscroll-contain border-t border-site-ink/10 pt-3 pr-2"
            data-lenis-prevent
          >
            <CategoryList
              items={items}
              activeCategory={activeCategory}
              indicatorId="drawer-category-indicator"
              onChange={handleSelect}
            />
          </div>
        </div>
      </dialog>
    </nav>
  );
}
