"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import AdminHeader from "@/components/admin/admin-header";
import AdminSidebar from "@/components/admin/admin-sidebar";

export default function AdminShell({ children, user }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <div className="admin-shell">
      <AdminSidebar
        currentPath={pathname}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        user={user}
      />
      {isMenuOpen ? (
        <button
          className="mobile-nav-backdrop"
          type="button"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Menüyü kapat"
        />
      ) : null}
      <div className="admin-main-area">
        <AdminHeader
          currentPath={pathname}
          isMenuOpen={isMenuOpen}
          onMenuOpen={() => setIsMenuOpen(true)}
        />
        {children}
      </div>
    </div>
  );
}
