import Image from "next/image";
import Link from "next/link";

import { ANKAWEST_URL } from "@/config/site-content";

const currentYear = new Date().getFullYear();

const legalLinks = [
  {
    label: "Gizlilik",
    href: "https://www.ankawest.com/privacy-policy",
  },
  {
    label: "Çerezler",
    href: "https://www.ankawest.com/privacy-policy",
  },
  {
    label: "Kullanım koşulları",
    href: "https://www.ankawest.com/terms-and-conditions",
  },
  {
    label: "Kurumsal site",
    href: ANKAWEST_URL,
  },
];

export function BrandBar() {
  return (
    <div className="grid gap-10 border-t border-black/15 pt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-12 nav:gap-16 nav:pt-10" data-motion-group>
      <div data-section-reveal>
        <Link className="inline-flex min-h-12 w-fit items-center" href="/" aria-label="Anka West Skincare anasayfa">
          <span className="relative inline-flex h-full w-fit items-center overflow-hidden">
            <Image className="h-auto w-full max-w-none object-contain" src="/images/logo/ankawestskincare-logo.webp" alt="Anka West Skincare" width={465} height={287} sizes="166px" />
          </span>
        </Link>

        <p className="mt-3 max-w-[30ch] text-[0.75rem] leading-[1.45] tracking-[-0.012em] text-site-copy/65">Cildini dinleyen bakım, sana özgü.</p>
        <p className="mt-10 text-[0.7rem] leading-[1.45] text-site-copy/70">© {currentYear} Anka West Skincare. Tüm hakları saklıdır.</p>
      </div>

      <div className="flex max-w-[720px] flex-wrap items-center gap-x-5 gap-y-3 text-[0.68rem] leading-[1.4] text-site-copy/65 md:justify-end" data-section-reveal>
        {legalLinks.map((link) => (
          <a
            key={link.label}
            className="rounded-sm underline decoration-current/30 underline-offset-4 transition-colors duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-site-ink hover:decoration-current focus-visible:text-site-ink motion-reduce:transition-none"
            href={link.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {link.label}
          </a>
        ))}

        <span className="text-site-copy/45" aria-hidden="true">
          ·
        </span>

        <span className="inline-flex items-center gap-1.5">
          <span>Web sitesi:</span>
          <a
            className="focus-ring group inline-flex w-fit items-center gap-1.5 rounded-sm transition-colors duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            href="https://markaforce.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt=""
              className="h-auto w-4 opacity-60 grayscale transition-[filter,opacity] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:grayscale-0 motion-reduce:transition-none"
              height={15}
              src="/markaforce.png"
              width={16}
            />
            <span className="underline decoration-current/30 underline-offset-4 group-hover:text-site-ink group-hover:decoration-current">MarkaForce</span>
          </a>
        </span>
      </div>
    </div>
  );
}
