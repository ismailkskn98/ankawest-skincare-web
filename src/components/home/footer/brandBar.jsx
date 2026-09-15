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
    <div className="grid gap-[clamp(2rem,5vw,4rem)] border-t border-black/15 pt-[clamp(1.75rem,3vw,2.5rem)] md:grid-cols-[minmax(0,1fr)_auto] md:items-end" data-motion-group>
      <div data-section-reveal>
        <Link className="inline-flex min-h-12 w-fit items-center" href="/" aria-label="Anka West Skincare anasayfa">
          <span className="relative inline-flex w-[clamp(8.5rem,12vw,10.5rem)] items-center overflow-hidden">
            <Image className="h-auto w-full object-contain" src="/images/logo/ankawestskincare-logo.webp" alt="Anka West Skincare" width={465} height={287} sizes="(min-width: 64rem) 10.5rem, 8.5rem" />
          </span>
        </Link>

        <p className="mt-[clamp(0.65rem,1vw,0.9rem)] max-w-[30ch] text-[clamp(0.72rem,0.8vw,0.78rem)] leading-[1.5] tracking-[-0.012em] text-site-copy/65">Cildini dinleyen bakım, sana özgü.</p>
        <p className="mt-[clamp(2rem,4vw,3.5rem)] text-[clamp(0.66rem,0.72vw,0.72rem)] leading-[1.45] text-site-copy/70">© {currentYear} Anka West Skincare. Tüm hakları saklıdır.</p>
      </div>

      <div className="flex max-w-[720px] flex-wrap items-center gap-x-[clamp(1rem,1.5vw,1.5rem)] gap-y-[clamp(0.6rem,1vw,0.9rem)] text-[clamp(0.65rem,0.7vw,0.72rem)] leading-[1.45] text-site-copy/65 md:justify-end" data-section-reveal>
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
