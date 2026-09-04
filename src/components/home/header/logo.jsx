import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link className="inline-flex min-h-12 w-fit items-center rounded-[10px]" href="/" aria-label="Anka West Skincare anasayfa">
      <span className="relative block h-[46px] w-[138px] overflow-hidden nav:h-[52px] nav:w-[164px]">
        <Image
          className="absolute top-[-20px] left-0 h-auto w-[138px] max-w-none brightness-0 invert transition-[filter] duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[header-tone=light]/header:brightness-100 group-data-[header-tone=light]/header:invert-0 group-data-[scrolled=true]/header:brightness-100 group-data-[scrolled=true]/header:invert-0 motion-reduce:transition-none nav:top-[-24px] nav:w-[164px]"
          src="/images/logo/ankawestskincare-logo.webp"
          alt="Anka West Skincare"
          width={465}
          height={287}
          sizes="(max-width: 56.25rem) 138px, 164px"
        />
      </span>
    </Link>
  );
}
