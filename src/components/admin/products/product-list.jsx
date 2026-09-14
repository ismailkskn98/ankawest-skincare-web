"use client";

import {
  ArrowClockwise,
  Check,
  DotsThree,
  Eye,
  ImageSquare,
  MagnifyingGlass,
  NotePencil,
  Plus,
  Trash,
  WarningCircle,
  X,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import ConfirmDialog from "@/components/ui/confirm-dialog";
import EmptyState from "@/components/ui/empty-state";
import { clientApiRequest } from "@/lib/api/client";

const PAGE_SIZE = 20;

function formatSyncDate(value) {
  if (!value) return "Henüz değil";

  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function getVisiblePages(currentPage, totalPages) {
  const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const end = Math.min(totalPages, Math.max(5, currentPage + 2));
  return Array.from({ length: Math.max(0, end - start + 1) }, (_, index) => start + index);
}

export default function ProductList({ initialData, categories, userRole }) {
  const [records, setRecords] = useState(initialData.records);
  const [pagination, setPagination] = useState(initialData.pagination);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [updatingProductId, setUpdatingProductId] = useState(null);

  const hasActiveFilters = Boolean(search.trim() || status || categoryId);

  async function loadProducts(page = 1, filters = {}) {
    const nextSearch = filters.search ?? search;
    const nextStatus = filters.status ?? status;
    const nextCategoryId = filters.categoryId ?? categoryId;
    setIsLoading(true);
    setMessage(null);
    const params = new URLSearchParams({ page: String(page), limit: String(PAGE_SIZE) });
    if (nextSearch.trim()) params.set("search", nextSearch.trim());
    if (nextStatus) params.set("status", nextStatus);
    if (nextCategoryId) params.set("categoryId", nextCategoryId);

    try {
      const payload = await clientApiRequest(`/api/admin/products/list?${params}`);
      setRecords(payload?.data?.records || []);
      setPagination(payload?.data?.pagination || pagination);
    } catch (error) {
      setMessage({ tone: "error", text: error.message });
    } finally {
      setIsLoading(false);
    }
  }

  async function updatePublication(product) {
    setUpdatingProductId(product.id);
    setMessage(null);

    try {
      const nextStatus = product.status === "published" ? "draft" : "published";
      await clientApiRequest(`/api/admin/products/update/${product.id}`, {
        method: "PUT",
        body: { status: nextStatus },
      });
      setRecords((current) =>
        current.map((record) =>
          record.id === product.id ? { ...record, status: nextStatus } : record,
        ),
      );
      setMessage({
        tone: "success",
        text: nextStatus === "published" ? "Ürün yayınlandı." : "Ürün taslağa alındı.",
      });
    } catch (error) {
      setMessage({ tone: "error", text: error.message });
    } finally {
      setUpdatingProductId(null);
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
      setMessage({ tone: "error", text: error.message });
    } finally {
      setIsDeleting(false);
    }
  }

  async function syncTrendyolProducts() {
    setIsSyncing(true);
    setMessage(null);

    try {
      const payload = await clientApiRequest("/api/admin/products/sync/trendyol", {
        method: "POST",
        body: {},
      });
      const result = payload?.data;
      const summary = result?.enabled
        ? `Senkronizasyon tamamlandı: ${result.created} yeni, ${result.updated} güncel, ${result.failed} hatalı.`
        : payload?.message || "Trendyol entegrasyonu etkin değil.";
      await loadProducts(1);
      setMessage({ tone: result?.failed ? "error" : "success", text: summary });
    } catch (error) {
      setMessage({ tone: "error", text: error.message });
    } finally {
      setIsSyncing(false);
    }
  }

  function clearFilters() {
    setSearch("");
    setStatus("");
    setCategoryId("");
    loadProducts(1, { search: "", status: "", categoryId: "" });
  }

  const firstRecord = pagination.total === 0 ? 0 : (pagination.page - 1) * PAGE_SIZE + 1;
  const lastRecord = Math.min(pagination.page * PAGE_SIZE, pagination.total);
  const visiblePages = getVisiblePages(pagination.page, pagination.totalPages);

  return (
    <section className="panel product-list-panel">
      <form
        className="product-toolbar"
        onSubmit={(event) => {
          event.preventDefault();
          loadProducts(1);
        }}
      >
        <div className="product-search-field">
          <MagnifyingGlass size={17} aria-hidden="true" />
          <label className="sr-only" htmlFor="product-search">Ürün ara</label>
          <input
            id="product-search"
            type="search"
            placeholder="Ürün adı, SKU veya marka ara"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="product-filter-row">
          <label className="sr-only" htmlFor="product-status">Durum</label>
          <select
            className="form-select compact-select"
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
            className="form-select compact-select"
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
            Filtrele
          </button>
          {hasActiveFilters ? (
            <button className="button button-ghost" type="button" onClick={clearFilters} disabled={isLoading}>
              <X size={15} aria-hidden="true" /> Temizle
            </button>
          ) : null}
        </div>
        <div className="product-toolbar-actions">
          {userRole === "admin" ? (
            <button className="button button-secondary" type="button" onClick={syncTrendyolProducts} disabled={isSyncing || isLoading}>
              <ArrowClockwise className={isSyncing ? "spin" : undefined} size={16} aria-hidden="true" />
              {isSyncing ? "Senkronize ediliyor" : "Trendyol senkronize et"}
            </button>
          ) : null}
          <button className="icon-button" type="button" onClick={() => loadProducts(pagination.page)} disabled={isLoading || isSyncing} aria-label="Ürün listesini yenile" title="Yenile">
            <ArrowClockwise className={isLoading ? "spin" : undefined} size={17} aria-hidden="true" />
          </button>
        </div>
      </form>

      {message ? (
        <div className={`feedback-message feedback-${message.tone}`} role={message.tone === "error" ? "alert" : "status"}>
          {message.tone === "error" ? <WarningCircle size={18} aria-hidden="true" /> : <Check size={18} aria-hidden="true" />}
          <span>{message.text}</span>
        </div>
      ) : null}

      {records.length === 0 ? (
        <EmptyState
          title={hasActiveFilters ? "Filtrelerle eşleşen ürün yok" : "Henüz ürün bulunmuyor"}
          description={hasActiveFilters ? "Filtreleri değiştirin veya temizleyerek tüm ürünlere dönün." : "İlk ürününüzü ekleyerek skincare kataloğunu oluşturmaya başlayın."}
          action={hasActiveFilters ? <button className="button button-secondary" type="button" onClick={clearFilters}>Filtreleri temizle</button> : <Link className="button button-primary" href="/admin/products/new"><Plus size={16} /> Yeni ürün</Link>}
        />
      ) : (
        <div className="table-scroll" aria-busy={isLoading}>
          <table className="data-table product-data-table">
            <thead>
              <tr>
                <th>Ürün</th>
                <th>Kategori</th>
                <th>Kaynak</th>
                <th>Yayın</th>
                <th>Görsel</th>
                <th>Son senkron</th>
                <th><span className="sr-only">İşlemler</span></th>
              </tr>
            </thead>
            <tbody>
              {records.map((product) => {
                const isPublished = product.status === "published";
                const isUpdating = updatingProductId === product.id;

                return (
                  <tr key={product.id}>
                    <td>
                      <div className="product-cell">
                        <div className="product-thumbnail">
                          {product.primaryImageUrl ? (
                            <Image src={product.primaryImageUrl} alt="" fill sizes="48px" />
                          ) : (
                            <ImageSquare size={20} aria-hidden="true" />
                          )}
                        </div>
                        <div className="product-cell-copy">
                          <Link className="table-primary product-name-link" href={`/admin/products/${product.id}/edit`}>
                            {product.name}
                          </Link>
                          <span className="table-secondary">{product.sku || product.trendyolBarcode || product.slug}</span>
                          {product.isFeatured ? <span className="badge badge-sage">Öne çıkan</span> : null}
                        </div>
                      </div>
                    </td>
                    <td>{product.categoryName || "—"}</td>
                    <td><span className="source-label">{product.source === "trendyol" ? "Trendyol" : "Manuel"}</span></td>
                    <td>
                      <label className="publication-switch">
                        <input type="checkbox" checked={isPublished} disabled={isUpdating} onChange={() => updatePublication(product)} />
                        <span className="switch-track" aria-hidden="true"><span /></span>
                        <span>{isUpdating ? "Güncelleniyor" : isPublished ? "Yayında" : "Taslak"}</span>
                      </label>
                    </td>
                    <td>
                      {product.primaryImageUrl ? (
                        <span className="image-status image-status-ready"><Check size={14} /> Hazır</span>
                      ) : (
                        <span className="image-status image-status-missing"><WarningCircle size={14} /> Eksik</span>
                      )}
                    </td>
                    <td>
                      <span className="sync-date">{product.source === "trendyol" ? formatSyncDate(product.lastSyncedAt) : "Uygulanmaz"}</span>
                      {product.syncStatus === "error" ? <span className="table-secondary danger-text">Senkron hatası</span> : null}
                    </td>
                    <td>
                      <details className="row-actions-menu">
                        <summary aria-label={`${product.name} için işlemleri aç`}><DotsThree size={20} weight="bold" aria-hidden="true" /></summary>
                        <div className="row-actions-popover">
                          <Link href={`/admin/products/${product.id}/edit`}><NotePencil size={16} /> Düzenle</Link>
                          {isPublished && product.slug ? <Link href={`/urunler/${product.slug}`} target="_blank"><Eye size={16} /> Önizle</Link> : null}
                          <button type="button" onClick={() => updatePublication(product)} disabled={isUpdating}><Check size={16} /> {isPublished ? "Taslağa al" : "Yayınla"}</button>
                          {userRole === "admin" ? <button className="danger-text" type="button" onClick={() => setProductToDelete(product)}><Trash size={16} /> Sil</button> : null}
                        </div>
                      </details>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {pagination.total > 0 ? (
        <div className="pagination">
          <span>{firstRecord}–{lastRecord} / {pagination.total} ürün</span>
          <nav className="pagination-actions" aria-label="Ürün sayfaları">
            <button className="button button-secondary button-small" type="button" disabled={isLoading || pagination.page <= 1} onClick={() => loadProducts(pagination.page - 1)}>Önceki</button>
            <div className="pagination-pages">
              {visiblePages.map((page) => (
                <button className="pagination-page" data-active={page === pagination.page} type="button" key={page} onClick={() => loadProducts(page)} disabled={isLoading} aria-current={page === pagination.page ? "page" : undefined}>{page}</button>
              ))}
            </div>
            <button className="button button-secondary button-small" type="button" disabled={isLoading || pagination.page >= pagination.totalPages} onClick={() => loadProducts(pagination.page + 1)}>Sonraki</button>
          </nav>
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
