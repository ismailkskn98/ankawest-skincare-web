import {
  Article,
  ArrowRight,
  CheckCircle,
  ClockCountdown,
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
    getAdminList("products", { page: 1, limit: 1, status: "published" }),
    getAdminList("products", { page: 1, limit: 1, status: "draft" }),
    getAdminList("categories", { page: 1, limit: 1 }),
    getAdminList("site-contents", { page: 1, limit: 1 }),
  ];

  if (user.role === "admin") {
    requests.push(getAdminList("users", { page: 1, limit: 1 }));
  }

  const [products, publishedProducts, draftProducts, categories, contents, users] = await Promise.all(requests);
  const stats = [
    { label: "Toplam ürün", value: products.pagination.total, icon: Package, tone: "neutral" },
    { label: "Yayındaki ürün", value: publishedProducts.pagination.total, icon: CheckCircle, tone: "success" },
    { label: "Taslak ürün", value: draftProducts.pagination.total, icon: ClockCountdown, tone: "warning" },
    {
      label: "Kategoriler",
      value: categories.pagination.total,
      icon: SquaresFour,
      tone: "sage",
    },
  ];

  if (users) {
    stats.push({ label: "Yöneticiler", value: users.pagination.total, icon: UsersThree, tone: "neutral" });
  }

  const publicationRate = products.pagination.total
    ? Math.round((publishedProducts.pagination.total / products.pagination.total) * 100)
    : 0;

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

      <section className="stats-grid dashboard-stats" aria-label="Yönetim özeti">
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <article className="stat-card" data-tone={tone} key={label}>
            <span className="stat-card-icon"><Icon size={18} aria-hidden="true" /></span>
            <span className="stat-card-copy">
              <strong className="stat-card-value">{value}</strong>
              <span className="stat-card-label">{label}</span>
            </span>
          </article>
        ))}
      </section>

      <div className="dashboard-grid">
        <section className="panel dashboard-health" aria-labelledby="catalog-health-title">
          <header className="panel-header">
            <div className="panel-heading">
              <h2 id="catalog-health-title">Katalog yayını</h2>
              <p>Ürün kataloğunun güncel yayın dağılımı.</p>
            </div>
            <strong className="health-percentage">%{publicationRate}</strong>
          </header>
          <div className="panel-body">
            <div className="health-track" aria-label={`Ürünlerin yüzde ${publicationRate} kadarı yayında`}>
              <span style={{ width: `${publicationRate}%` }} />
            </div>
            <dl className="health-legend">
              <div><dt>Yayında</dt><dd>{publishedProducts.pagination.total}</dd></div>
              <div><dt>Taslak</dt><dd>{draftProducts.pagination.total}</dd></div>
              <div><dt>Site içeriği</dt><dd>{contents.pagination.total}</dd></div>
            </dl>
          </div>
        </section>

        <section className="dashboard-actions" aria-labelledby="quick-actions-title">
          <div className="section-heading"><h2 id="quick-actions-title">Hızlı işlemler</h2></div>
          <div className="quick-action-list">
            {quickLinks.map((link) => (
              <Link className="quick-link-card" href={link.href} key={link.href}>
                <span><strong>{link.title}</strong><small>{link.description}</small></span>
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
