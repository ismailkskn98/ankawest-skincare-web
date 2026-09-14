"use client";

import {
  Article,
  CaretLeft,
  CaretRight,
  GearSix,
  House,
  Package,
  SquaresFour,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

import LogoutButton from "@/components/admin/logout-button";
import { adminNavigation } from "@/config/admin-navigation";

const icons = {
  article: Article,
  house: House,
  package: Package,
  settings: GearSix,
  squares: SquaresFour,
  users: UsersThree,
};

function getInitials(fullName) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function AdminSidebar({
  currentPath,
  isCollapsed,
  isOpen,
  onClose,
  onCollapse,
  user,
}) {
  const visibleNavigation = adminNavigation.filter(
    (entry) => !entry.adminOnly || user.role === "admin",
  );

  return (
    <aside
      className="admin-sidebar"
      data-open={isOpen}
      data-collapsed={isCollapsed}
      id="admin-sidebar"
      aria-label="Yönetim menüsü"
    >
      <div className="admin-sidebar-logo">
        <Link className="admin-brand" href="/admin" onClick={onClose} aria-label="Yönetim paneli ana sayfa">
          <Image
            src="/images/logo/ankawestskincare-logo.webp"
            alt="Anka West Skincare"
            width={150}
            height={93}
            priority
          />
          <span className="admin-brand-mark" aria-hidden="true">AW</span>
        </Link>
        <button
          className="icon-button mobile-menu-button"
          type="button"
          onClick={onClose}
          aria-label="Menüyü kapat"
          style={{ marginLeft: "auto" }}
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      <nav className="admin-nav">
        <p className="admin-nav-label">Yönetim</p>
        {visibleNavigation.map((entry) => {
          const Icon = icons[entry.icon];
          const isActive = entry.exact
            ? currentPath === entry.href
            : currentPath.startsWith(entry.href);

          return (
            <Link
              className="admin-nav-link"
              data-active={isActive}
              href={entry.href}
              key={entry.href}
              onClick={onClose}
              aria-current={isActive ? "page" : undefined}
              title={isCollapsed ? entry.label : undefined}
            >
              <Icon size={18} weight={isActive ? "fill" : "regular"} aria-hidden="true" />
              <span>{entry.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="admin-sidebar-footer">
        <button
          className="sidebar-collapse-button"
          type="button"
          onClick={onCollapse}
          aria-label={isCollapsed ? "Kenar çubuğunu genişlet" : "Kenar çubuğunu daralt"}
          title={isCollapsed ? "Kenar çubuğunu genişlet" : "Kenar çubuğunu daralt"}
        >
          {isCollapsed ? <CaretRight size={17} aria-hidden="true" /> : <CaretLeft size={17} aria-hidden="true" />}
          <span>Kenar çubuğunu daralt</span>
        </button>
        <details className="admin-user-menu">
          <summary className="admin-user-summary">
            <span className="admin-user-avatar" aria-hidden="true">
              {getInitials(user.fullName)}
            </span>
            <span className="admin-user-copy">
              <strong>{user.fullName}</strong>
              <span>{user.role === "admin" ? "Yönetici" : "Editör"}</span>
            </span>
          </summary>
          <div className="admin-user-popover">
            <div className="admin-user-popover-meta">
              <strong>{user.fullName}</strong>
              <span>{user.email}</span>
            </div>
            <Link href="/admin/account" onClick={onClose}>Hesap ayarları</Link>
            <LogoutButton />
          </div>
        </details>
      </div>
    </aside>
  );
}
