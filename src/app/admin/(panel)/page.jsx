import {
  Article,
  ArrowRight,
  Package,
  SquaresFour,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import PageHeader from "@/components/admin/page-header";
import { getAdminList } from "@/lib/admin/data";
import { requireAdminSession } from "@/lib/auth/dal";

export const metadata = { title: "Genel Bakış" };

export default async function AdminDashboardPage() {
  const user = await requireAdminSession();
  const requests = [
    getAdminList("products", { page: 1, limit: 1 }),
    getAdminList("categories", { page: 1, limit: 1 }),
    getAdminList("site-contents", { page: 1, limit: 1 }),
  ];

  if (user.role === "admin") {
    requests.push(getAdminList("users", { page: 1, limit: 1 }));
  }

  const [products, categories, contents, users] = await Promise.all(requests);
  const stats = [
    { label: "Toplam ürün", value: products.pagination.total, icon: Package },
    {
      label: "Kategoriler",
      value: categories.pagination.total,
      icon: SquaresFour,
    },
    { label: "Site içerikleri", value: contents.pagination.total, icon: Article },
  ];

  if (users) {
    stats.push({ label: "Yöneticiler", value: users.pagination.total, icon: UsersThree });
  }

  const quickLinks = [
    {
      href: "/admin/products/new",
      title: "Yeni ürün ekle",
      description: "Ürün bilgilerini kaydedin ve görsellerini yükleyin.",
    },
    {
      href: "/admin/categories",
      title: "Kategorileri düzenle",
      description: "Ürün kataloğunun menü ve sıralama yapısını yönetin.",
    },
    {
      href: "/admin/content",
      title: "Site içeriğini güncelle",
      description: "Sayfalarda kullanılan yönetilebilir metinleri düzenleyin.",
    },
  ];

  return (
    <main className="admin-page">
      <PageHeader
        title={`Hoş geldiniz, ${user.fullName.split(" ")[0]}`}
        description="Anka West Skincare içerik ve ürün yönetiminin güncel özeti."
      />

      <section className="stats-grid" aria-label="Yönetim özeti">
        {stats.map(({ label, value, icon: Icon }) => (
          <article className="stat-card" key={label}>
            <span className="stat-card-label">
              {label}
              <Icon size={18} aria-hidden="true" />
            </span>
            <strong className="stat-card-value">{value}</strong>
          </article>
        ))}
      </section>

      <div className="section-heading">
        <h2>Hızlı işlemler</h2>
      </div>
      <section className="quick-links-grid" aria-label="Hızlı işlemler">
        {quickLinks.map((link) => (
          <Link className="quick-link-card" href={link.href} key={link.href}>
            <strong className="quick-link-title">
              {link.title}
              <ArrowRight size={17} aria-hidden="true" />
            </strong>
            <span>{link.description}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
