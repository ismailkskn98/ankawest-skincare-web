"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import AdminHeader from "@/components/admin/admin-header";
import AdminSidebar from "@/components/admin/admin-sidebar";

export default function AdminShell({ children, user }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  function toggleSidebar() {
    setIsSidebarCollapsed((current) => !current);
  }

  return (
    <div className="admin-shell" data-sidebar-collapsed={isSidebarCollapsed}>
      <a className="skip-link" href="#admin-content">Ana içeriğe geç</a>
      <AdminSidebar
        currentPath={pathname}
        isCollapsed={isSidebarCollapsed}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onCollapse={toggleSidebar}
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
      <div className="admin-main-area" id="admin-content">
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
