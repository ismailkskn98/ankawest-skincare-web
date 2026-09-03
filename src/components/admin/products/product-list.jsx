"use client";

import {
  ArrowClockwise,
  Check,
  MagnifyingGlass,
  NotePencil,
  Plus,
  Trash,
  WarningCircle,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

import StatusBadge from "@/components/ui/status-badge";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import EmptyState from "@/components/ui/empty-state";
import { clientApiRequest } from "@/lib/api/client";

export default function ProductList({ initialData, categories, userRole }) {
  const [records, setRecords] = useState(initialData.records);
  const [pagination, setPagination] = useState(initialData.pagination);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function loadProducts(page = 1) {
    setIsLoading(true);
    setMessage("");
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (search.trim()) params.set("search", search.trim());
    if (status) params.set("status", status);
    if (categoryId) params.set("categoryId", categoryId);

    try {
      const payload = await clientApiRequest(`/api/admin/products/list?${params}`);
      setRecords(payload?.data?.records || []);
      setPagination(payload?.data?.pagination || pagination);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function publishProduct(productId) {
    setMessage("");
    try {
      await clientApiRequest(`/api/admin/products/publish/${productId}`, {
        method: "PUT",
        body: {},
      });
      await loadProducts(pagination.page);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function deleteProduct() {
    if (!productToDelete) return;
    setIsDeleting(true);

    try {
      await clientApiRequest(`/api/admin/products/delete/${productToDelete.id}`, {
        method: "DELETE",
      });
      setProductToDelete(null);
      await loadProducts(pagination.page);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <section className="panel">
      <form
        className="toolbar"
        onSubmit={(event) => {
          event.preventDefault();
          loadProducts(1);
        }}
      >
        <div className="toolbar-group">
          <label className="sr-only" htmlFor="product-search">Ürün ara</label>
          <input
            className="form-control toolbar-search"
            id="product-search"
            type="search"
            placeholder="Ürün adı, SKU veya marka ara"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <label className="sr-only" htmlFor="product-status">Durum</label>
          <select
            className="form-select"
            id="product-status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="">Tüm durumlar</option>
            <option value="draft">Taslak</option>
            <option value="published">Yayında</option>
          </select>
          <label className="sr-only" htmlFor="product-category-filter">Kategori</label>
          <select
            className="form-select"
            id="product-category-filter"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
          >
            <option value="">Tüm kategoriler</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>{category.name}</option>
            ))}
          </select>
          <button className="button button-secondary" type="submit" disabled={isLoading}>
            <MagnifyingGlass size={16} aria-hidden="true" /> Filtrele
          </button>
        </div>
        <button className="button button-ghost" type="button" onClick={() => loadProducts(pagination.page)} disabled={isLoading}>
          <ArrowClockwise size={16} aria-hidden="true" /> Yenile
        </button>
      </form>

      {message ? (
        <div className="feedback-message feedback-error" role="alert" style={{ margin: 14 }}>
          <WarningCircle size={18} aria-hidden="true" /> {message}
        </div>
      ) : null}

      {records.length === 0 ? (
        <EmptyState
          title="Henüz ürün bulunmuyor"
          description="İlk ürününüzü ekleyerek skincare kataloğunu oluşturmaya başlayın."
          action={<Link className="button button-primary" href="/admin/products/new"><Plus size={16} /> Yeni ürün</Link>}
        />
      ) : (
        <div className="table-scroll" aria-busy={isLoading}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Ürün</th>
                <th>Kategori</th>
                <th>Durum</th>
                <th><span className="sr-only">İşlemler</span></th>
              </tr>
            </thead>
            <tbody>
              {records.map((product) => (
                <tr key={product.id}>
                  <td>
                    <span className="table-primary">{product.name}</span>
                    <span className="table-secondary">{product.sku || product.slug}</span>
                  </td>
                  <td>{product.categoryName || "-"}</td>
                  <td><StatusBadge status={product.status} /></td>
                  <td>
                    <div className="table-actions">
                      {product.status !== "published" ? (
                        <button className="icon-button" type="button" onClick={() => publishProduct(product.id)} aria-label={`${product.name} ürününü yayınla`}>
                          <Check size={16} aria-hidden="true" />
                        </button>
                      ) : null}
                      <Link className="icon-button" href={`/admin/products/${product.id}/edit`} aria-label={`${product.name} ürününü düzenle`}>
                        <NotePencil size={16} aria-hidden="true" />
                      </Link>
                      {userRole === "admin" ? (
                        <button className="icon-button" type="button" onClick={() => setProductToDelete(product)} aria-label={`${product.name} ürününü sil`}>
                          <Trash size={16} aria-hidden="true" />
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pagination.totalPages > 1 ? (
        <div className="pagination">
          <span>Sayfa {pagination.page} / {pagination.totalPages} - {pagination.total} kayıt</span>
          <div className="pagination-actions">
            <button className="button button-secondary button-small" type="button" disabled={isLoading || pagination.page <= 1} onClick={() => loadProducts(pagination.page - 1)}>Önceki</button>
            <button className="button button-secondary button-small" type="button" disabled={isLoading || pagination.page >= pagination.totalPages} onClick={() => loadProducts(pagination.page + 1)}>Sonraki</button>
          </div>
        </div>
      ) : null}

      <ConfirmDialog
        isOpen={Boolean(productToDelete)}
        title="Ürünü sil"
        description={`${productToDelete?.name || "Bu ürün"} katalogdan kaldırılacak ve pasif kayıtlara taşınacak.`}
        confirmLabel="Ürünü sil"
        isSubmitting={isDeleting}
        onCancel={() => setProductToDelete(null)}
        onConfirm={deleteProduct}
      />
    </section>
  );
}
