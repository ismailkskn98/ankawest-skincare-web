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
      "-left-8 top-1/4 w-[clamp(84px,8.2vw,128px)] min-[1280px]:left-[2vw]",
    sizes:
      "(min-width: 1280px) 128px, (min-width: 1024px) 105px, 0px",
  },
  {
    id: "right-foreground",
    src: "/images/deney.png",
    width: 444,
    height: 1221,
    distance: 84,
    depth: -10,
    className:
      "-right-6 top-1/4 w-[clamp(76px,7vw,105px)] min-[1280px]:right-[3vw]",
    sizes:
      "(min-width: 1280px) 105px, (min-width: 1024px) 88px, 0px",
  },
  {
    id: "left-background",
    src: "/images/deney.png",
    width: 444,
    height: 1221,
    distance: -64,
    depth: 16,
    className:
      "hidden min-[1280px]:top-28 min-[1280px]:left-[8vw] min-[1280px]:block min-[1280px]:w-[clamp(110px,9vw,152px)] min-[1536px]:left-[9vw]",
    sizes: "(min-width: 1280px) 152px, 0px",
  },
  {
    id: "right-background",
    src: "/images/deney.png",
    width: 444,
    height: 1221,
    distance: 110,
    depth: -14,
    className:
      "hidden min-[1536px]:top-28 min-[1536px]:right-[14vw] min-[1536px]:block min-[1536px]:w-[clamp(82px,6vw,108px)]",
    sizes: "(min-width: 1536px) 108px, 0px",
  },
];

export function ParallaxProducts() {
  return (
    <div
      className="fluid pointer-events-none absolute inset-0 z-1 hidden overflow-hidden min-[1024px]:block"
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
