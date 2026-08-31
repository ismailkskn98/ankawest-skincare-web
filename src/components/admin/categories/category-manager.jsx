"use client";

import {
  Check,
  NotePencil,
  Plus,
  Trash,
  WarningCircle,
} from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import SeoFields from "@/components/admin/seo-fields";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import EmptyState from "@/components/ui/empty-state";
import StatusBadge from "@/components/ui/status-badge";
import { clientApiRequest } from "@/lib/api/client";
import { categoryFormSchema } from "@/lib/validation/admin";

const emptyValues = {
  name: "",
  slug: "",
  description: "",
  displayOrder: 0,
  seoTitle: "",
  seoDescription: "",
  seoKeywordsText: "",
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: "",
  ogImageUrl: "",
};

function toFormValues(category) {
  return {
    ...emptyValues,
    ...category,
    seoKeywordsText: category?.seoKeywords || "",
  };
}

function toPayload(values) {
  const { seoKeywordsText, ...fields } = values;
  return {
    ...fields,
    seoKeywords: seoKeywordsText.trim() || null,
  };
}

export default function CategoryManager({ initialRecords, userRole }) {
  const [records, setRecords] = useState(initialRecords);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [message, setMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(categoryFormSchema), defaultValues: emptyValues });

  async function reloadCategories() {
    const payload = await clientApiRequest(
      "/api/admin/categories/list?limit=100&sortBy=displayOrder&sortOrder=asc",
    );
    setRecords(payload?.data?.records || []);
  }

  function startEditing(category) {
    setEditingCategory(category);
    reset(toFormValues(category));
    setMessage("");
  }

  function startCreating() {
    setEditingCategory(null);
    reset(emptyValues);
  }

  async function saveCategory(values) {
    setMessage("");
    const endpoint = editingCategory
      ? `/api/admin/categories/update/${editingCategory.id}`
      : "/api/admin/categories/create";

    try {
      const payload = await clientApiRequest(endpoint, {
        method: editingCategory ? "PUT" : "POST",
        body: toPayload(values),
      });
      setMessage(payload.message || "Kategori kaydedildi.");
      await reloadCategories();
      startCreating();
    } catch (error) {
      setError("root", { message: error.message });
    }
  }

  async function publishCategory(categoryId) {
    try {
      await clientApiRequest(`/api/admin/categories/publish/${categoryId}`, {
        method: "PUT",
        body: {},
      });
      await reloadCategories();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function deleteCategory() {
    if (!categoryToDelete) return;
    setIsDeleting(true);

    try {
      await clientApiRequest(`/api/admin/categories/delete/${categoryToDelete.id}`, {
        method: "DELETE",
      });
      setCategoryToDelete(null);
      await reloadCategories();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="manager-layout">
      <section className="panel">
        <header className="panel-header">
          <h2>Kategori listesi</h2>
          <button className="button button-secondary button-small" type="button" onClick={startCreating}>
            <Plus size={15} aria-hidden="true" /> Yeni kategori
          </button>
        </header>
        {message ? (
          <div className="feedback-message feedback-info" role="status" style={{ margin: 14 }}>
            {message}
          </div>
        ) : null}
        {records.length === 0 ? (
          <EmptyState title="Kategori bulunmuyor" description="Ürünleri gruplamak için ilk kategoriyi oluşturun." />
        ) : (
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr><th>Kategori</th><th>Sıra</th><th>Durum</th><th><span className="sr-only">İşlemler</span></th></tr>
              </thead>
              <tbody>
                {records.map((category) => (
                  <tr key={category.id}>
                    <td><span className="table-primary">{category.name}</span><span className="table-secondary">/{category.slug}</span></td>
                    <td>{category.displayOrder ?? 0}</td>
                    <td><StatusBadge status={category.status} /></td>
                    <td>
                      <div className="table-actions">
                        {category.status !== "published" ? (
                          <button className="icon-button" type="button" onClick={() => publishCategory(category.id)} aria-label={`${category.name} kategorisini yayınla`}><Check size={16} /></button>
                        ) : null}
                        <button className="icon-button" type="button" onClick={() => startEditing(category)} aria-label={`${category.name} kategorisini düzenle`}><NotePencil size={16} /></button>
                        {userRole === "admin" ? (
                          <button className="icon-button" type="button" onClick={() => setCategoryToDelete(category)} aria-label={`${category.name} kategorisini sil`}><Trash size={16} /></button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="panel sticky-panel">
        <header className="panel-header">
          <h2>{editingCategory ? "Kategoriyi düzenle" : "Yeni kategori"}</h2>
        </header>
        <form onSubmit={handleSubmit(saveCategory)} noValidate>
          <div className="panel-body form-stack">
            {errors.root ? (
              <div className="feedback-message feedback-error" role="alert">
                <WarningCircle size={18} /> {errors.root.message}
              </div>
            ) : null}
            <div className="form-field">
              <label className="form-label" htmlFor="category-name">Kategori adı</label>
              <input className="form-control" id="category-name" aria-invalid={Boolean(errors.name)} {...register("name")} />
              {errors.name ? <p className="form-error">{errors.name.message}</p> : null}
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="category-slug">URL kısa adı</label>
              <input className="form-control" id="category-slug" placeholder="Otomatik üretilebilir" {...register("slug")} />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="category-description">Açıklama</label>
              <textarea className="form-textarea" id="category-description" rows={4} {...register("description")} />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="category-order">Görüntüleme sırası</label>
              <input className="form-control" id="category-order" type="number" min="0" {...register("displayOrder")} />
            </div>
            <details>
              <summary className="text-link">SEO alanları</summary>
              <div style={{ marginTop: 16 }}><SeoFields register={register} errors={errors} /></div>
            </details>
          </div>
          <footer className="panel-footer">
            {editingCategory ? <button className="button button-ghost" type="button" onClick={startCreating}>Vazgeç</button> : null}
            <button className="button button-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "Kaydediliyor..." : "Kaydet"}</button>
          </footer>
        </form>
      </section>

      <ConfirmDialog
        isOpen={Boolean(categoryToDelete)}
        title="Kategoriyi sil"
        description={`${categoryToDelete?.name || "Bu kategori"} katalogdan kaldırılacak. Bağlı ürün varsa API işlemi engeller.`}
        confirmLabel="Kategoriyi sil"
        isSubmitting={isDeleting}
        onCancel={() => setCategoryToDelete(null)}
        onConfirm={deleteCategory}
      />
    </div>
  );
}
