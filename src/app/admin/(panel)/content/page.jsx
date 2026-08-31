import PageHeader from "@/components/admin/page-header";
import ContentManager from "@/components/admin/content/content-manager";
import { getAdminList } from "@/lib/admin/data";
import { requireAdminSession } from "@/lib/auth/dal";

export const metadata = { title: "Site İçerikleri" };

export default async function ContentPage() {
  const [user, contents] = await Promise.all([
    requireAdminSession(),
    getAdminList("site-contents", { page: 1, limit: 100, sortBy: "displayOrder", sortOrder: "asc" }),
  ]);

  return (
    <main className="admin-page">
      <PageHeader title="Site içerikleri" description="Sayfa bölümlerinin metinlerini, yayın durumunu ve SEO alanlarını yönetin." />
      <ContentManager initialRecords={contents.records} userRole={user.role} />
    </main>
  );
}
