import Image from "next/image";

const products = [
  {
    id: "left-foreground",
    src: "/images/deney.png",
    width: 444,
    height: 1221,
    distance: -96,
    depth: 12,
    className:
      "-left-8 top-1/4 w-[clamp(84px,8.2vw,128px)] xl:left-[2vw]",
    sizes:
      "(min-width: 80rem) 128px, (min-width: 64rem) 105px, 0px",
  },
  {
    id: "right-foreground",
    src: "/images/deney.png",
    width: 444,
    height: 1221,
    distance: 84,
    depth: -10,
    className:
      "-right-6 top-1/4 w-[clamp(76px,7vw,105px)] xl:right-[3vw]",
    sizes:
      "(min-width: 80rem) 105px, (min-width: 64rem) 88px, 0px",
  },
  {
    id: "left-background",
    src: "/images/deney.png",
    width: 444,
    height: 1221,
    distance: -64,
    depth: 16,
    className:
      "hidden xl:top-28 xl:left-[8vw] xl:block xl:w-[clamp(110px,9vw,152px)] 2xl:left-[9vw]",
    sizes: "(min-width: 80rem) 152px, 0px",
  },
  {
    id: "right-background",
    src: "/images/deney.png",
    width: 444,
    height: 1221,
    distance: 110,
    depth: -14,
    className:
      "hidden 2xl:top-28 2xl:right-[14vw] 2xl:block 2xl:w-[clamp(82px,6vw,108px)]",
    sizes: "(min-width: 96rem) 108px, 0px",
  },
];

export function ParallaxProducts() {
  return (
    <div
      className="fluid pointer-events-none absolute inset-0 z-1 hidden overflow-hidden lg:block"
      aria-hidden="true"
    >
      {products.map((product) => (
        <div
          key={product.id}
          className={`absolute will-change-transform ${product.className}`}
          data-parallax-scroll
          data-parallax-distance={product.distance}
        >
          <div
            className="will-change-transform"
            data-parallax-pointer
            data-parallax-depth={product.depth}
          >
            <div className="drop-shadow-[0_22px_28px_rgba(6,13,26,0.22)]">
              <Image
                className="h-auto w-full select-none"
                src={product.src}
                alt=""
                width={product.width}
                height={product.height}
                sizes={product.sizes}
                draggable={false}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
