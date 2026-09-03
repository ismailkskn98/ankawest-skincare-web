import Image from "next/image";

export function Showcase({ image, alt, label, distance, className = "" }) {
  return (
    <figure
      className={`relative isolate min-h-[clamp(420px,120vw,520px)] overflow-hidden bg-[#d7e0e2] min-[768px]:min-h-[clamp(520px,78vw,640px)] min-[1024px]:min-h-[clamp(680px,78vw,820px)] min-[1280px]:min-h-[clamp(760px,70vw,900px)] ${className}`}
      aria-label={label}
      data-section-reveal
    >
      <div
        className="absolute inset-x-0 -inset-y-[16%]"
        data-scroll-parallax-layer
        data-parallax-distance={distance}
      >
        <Image
          className="h-full w-full object-cover"
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          draggable={false}
        />
      </div>
    </figure>
  );
}
