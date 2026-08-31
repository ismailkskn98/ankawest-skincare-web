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
import { siteContentFormSchema } from "@/lib/validation/admin";

const emptyValues = {
  section: "",
  contentKey: "",
  title: "",
  body: "",
  metadataText: "{}",
  displayOrder: 0,
  seoTitle: "",
  seoDescription: "",
  seoKeywordsText: "",
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: "",
  ogImageUrl: "",
};

function toFormValues(content) {
  return {
    ...emptyValues,
    ...content,
    metadataText: JSON.stringify(content?.metadata || {}, null, 2),
    seoKeywordsText: content?.seoKeywords || "",
  };
}

function toPayload(values) {
  const { metadataText, seoKeywordsText, ...fields } = values;
  const metadata = metadataText.trim() ? JSON.parse(metadataText) : {};

  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    throw new Error("Metadata nesne olmalıdır.");
  }

  return {
    ...fields,
    metadata,
    seoKeywords: seoKeywordsText.trim() || null,
  };
}

export default function ContentManager({ initialRecords, userRole }) {
  const [records, setRecords] = useState(initialRecords);
  const [editingContent, setEditingContent] = useState(null);
  const [contentToDelete, setContentToDelete] = useState(null);
  const [message, setMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(siteContentFormSchema),
    defaultValues: emptyValues,
  });

  async function reloadContents() {
    const payload = await clientApiRequest(
      "/api/admin/site-contents/list?limit=100&sortBy=displayOrder&sortOrder=asc",
    );
    setRecords(payload?.data?.records || []);
  }

  function startCreating() {
    setEditingContent(null);
    reset(emptyValues);
  }

  function startEditing(content) {
    setEditingContent(content);
    reset(toFormValues(content));
    setMessage("");
  }

  async function saveContent(values) {
    let body;

    try {
      body = toPayload(values);
    } catch {
      setError("metadataText", { message: "Metadata geçerli bir JSON nesnesi olmalıdır." });
      return;
    }

    const endpoint = editingContent
      ? `/api/admin/site-contents/update/${editingContent.id}`
      : "/api/admin/site-contents/create";

    try {
      const payload = await clientApiRequest(endpoint, {
        method: editingContent ? "PUT" : "POST",
        body,
      });
      setMessage(payload.message || "İçerik kaydedildi.");
      await reloadContents();
      startCreating();
    } catch (error) {
      setError("root", { message: error.message });
    }
  }

  async function publishContent(contentId) {
    try {
      await clientApiRequest(`/api/admin/site-contents/publish/${contentId}`, {
        method: "PUT",
        body: {},
      });
      await reloadContents();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function deleteContent() {
    if (!contentToDelete) return;
    setIsDeleting(true);

    try {
      await clientApiRequest(`/api/admin/site-contents/delete/${contentToDelete.id}`, {
        method: "DELETE",
      });
      setContentToDelete(null);
      await reloadContents();
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
          <h2>İçerik listesi</h2>
          <button className="button button-secondary button-small" type="button" onClick={startCreating}>
            <Plus size={15} aria-hidden="true" /> Yeni içerik
          </button>
        </header>
        {message ? <div className="feedback-message feedback-info" role="status" style={{ margin: 14 }}>{message}</div> : null}
        {records.length === 0 ? (
          <EmptyState title="Yönetilebilir içerik bulunmuyor" description="Site bölümlerinde kullanılacak ilk içerik kaydını oluşturun." />
        ) : (
          <div className="table-scroll">
            <table className="data-table">
              <thead><tr><th>İçerik</th><th>Bölüm</th><th>Durum</th><th><span className="sr-only">İşlemler</span></th></tr></thead>
              <tbody>
                {records.map((content) => (
                  <tr key={content.id}>
                    <td><span className="table-primary">{content.title || content.contentKey}</span><span className="table-secondary">{content.contentKey}</span></td>
                    <td>{content.section}</td>
                    <td><StatusBadge status={content.status} /></td>
                    <td>
                      <div className="table-actions">
                        {content.status !== "published" ? <button className="icon-button" type="button" onClick={() => publishContent(content.id)} aria-label={`${content.contentKey} içeriğini yayınla`}><Check size={16} /></button> : null}
                        <button className="icon-button" type="button" onClick={() => startEditing(content)} aria-label={`${content.contentKey} içeriğini düzenle`}><NotePencil size={16} /></button>
                        {userRole === "admin" ? <button className="icon-button" type="button" onClick={() => setContentToDelete(content)} aria-label={`${content.contentKey} içeriğini sil`}><Trash size={16} /></button> : null}
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
        <header className="panel-header"><h2>{editingContent ? "İçeriği düzenle" : "Yeni içerik"}</h2></header>
        <form onSubmit={handleSubmit(saveContent)} noValidate>
          <div className="panel-body form-stack">
            {errors.root ? <div className="feedback-message feedback-error" role="alert"><WarningCircle size={18} /> {errors.root.message}</div> : null}
            <div className="form-field">
              <label className="form-label" htmlFor="content-section">Bölüm</label>
              <input className="form-control" id="content-section" placeholder="Örn. homepage" aria-invalid={Boolean(errors.section)} {...register("section")} />
              {errors.section ? <p className="form-error">{errors.section.message}</p> : null}
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="content-key">İçerik anahtarı</label>
              <input className="form-control" id="content-key" placeholder="homepage.hero.title" aria-invalid={Boolean(errors.contentKey)} {...register("contentKey")} />
              {errors.contentKey ? <p className="form-error">{errors.contentKey.message}</p> : null}
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="content-title">Başlık</label>
              <input className="form-control" id="content-title" {...register("title")} />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="content-body">İçerik</label>
              <textarea className="form-textarea" id="content-body" rows={8} aria-invalid={Boolean(errors.body)} {...register("body")} />
              {errors.body ? <p className="form-error">{errors.body.message}</p> : null}
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="content-metadata">Metadata (JSON)</label>
              <textarea className="form-textarea" id="content-metadata" rows={5} spellCheck="false" aria-invalid={Boolean(errors.metadataText)} {...register("metadataText")} />
              {errors.metadataText ? <p className="form-error">{errors.metadataText.message}</p> : null}
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="content-order">Görüntüleme sırası</label>
              <input className="form-control" id="content-order" type="number" min="0" {...register("displayOrder")} />
            </div>
            <details>
              <summary className="text-link">SEO alanları</summary>
              <div style={{ marginTop: 16 }}><SeoFields register={register} errors={errors} /></div>
            </details>
          </div>
          <footer className="panel-footer">
            {editingContent ? <button className="button button-ghost" type="button" onClick={startCreating}>Vazgeç</button> : null}
            <button className="button button-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "Kaydediliyor..." : "Kaydet"}</button>
          </footer>
        </form>
      </section>

      <ConfirmDialog isOpen={Boolean(contentToDelete)} title="İçeriği kaldır" description={`${contentToDelete?.contentKey || "Bu içerik"} yayından ve yönetim listesinden kaldırılacak.`} confirmLabel="İçeriği kaldır" isSubmitting={isDeleting} onCancel={() => setContentToDelete(null)} onConfirm={deleteContent} />
    </div>
  );
}
