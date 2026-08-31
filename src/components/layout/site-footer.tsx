import Link from "next/link";

import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="gridContainer border-t border-[var(--line)] bg-[var(--surface)]">
      <div className="flex flex-col gap-5 py-8 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-[var(--ink)]" translate="no">
            {siteConfig.name}
          </p>
          <p className="mt-1 max-w-xl">{siteConfig.copy.footer.summary}</p>
        </div>

        <nav aria-label={siteConfig.copy.footerNavigationLabel}>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {siteConfig.navigation.map((navigationItem) => (
              <li key={navigationItem.href}>
                <Link
                  href={navigationItem.href}
                  className="rounded-sm py-2 hover:text-[var(--ink)]"
                >
                  {navigationItem.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
