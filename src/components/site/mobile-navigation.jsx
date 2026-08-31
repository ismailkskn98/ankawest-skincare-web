"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./home-shell.module.css";

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
        className={styles.menuTrigger}
        type="button"
        aria-label="Menüyü aç"
        aria-controls="site-mobile-menu"
        aria-expanded={isOpen}
        onClick={openMenu}
      >
        <span className={styles.menuTriggerLabel}>Menü</span>
        <span className={styles.menuTriggerGlyph} aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        id="site-mobile-menu"
        className={styles.mobileDialog}
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
        <div className={styles.mobileDialogInner}>
          <div className={styles.mobileMenuTopline}>
            <p id="mobile-menu-title">Anka West Skincare</p>
            <button
              className={styles.menuClose}
              type="button"
              aria-label="Menüyü kapat"
              onClick={() => closeMenu()}
            >
              <span aria-hidden="true">Kapat</span>
              <span className={styles.closeGlyph} aria-hidden="true" />
            </button>
          </div>

          <nav className={styles.mobileNav} aria-label="Mobil ana menü">
            {items.map((item, index) => (
              <a
                key={item.href}
                ref={index === 0 ? firstLinkRef : undefined}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                onClick={() => closeMenu()}
                className={styles.mobileNavLink}
                style={{ "--nav-delay": `${110 + index * 65}ms` }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </a>
            ))}
          </nav>

          <a
            className={styles.mobileStoreLink}
            href={storeUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => closeMenu()}
          >
            Ürün seçkisini keşfet
            <span aria-hidden="true">↗</span>
          </a>

          <p className={styles.mobileMenuNote}>
            Cildini dinleyen bakım, sana özgü.
          </p>
        </div>
      </dialog>
    </>
  );
}
