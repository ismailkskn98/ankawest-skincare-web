"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const navigationDelayClasses = [
  "[animation-delay:110ms]",
  "[animation-delay:175ms]",
  "[animation-delay:240ms]",
];

export function MobileNavigation({ items, storeUrl }) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const firstLinkRef = useRef(null);
  const previousOverflowRef = useRef("");

  const unlockPage = useCallback(() => {
    document.documentElement.style.overflow = previousOverflowRef.current;
  }, []);

  const closeMenu = useCallback(
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

  const openMenu = () => {
    const dialog = dialogRef.current;

    if (!dialog || dialog.open) {
      return;
    }

    previousOverflowRef.current = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    dialog.showModal();
    setIsOpen(true);
    window.requestAnimationFrame(() => firstLinkRef.current?.focus());
  };

  useEffect(() => {
    const dialog = dialogRef.current;

    const closeAtDesktop = () => {
      if (window.matchMedia("(min-width: 901px)").matches) {
        closeMenu(false);
      }
    };

    window.addEventListener("resize", closeAtDesktop);

    return () => {
      window.removeEventListener("resize", closeAtDesktop);

      if (dialog?.open) {
        dialog.close();
      }

      unlockPage();
    };
  }, [closeMenu, unlockPage]);

  return (
    <>
      <button
        ref={triggerRef}
        className="inline-flex min-h-[50px] items-center gap-3 rounded-full border-0 bg-[rgba(250,249,246,0.96)] py-[5px] pr-[7px] pl-[17px] text-[#2f322f] max-[390px]:pl-3.5 min-[901px]:hidden"
        type="button"
        aria-label="Menüyü aç"
        aria-controls="site-mobile-menu"
        aria-expanded={isOpen}
        onClick={openMenu}
      >
        <span className="text-[0.68rem] font-semibold tracking-[0.035em] uppercase">
          Menü
        </span>
        <span
          className="relative grid size-[38px] place-items-center rounded-full bg-[#2f322f]"
          aria-hidden="true"
        >
          <span className="absolute h-px w-3.5 -translate-y-[3px] bg-[#f7f6f1]" />
          <span className="absolute h-px w-3.5 translate-y-[3px] bg-[#f7f6f1]" />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        id="site-mobile-menu"
        className="group fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-[#f0eee7] p-0 text-[#252825] open:animate-mobile-menu-enter backdrop:bg-[rgba(9,13,10,0.58)] motion-reduce:open:animate-none"
        data-lenis-prevent
        aria-labelledby="mobile-menu-title"
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClose={() => {
          setIsOpen(false);
          unlockPage();
        }}
      >
        <div className="flex min-h-full flex-col px-[clamp(20px,7vw,34px)] pt-[18px] pb-7">
          <div className="flex min-h-[58px] items-center justify-between gap-5 border-b border-[rgba(37,40,37,0.16)] pb-3.5">
            <p
              id="mobile-menu-title"
              className="text-[0.71rem] font-semibold tracking-[0.05em] uppercase"
            >
              Anka West Skincare
            </p>
            <button
              className="inline-flex min-h-11 items-center gap-2.5 border-0 bg-transparent p-0 text-[0.72rem] text-inherit uppercase"
              type="button"
              aria-label="Menüyü kapat"
              onClick={() => closeMenu()}
            >
              <span aria-hidden="true">Kapat</span>
              <span
                className="relative inline-block size-[38px] rounded-full bg-[#252825] text-[#f0eee7]"
                aria-hidden="true"
              >
                <span className="absolute top-1/2 left-1/2 h-px w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute top-1/2 left-1/2 h-px w-3.5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav
            className="mt-[clamp(48px,10vh,88px)] grid"
            aria-label="Mobil ana menü"
          >
            {items.map((item, index) => (
              <a
                key={item.href}
                ref={index === 0 ? firstLinkRef : undefined}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                onClick={() => closeMenu()}
                className={`flex min-h-[82px] items-center gap-[18px] border-b border-[rgba(37,40,37,0.16)] font-editorial text-[clamp(2rem,10vw,3.15rem)] leading-none font-normal tracking-[-0.04em] group-open:animate-mobile-link-enter motion-reduce:group-open:animate-none ${navigationDelayClasses[index] ?? navigationDelayClasses.at(-1)}`}
              >
                <span className="font-ppmori text-[0.64rem] font-semibold tracking-[0.08em] text-[rgba(37,40,37,0.48)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            ))}
          </nav>

          <a
            className="mt-[34px] flex min-h-[58px] items-center justify-between rounded-full bg-[#252825] px-[22px] text-[0.75rem] font-semibold tracking-[0.02em] uppercase"
            href={storeUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => closeMenu()}
          >
            <span className="text-[#f0eee7]">Ürün seçkisini keşfet</span>
            <span className="text-[#f0eee7]" aria-hidden="true">
              ↗
            </span>
          </a>

          <p className="mt-auto pt-[34px] text-[0.76rem] text-[rgba(37,40,37,0.52)]">
            Cildini dinleyen bakım, sana özgü.
          </p>
        </div>
      </dialog>
    </>
  );
}
