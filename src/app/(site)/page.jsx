import { Home } from "@/components/home";

export const metadata = {
  title: "İhtiyacına Göre Kore Cilt Bakımı",
  description:
    "GLUTANEX ve Exome ürünlerini bakım ihtiyacı, aktif içerik ve kullanım adımları üzerinden keşfedin.",
  openGraph: {
    title: "Anka West Skincare",
    description:
      "Bakım ihtiyacınıza göre seçilmiş GLUTANEX ve Exome ürünlerini keşfedin.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function HomePage() {
  return <Home />;
}
