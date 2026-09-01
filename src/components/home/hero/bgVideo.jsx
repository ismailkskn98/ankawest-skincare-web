export function BgVideo() {
  return (
    <div
      className="fluid absolute inset-0 -z-1 h-full w-full overflow-hidden bg-[#737a70]"
      aria-hidden="true"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover object-[55%_center] [filter:saturate(0.9)_contrast(0.96)_brightness(0.94)]"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        tabIndex={-1}
        data-hero-video
      >
        <source src="/videos/hero-background3.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 h-full w-full [background:linear-gradient(180deg,rgba(9,13,10,0.46)_0%,rgba(9,13,10,0.1)_36%,rgba(9,13,10,0.16)_56%,rgba(9,13,10,0.52)_100%),linear-gradient(90deg,rgba(9,13,10,0.18),rgba(9,13,10,0.06))] min-[901px]:[background:linear-gradient(180deg,rgba(9,13,10,0.4)_0%,transparent_31%,transparent_58%,rgba(9,13,10,0.45)_100%),linear-gradient(90deg,rgba(9,13,10,0.16)_0%,rgba(9,13,10,0.05)_48%,rgba(9,13,10,0.12)_100%)]" />
    </div>
  );
}
