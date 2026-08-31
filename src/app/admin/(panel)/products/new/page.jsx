import PageHeader from "@/components/admin/page-header";
import ProductForm from "@/components/admin/products/product-form";
import { getAdminList } from "@/lib/admin/data";
import { requireAdminSession } from "@/lib/auth/dal";

export const metadata = { title: "Yeni Ürün" };

export default async function NewProductPage() {
  const [user, categories] = await Promise.all([
    requireAdminSession(),
    getAdminList("categories", { page: 1, limit: 100, sortBy: "displayOrder", sortOrder: "asc" }),
  ]);

  return (
    <main className="admin-page">
      <PageHeader title="Yeni ürün" description="Ürün bilgilerini kaydedin; ardından seçtiğiniz görseller güvenli yükleme rotasıyla gönderilir." />
      <ProductForm categories={categories.records} userRole={user.role} />
    </main>
  );
}
