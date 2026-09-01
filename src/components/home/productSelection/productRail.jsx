import { ProductCard } from "./productCard";

const products = [
  {
    index: "01",
    name: "Glow Booster",
    category: "Yüz kremi",
    size: "50 ml",
    image: "/images/urunler/cutouts/glutanex-glow-booster.png",
    imageAlt: "GLUTANEX Glow Booster kapsüllü yüz kremi",
    width: 737,
    height: 726,
    imageClassName: "w-[68%]",
    tone: "bg-[#dbe5e9]",
  },
  {
    index: "02",
    name: "Glow Therapy Eye Cream",
    category: "Göz çevresi",
    size: "30 ml",
    image: "/images/urunler/cutouts/glutanex-eye-cream.png",
    imageAlt: "GLUTANEX Glow Therapy Eye Cream",
    width: 229,
    height: 983,
    imageClassName: "w-[30%]",
    tone: "bg-[#e8dfd9]",
  },
  {
    index: "03",
    name: "Glow Balm",
    category: "Bakım balmı",
    size: "10 g",
    image: "/images/urunler/cutouts/glutanex-glow-balm.png",
    imageAlt: "GLUTANEX Glow Balm",
    width: 231,
    height: 918,
    imageClassName: "w-[31%]",
    tone: "bg-[#dce7df]",
  },
  {
    index: "04",
    name: "Body Cream",
    category: "Vücut bakımı",
    size: "200 ml",
    image: "/images/urunler/cutouts/glutanex-body-cream.png",
    imageAlt: "GLUTANEX vücut bakım kremi",
    width: 362,
    height: 892,
    imageClassName: "w-[39%]",
    tone: "bg-[#e4dfe8]",
  },
];

export function ProductRail() {
  return (
    <ul
      className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-[901px]:mt-14"
      tabIndex={0}
      aria-label="GLUTANEX ürün seçkisi"
    >
      {products.map((product) => (
        <ProductCard key={product.name} product={product} />
      ))}
    </ul>
  );
}
