import { ContactPage } from "@/components/contact";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "İletişim",
  description: "Anka West Skincare ile iletişime geçin. Ürün, iş birliği ve bakım sorularınız için buradayız.",
  path: "/iletisim",
});

export default function IletisimPage() {
  return <ContactPage />;
}
