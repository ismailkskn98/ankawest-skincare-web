import PageHeader from "@/components/admin/page-header";
import CategoryManager from "@/components/admin/categories/category-manager";
import { getAdminList } from "@/lib/admin/data";
import { requireAdminSession } from "@/lib/auth/dal";

export const metadata = { title: "Kategoriler" };

export default async function CategoriesPage() {
  const [user, categories] = await Promise.all([
    requireAdminSession(),
    getAdminList("categories", { page: 1, limit: 100, sortBy: "displayOrder", sortOrder: "asc" }),
  ]);

  return (
    <main className="admin-page">
      <PageHeader title="Kategoriler" description="Ürün kataloğunun gruplama, sıralama ve SEO yapısını yönetin." />
      <CategoryManager initialRecords={categories.records} userRole={user.role} />
    </main>
  );
}
