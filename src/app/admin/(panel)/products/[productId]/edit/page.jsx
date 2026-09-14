import { notFound } from "next/navigation";

import PageHeader from "@/components/admin/page-header";
import ProductForm from "@/components/admin/products/product-form";
import { getAdminList, getAdminRecord } from "@/lib/admin/data";
import { requireAdminSession } from "@/lib/auth/dal";

export const metadata = { title: "Ürün Düzenle" };

export default async function EditProductPage({ params, searchParams }) {
  const { productId } = await params;
  const query = await searchParams;
  const returnTo = typeof query?.returnTo === "string" && query.returnTo.startsWith("/admin/products")
    ? query.returnTo
    : "/admin/products";
  const [user, product, categories] = await Promise.all([
    requireAdminSession(),
    getAdminRecord("products", productId),
    getAdminList("categories", { page: 1, limit: 100, sortBy: "displayOrder", sortOrder: "asc" }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <main className="admin-page">
      <PageHeader title={product.name} description="Ürün bilgilerini ve kataloğa eklenecek yeni görselleri güncelleyin." />
      <ProductForm categories={categories.records} product={product} userRole={user.role} returnTo={returnTo} />
    </main>
  );
}
