import { Plus } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import PageHeader from "@/components/admin/page-header";
import ProductList from "@/components/admin/products/product-list";
import { getAdminList } from "@/lib/admin/data";
import { requireAdminSession } from "@/lib/auth/dal";

export const metadata = { title: "Ürünler" };

export default async function ProductsPage() {
  const [user, products, categories] = await Promise.all([
    requireAdminSession(),
    getAdminList("products", { page: 1, limit: 20, sortBy: "displayOrder", sortOrder: "asc" }),
    getAdminList("categories", { page: 1, limit: 100, sortBy: "displayOrder", sortOrder: "asc" }),
  ]);

  return (
    <main className="admin-page">
      <PageHeader
        title="Ürünler"
        description="Skincare kataloğundaki ürünleri, yayın durumlarını ve görsellerini yönetin."
        actions={<Link className="button button-primary" href="/admin/products/new"><Plus size={17} aria-hidden="true" /> Yeni ürün</Link>}
      />
      <ProductList initialData={products} categories={categories.records} userRole={user.role} />
    </main>
  );
}
