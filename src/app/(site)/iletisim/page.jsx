import { ContactPage } from "@/components/contact";
import { SiteShell } from "@/components/site/shell";

export const metadata = {
  title: "İletişim",
  description:
    "Anka West Skincare ile iletişime geçin. Ürün, iş birliği ve bakım sorularınız için buradayız.",
  openGraph: {
    title: "İletişim | Anka West Skincare",
    description:
      "Ürünler ve iş birlikleri için Anka West Skincare iletişim sayfası.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function IletisimPage() {
  return (
    <SiteShell>
      <ContactPage />
    </SiteShell>
  );
}
