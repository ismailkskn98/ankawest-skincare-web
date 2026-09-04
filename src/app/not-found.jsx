import { NotFoundView } from "@/components/site/notFoundView";

export const metadata = {
  title: "Sayfa bulunamadı",
  description: "Aradığınız sayfa kaldırılmış veya adresi değişmiş olabilir.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return <NotFoundView />;
}
