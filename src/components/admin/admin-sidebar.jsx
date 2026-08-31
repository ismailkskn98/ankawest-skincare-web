"use client";

import {
  Article,
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

export default function AdminSidebar({ currentPath, isOpen, onClose, user }) {
  const visibleNavigation = adminNavigation.filter(
    (entry) => !entry.adminOnly || user.role === "admin",
  );

  return (
    <aside
      className="admin-sidebar"
      data-open={isOpen}
      id="admin-sidebar"
      aria-label="Yönetim menüsü"
    >
      <div className="admin-sidebar-logo">
        <Link href="/admin" onClick={onClose} aria-label="Yönetim paneli ana sayfa">
          <Image
            src="/images/logo/ankawestskincare-logo.png"
            alt="Anka West Skincare"
            width={150}
            height={93}
            priority
          />
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
            >
              <Icon size={18} weight={isActive ? "fill" : "regular"} aria-hidden="true" />
              {entry.label}
            </Link>
          );
        })}
      </nav>

      <div className="admin-sidebar-user">
        <div className="admin-user-summary">
          <span className="admin-user-avatar" aria-hidden="true">
            {getInitials(user.fullName)}
          </span>
          <div>
            <strong>{user.fullName}</strong>
            <span>{user.role === "admin" ? "Yönetici" : "Editör"}</span>
          </div>
        </div>
        <LogoutButton />
      </div>
    </aside>
  );
}
