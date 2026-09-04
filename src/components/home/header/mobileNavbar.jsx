"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr/InstagramLogo";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { SiteLink } from "@/components/site/siteLink";
import { INSTAGRAM_URL } from "@/config/site-content";

const linkEnterDelayClasses = [
  "[animation-delay:80ms]",
  "[animation-delay:140ms]",
  "[animation-delay:200ms]",
  "[animation-delay:260ms]",
];

function MenuLink({ item, index, onNavigate }) {
  const className = `group/link block w-fit py-2.5 font-canela text-[clamp(2.35rem,11vw,3.4rem)] leading-[0.95] font-light tracking-[-0.04em] text-site-ink outline-none transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-55 focus-visible:opacity-55 motion-reduce:transition-none group-open:animate-mobile-link-enter motion-reduce:group-open:animate-none ${linkEnterDelayClasses[index] ?? linkEnterDelayClasses.at(-1)}`;

  return (
    <SiteLink
      className={className}
      href={item.href}
      external={item.external}
      onClick={onNavigate}
    >
      <span className="relative">
        {item.label}
        <span
          className="absolute inset-x-0 bottom-[0.08em] h-px origin-left scale-x-0 bg-current/35 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </span>
    </SiteLink>
  );
}

export function MobileNavbar({ items, storeUrl }) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousOverflowRef = useRef("");
  const primaryItems = items.filter((item) => item.href !== INSTAGRAM_URL);

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
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());
  };

  useEffect(() => {
    const dialog = dialogRef.current;

    const closeAtDesktop = () => {
      if (window.matchMedia("(min-width: 56.3125rem)").matches) {
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
        className="inline-flex min-h-[48px] items-center gap-3 rounded-full border-0 bg-[rgba(250,249,246,0.96)] py-1 pr-1.5 pl-4 text-[#2f322f] transition-[background-color,color] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[scrolled=true]/header:bg-[#2f322f] group-data-[scrolled=true]/header:text-[#f7f6f1] motion-reduce:transition-none max-xs:pl-3.5 nav:hidden"
        type="button"
        aria-label="Menüyü aç"
        aria-controls="site-mobile-menu"
        aria-expanded={isOpen}
        onClick={openMenu}
      >
        <span className="text-[0.66rem] font-semibold tracking-[0.06em] uppercase">
          Menü
        </span>
        <span
          className="relative grid size-9 place-items-center rounded-full bg-[#2f322f] transition-colors duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[scrolled=true]/header:bg-[rgba(247,246,241,0.12)] motion-reduce:transition-none"
          aria-hidden="true"
        >
          <span className="absolute h-px w-3.5 -translate-y-[3.5px] bg-[#f7f6f1]" />
          <span className="absolute h-px w-3.5 translate-y-[3.5px] bg-[#f7f6f1]" />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        id="site-mobile-menu"
        className="group fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-site-paper p-0 text-site-ink open:animate-mobile-menu-enter backdrop:bg-[rgba(24,27,24,0.42)] backdrop:backdrop-blur-[2px] motion-reduce:open:animate-none"
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
        <div className="relative flex min-h-full flex-col px-[clamp(1.25rem,6vw,2rem)] pt-4 pb-7">
          <div className="flex min-h-14 items-center justify-between gap-4">
            <Link
              className="inline-flex min-h-12 w-fit items-center outline-none"
              href="/"
              aria-label="Anka West Skincare anasayfa"
              onClick={() => closeMenu()}
            >
              <span className="relative block h-[44px] w-[132px] overflow-hidden">
                <Image
                  className="absolute top-[-19px] left-0 h-auto w-[132px] max-w-none"
                  src="/images/logo/ankawestskincare-logo.webp"
                  alt="Anka West Skincare"
                  width={465}
                  height={287}
                  sizes="132px"
                  priority
                />
              </span>
            </Link>
            <p id="mobile-menu-title" className="sr-only">
              Anka West Skincare menü
            </p>

            <button
              ref={closeButtonRef}
              className="group/close inline-flex min-h-11 items-center gap-2.5 rounded-full bg-site-ink py-1 pr-1.5 pl-4 text-[0.66rem] font-semibold tracking-[0.06em] text-site-paper uppercase outline-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-site-ink/25 focus-visible:ring-offset-2 focus-visible:ring-offset-site-paper active:scale-[0.98] motion-reduce:transition-none"
              type="button"
              aria-label="Menüyü kapat"
              onClick={() => closeMenu()}
            >
              Kapat
              <span
                className="relative grid size-9 place-items-center overflow-hidden rounded-full bg-site-paper text-site-ink"
                aria-hidden="true"
              >
                <span className="absolute h-px w-3.5 rotate-45 bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/close:rotate-[225deg] motion-reduce:transition-none" />
                <span className="absolute h-px w-3.5 -rotate-45 bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/close:-rotate-[225deg] motion-reduce:transition-none" />
              </span>
            </button>
          </div>

          <nav
            className="mt-[clamp(2.5rem,12vh,5.5rem)] grid gap-1"
            aria-label="Mobil ana menü"
          >
            {primaryItems.map((item, index) => (
              <MenuLink
                key={item.href}
                item={item}
                index={index}
                onNavigate={() => closeMenu()}
              />
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-5 pt-10">
            <a
              className="group/cta inline-flex min-h-14 w-full items-center justify-between gap-4 rounded-full bg-site-ink py-1.5 pr-1.5 pl-5 text-[0.68rem] font-semibold tracking-[0.06em] text-site-paper uppercase outline-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-site-ink/25 focus-visible:ring-offset-2 focus-visible:ring-offset-site-paper active:scale-[0.98] motion-reduce:transition-none group-open:animate-mobile-link-enter motion-reduce:group-open:animate-none [animation-delay:320ms]"
              href={storeUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => closeMenu()}
            >
              Ürünleri keşfet
              <span className="relative grid size-11 place-items-center overflow-hidden rounded-full bg-site-paper text-site-ink">
                <ArrowUpRightIcon
                  className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-x-[160%] group-hover/cta:-translate-y-[160%] motion-reduce:transition-none"
                  size={18}
                  weight="light"
                  aria-hidden="true"
                />
                <ArrowUpRightIcon
                  className="absolute -translate-x-[160%] translate-y-[160%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-x-0 group-hover/cta:translate-y-0 motion-reduce:hidden"
                  size={18}
                  weight="light"
                  aria-hidden="true"
                />
              </span>
            </a>

            <div className="flex items-end justify-between gap-4 border-t border-site-ink/10 pt-5">
              <p className="max-w-[18ch] text-[0.78rem] leading-[1.45] text-site-copy">
                Cildini dinleyen bakım, sana özgü.
              </p>

              <a
                className="inline-flex min-h-10 items-center gap-2 text-[0.66rem] font-semibold tracking-[0.08em] text-site-ink uppercase outline-none opacity-80 transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-100 motion-reduce:transition-none"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => closeMenu()}
                aria-label="Instagram’da takip et"
              >
                <InstagramLogoIcon size={16} weight="light" aria-hidden="true" />
                Instagram
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
