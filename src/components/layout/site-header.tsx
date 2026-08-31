import Link from "next/link";

import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="gridContainer border-b border-[var(--line)] bg-[var(--surface)]">
      <div className="flex min-h-20 flex-wrap items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="inline-flex flex-col leading-none hover:text-[var(--accent)]"
          aria-label={siteConfig.copy.header.homeLabel}
          translate="no"
        >
          <span className="text-xs font-semibold tracking-[0.22em] text-[var(--muted)] uppercase">
            {siteConfig.copy.header.brandParent}
          </span>
          <span className="mt-1 text-lg font-semibold tracking-[-0.02em]">
            {siteConfig.copy.header.brandSection}
          </span>
        </Link>

        <nav aria-label={siteConfig.copy.primaryNavigationLabel}>
          <ul className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm font-medium text-[var(--muted)]">
            {siteConfig.navigation.map((navigationItem) => (
              <li key={navigationItem.href}>
                <Link
                  href={navigationItem.href}
                  aria-current={navigationItem.href === "/" ? "page" : undefined}
                  className="rounded-sm px-1 py-2 hover:text-[var(--ink)]"
                >
                  {navigationItem.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
