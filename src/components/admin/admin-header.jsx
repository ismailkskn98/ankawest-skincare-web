"use client";

import { List, Storefront } from "@phosphor-icons/react";
import Link from "next/link";

const routeTitles = [
  { prefix: "/admin/products/new", title: "Yeni ürün" },
  { prefix: "/admin/products/", title: "Ürün düzenle" },
  { prefix: "/admin/products", title: "Ürünler" },
  { prefix: "/admin/categories", title: "Kategoriler" },
  { prefix: "/admin/content", title: "Site içerikleri" },
  { prefix: "/admin/users", title: "Yöneticiler" },
  { prefix: "/admin", title: "Genel bakış" },
];

export default function AdminHeader({ currentPath, isMenuOpen, onMenuOpen }) {
  const title =
    routeTitles.find((entry) => currentPath.startsWith(entry.prefix))?.title ||
    "Yönetim paneli";

  return (
    <header className="admin-topbar">
      <div className="admin-topbar-title">
        <button
          className="icon-button mobile-menu-button"
          type="button"
          onClick={onMenuOpen}
          aria-label="Menüyü aç"
          aria-controls="admin-sidebar"
          aria-expanded={isMenuOpen}
        >
          <List size={19} aria-hidden="true" />
        </button>
        <strong>{title}</strong>
      </div>
      <Link
        className="button button-secondary button-small"
        href="/"
        target="_blank"
        rel="noopener"
      >
        <Storefront size={16} aria-hidden="true" />
        Siteyi görüntüle
      </Link>
    </header>
  );
}
