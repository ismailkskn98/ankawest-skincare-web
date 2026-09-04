import { Home } from "@/components/home";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "İhtiyacına Göre Kore Cilt Bakımı",
  description:
    "GLUTANEX ve Exome ürünlerini bakım ihtiyacı, aktif içerik ve kullanım adımları üzerinden keşfedin.",
  path: "/",
});

export default function HomePage() {
  return <Home />;
}
