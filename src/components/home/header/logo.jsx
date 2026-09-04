import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link className="relative min-h-12 w-fit items-center rounded-[10px]" href="/" aria-label="Anka West Skincare anasayfa">
      <Image
        className="h-auto w-[138px] brightness-0 invert transition-[filter] duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[header-tone=light]/header:brightness-100 group-data-[header-tone=light]/header:invert-0 group-data-[scrolled=true]/header:brightness-100 group-data-[scrolled=true]/header:invert-0 motion-reduce:transition-none nav:w-[164px]"
        src="/images/logo/ankawestskincare-logo.webp"
        alt="Anka West Skincare"
        width={465}
        height={287}
        sizes="(max-width: 56.25rem) 138px, 164px"
      />
    </Link>
  );
}
