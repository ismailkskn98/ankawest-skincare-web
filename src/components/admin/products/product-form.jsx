"use client";

import {
  ArrowClockwise,
  ArrowLeft,
  ImageSquare,
  Trash,
  UploadSimple,
  WarningCircle,
} from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

import SeoFields from "@/components/admin/seo-fields";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { clientApiRequest } from "@/lib/api/client";
import { productFormSchema } from "@/lib/validation/admin";

const imageAccept = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};

function joinLines(values) {
  return Array.isArray(values) ? values.join("\n") : "";
}

function splitLines(value) {
  return value
    .split(/\r?\n/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function normalizeImages(images) {
  if (Array.isArray(images)) {
    return images;
  }

  if (typeof images !== "string") {
    return [];
  }

  try {
    const parsedImages = JSON.parse(images);
    return Array.isArray(parsedImages) ? parsedImages : [];
  } catch {
    return [];
  }
}

function buildDefaultValues(product) {
  return {
    categoryId: product?.categoryId ? String(product.categoryId) : "",
    brand: product?.brand || "Anka West Skincare",
    name: product?.name || "",
    slug: product?.slug || "",
    sku: product?.sku || "",
    sizeLabel: product?.sizeLabel || "",
    shortDescription: product?.shortDescription || "",
    description: product?.description || "",
    benefitsText: joinLines(product?.benefits),
    activeIngredientsText: joinLines(product?.activeIngredients),
    suitableForText: joinLines(product?.suitableFor),
    usageInstructions: product?.usageInstructions || "",
    warnings: product?.warnings || "",
    internalNote: product?.internalNote || "",
    status: product?.status || "draft",
    isFeatured: Boolean(product?.isFeatured),
    homepageCarousel1: Boolean(product?.homepageCarousel1),
    homepageCarousel2: Boolean(product?.homepageCarousel2),
    carousel1Order: product?.carousel1Order ?? 0,
    carousel2Order: product?.carousel2Order ?? 0,
    displayOrder: product?.displayOrder ?? 0,
    seoTitle: product?.seoTitle || "",
    seoDescription: product?.seoDescription || "",
    seoKeywordsText: product?.seoKeywords || "",
    canonicalUrl: product?.canonicalUrl || "",
    ogTitle: product?.ogTitle || "",
    ogDescription: product?.ogDescription || "",
    ogImageUrl: product?.ogImageUrl || "",
  };
}

function toProductPayload(values) {
  const {
    benefitsText,
    activeIngredientsText,
    suitableForText,
    seoKeywordsText,
    ...fields
  } = values;

  return {
    ...fields,
    benefits: splitLines(benefitsText),
    activeIngredients: splitLines(activeIngredientsText),
    suitableFor: splitLines(suitableForText),
    seoKeywords: seoKeywordsText.trim() || null,
  };
}

export default function ProductForm({ categories, product = null, userRole }) {
  const router = useRouter();
  const previewUrlsRef = useRef(new Set());
  const [selectedImages, setSelectedImages] = useState({ cover: null, hover: null });
  const [existingImages, setExistingImages] = useState(() =>
    normalizeImages(product?.images).filter((image) => image.source !== "trendyol"),
  );
  const [savedProductId, setSavedProductId] = useState(product?.id || null);
  const [pendingImageId, setPendingImageId] = useState(null);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [activeTab, setActiveTab] = useState("general");
  const isEditing = Boolean(savedProductId);
  const isTrendyol = product?.source === "trendyol";
  const existingCoverImage = existingImages.find(
    (image) => image.role === "cover" || image.isPrimary,
  );
  const existingHoverImage = existingImages.find(
    (image) => image.role === "hover" || (!image.role && !image.isPrimary),
  );
  const hasSelectedImages = Boolean(selectedImages.cover || selectedImages.hover);
  const trendyolMedia = normalizeImages(product?.media).filter(
    (media) => media.source === "trendyol",
  );
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: buildDefaultValues(product),
  });

  useEffect(() => {
    const previewUrls = previewUrlsRef.current;
    return () => previewUrls.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  useEffect(() => {
    function warnAboutUnsavedChanges(event) {
      if (!isDirty && !hasSelectedImages) return;
      event.preventDefault();
    }

    window.addEventListener("beforeunload", warnAboutUnsavedChanges);
    return () => window.removeEventListener("beforeunload", warnAboutUnsavedChanges);
  }, [hasSelectedImages, isDirty]);

  function handleAcceptedImage(role, files) {
    setUploadError("");
    const file = files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    previewUrlsRef.current.add(preview);
    setSelectedImages((current) => {
      if (current[role]?.preview) {
        URL.revokeObjectURL(current[role].preview);
        previewUrlsRef.current.delete(current[role].preview);
      }

      return { ...current, [role]: { file, preview } };
    });
  }

  const coverDropzone = useDropzone({
    accept: imageAccept,
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    multiple: false,
    onDropAccepted: (files) => handleAcceptedImage("cover", files),
    onDropRejected: () => {
      setUploadError(
        "Kapak görseli JPEG, PNG veya WebP formatında ve en fazla 5 MB olmalıdır.",
      );
    },
  });

  const hoverDropzone = useDropzone({
    accept: imageAccept,
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    multiple: false,
    onDropAccepted: (files) => handleAcceptedImage("hover", files),
    onDropRejected: () => {
      setUploadError(
        "Hover görseli JPEG, PNG veya WebP formatında ve en fazla 5 MB olmalıdır.",
      );
    },
  });

  function removeSelectedImage(role) {
    const image = selectedImages[role];
    if (!image) return;

    URL.revokeObjectURL(image.preview);
    previewUrlsRef.current.delete(image.preview);
    setSelectedImages((current) => ({ ...current, [role]: null }));
  }

  async function deleteExistingImage() {
    if (!imageToDelete || userRole !== "admin") {
      return;
    }

    setPendingImageId(imageToDelete.id);
    setUploadError("");

    try {
      await clientApiRequest(
        `/api/admin/products/${savedProductId}/images/delete/${imageToDelete.id}`,
        { method: "DELETE" },
      );
      setExistingImages((current) => {
        return current.filter(
          (image) => String(image.id) !== String(imageToDelete.id),
        );
      });
      setImageToDelete(null);
      setFormMessage("Ürün görseli kaldırıldı.");
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setPendingImageId(null);
    }
  }

  async function saveProduct(values) {
    setFormMessage("");
    setUploadError("");

    if (!existingCoverImage && !selectedImages.cover) {
      setUploadError("Ürün kartı için bir kapak görseli seçmelisiniz.");
      setActiveTab("media");
      return;
    }

    const endpoint = isEditing
      ? `/api/admin/products/update/${savedProductId}`
      : "/api/admin/products/create";

    try {
      const payload = await clientApiRequest(endpoint, {
        method: isEditing ? "PUT" : "POST",
        body: toProductPayload(values),
      });
      const currentProductId = savedProductId || payload?.data?.id;

      if (!currentProductId) {
        throw new Error("Kaydedilen ürün kimliği alınamadı.");
      }

      if (!savedProductId) {
        setSavedProductId(currentProductId);
      }

      const selectedImageEntries = Object.entries(selectedImages).filter(
        ([, image]) => Boolean(image),
      );

      if (selectedImageEntries.length > 0) {
        const formData = new FormData();
        selectedImageEntries.forEach(([, image]) => {
          formData.append("images", image.file);
        });
        formData.append(
          "altTexts",
          JSON.stringify(selectedImageEntries.map(() => values.name)),
        );
        formData.append(
          "roles",
          JSON.stringify(selectedImageEntries.map(([role]) => role)),
        );

        try {
          await clientApiRequest(
            `/api/admin/products/${currentProductId}/images/create`,
            { method: "POST", body: formData },
          );
        } catch (error) {
          setUploadError(
            `Ürün kaydedildi ancak görseller yüklenemedi: ${error.message}`,
          );
          setFormMessage("Ürün bilgileri kaydedildi.");
          return;
        }
      }

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      setError("root", { message: error.message });
    }
  }

  return (
    <form className="form-stack" onSubmit={handleSubmit(saveProduct)} noValidate>
      <div className="product-save-bar">
        <Link className="button button-secondary" href="/admin/products">
          <ArrowLeft size={17} aria-hidden="true" />
          Ürünlere dön
        </Link>
        <div className="product-save-status">
          {isDirty || hasSelectedImages ? <span><i aria-hidden="true" /> Kaydedilmemiş değişiklikler</span> : null}
          <button className="button button-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <><ArrowClockwise className="spin" size={16} /> Kaydediliyor</> : isEditing ? "Değişiklikleri kaydet" : "Ürünü kaydet"}
          </button>
        </div>
      </div>

      {errors.root ? (
        <div className="feedback-message feedback-error" role="alert">
          <WarningCircle size={18} aria-hidden="true" />
          <span>{errors.root.message}</span>
        </div>
      ) : null}
      {formMessage ? (
        <div className="feedback-message feedback-success" role="status">
          {formMessage}
        </div>
      ) : null}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="product-form-tabs">
        <TabsList className="product-section-nav" aria-label="Ürün formu bölümleri">
          <TabsTrigger value="general">Genel</TabsTrigger>
          <TabsTrigger value="publication">Yayın</TabsTrigger>
          <TabsTrigger value="content">Ürün bilgileri</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="media">Medya</TabsTrigger>
          {isTrendyol ? <TabsTrigger value="integration">Entegrasyon</TabsTrigger> : null}
        </TabsList>

        <section className="panel product-form-panel">
          <TabsContent value="general" className="product-form-tab-content">
            <div className="form-section">
          <div className="form-section-heading">
            <h2>Temel bilgiler</h2>
            <p>Katalogda ve ürün detayında kullanılan ana ürün bilgileri.</p>
          </div>
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label" htmlFor="product-name">Ürün adı</label>
              <input
                className="form-control"
                id="product-name"
                aria-invalid={Boolean(errors.name)}
                {...register("name")}
              />
              {errors.name ? <p className="form-error">{errors.name.message}</p> : null}
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="product-category">Kategori</label>
              <select
                className="form-select"
                id="product-category"
                aria-invalid={Boolean(errors.categoryId)}
                {...register("categoryId")}
              >
                <option value="">Kategori seçin</option>
                {categories.map((category) => (
                  <option value={String(category.id)} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId ? (
                <p className="form-error">{errors.categoryId.message}</p>
              ) : null}
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="product-brand">Marka</label>
              <input className="form-control" id="product-brand" {...register("brand")} />
              {errors.brand ? <p className="form-error">{errors.brand.message}</p> : null}
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="product-slug">URL kısa adı</label>
              <input
                className="form-control"
                id="product-slug"
                placeholder="Boş bırakılırsa otomatik üretilir"
                {...register("slug")}
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="product-sku">SKU</label>
              <input className="form-control" id="product-sku" {...register("sku")} />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="product-size">Boyut / hacim</label>
              <input
                className="form-control"
                id="product-size"
                placeholder="Örn. 50 ml"
                {...register("sizeLabel")}
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="product-order">Görüntüleme sırası</label>
              <input
                className="form-control"
                id="product-order"
                type="number"
                min="0"
                {...register("displayOrder")}
              />
            </div>
            <label className="checkbox-field" style={{ alignSelf: "end", minHeight: 42 }}>
              <input type="checkbox" {...register("isFeatured")} />
              Öne çıkan ürün olarak göster
            </label>
          </div>
        </div>

          </TabsContent>

          <TabsContent value="publication" className="product-form-tab-content">
            <div className="form-section">
          <div className="form-section-heading">
            <h2>Website yayını ve ana sayfa</h2>
            <p>Her carousel en fazla 6 ürün içerebilir. Limit backend tarafından da doğrulanır.</p>
          </div>
          <div className="publication-form-layout">
            <div className="form-field publication-status-field">
              <label className="form-label" htmlFor="product-status">Yayın durumu</label>
              <select className="form-select" id="product-status" disabled={!isEditing} {...register("status")}>
                <option value="draft">Taslak</option>
                <option value="published">Yayında</option>
              </select>
              {!isEditing ? <p className="form-hint">Yeni ürünler ilk kayıtta taslak oluşturulur.</p> : null}
              {isTrendyol && !existingCoverImage && !selectedImages.cover ? (
                <p className="form-hint">Yayınlamak için önce website kapak görseli yükleyin.</p>
              ) : null}
            </div>
            <div className="carousel-settings-grid">
              <div className="carousel-setting">
                <label className="checkbox-field">
                  <input type="checkbox" {...register("homepageCarousel1")} />
                  Anasayfa Carousel 1&apos;de göster
                </label>
                <div className="form-field">
                  <label className="form-label" htmlFor="carousel-1-order">Gösterim sırası</label>
                  <input className="form-control" id="carousel-1-order" type="number" min="0" {...register("carousel1Order")} />
                </div>
              </div>
              <div className="carousel-setting">
                <label className="checkbox-field">
                  <input type="checkbox" {...register("homepageCarousel2")} />
                  Anasayfa Carousel 2&apos;de göster
                </label>
                <div className="form-field">
                  <label className="form-label" htmlFor="carousel-2-order">Gösterim sırası</label>
                  <input className="form-control" id="carousel-2-order" type="number" min="0" {...register("carousel2Order")} />
                </div>
              </div>
            </div>
          </div>
        </div>

          </TabsContent>

          <TabsContent value="content" className="product-form-tab-content">
            <div className="form-section">
          <div className="form-section-heading">
            <h2>Ürün içeriği</h2>
            <p>Her liste alanında bir öğeyi ayrı satıra yazın.</p>
          </div>
          <div className="form-grid">
            <div className="form-field form-field-full">
              <label className="form-label" htmlFor="short-description">Kısa açıklama</label>
              <textarea
                className="form-textarea"
                id="short-description"
                rows={3}
                {...register("shortDescription")}
              />
            </div>
            <div className="form-field form-field-full">
              <label className="form-label" htmlFor="description">Detaylı açıklama</label>
              <textarea
                className="form-textarea"
                id="description"
                rows={7}
                {...register("description")}
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="benefits">Faydalar</label>
              <textarea className="form-textarea" id="benefits" rows={6} {...register("benefitsText")} />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="ingredients">Aktif içerikler</label>
              <textarea
                className="form-textarea"
                id="ingredients"
                rows={6}
                {...register("activeIngredientsText")}
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="suitable-for">Kimler için uygun</label>
              <textarea
                className="form-textarea"
                id="suitable-for"
                rows={5}
                {...register("suitableForText")}
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="usage">Kullanım talimatı</label>
              <textarea className="form-textarea" id="usage" rows={5} {...register("usageInstructions")} />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="warnings">Uyarılar</label>
              <textarea className="form-textarea" id="warnings" rows={4} {...register("warnings")} />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="internal-note">Dahili not</label>
              <textarea
                className="form-textarea"
                id="internal-note"
                rows={4}
                {...register("internalNote")}
              />
            </div>
          </div>
        </div>

          </TabsContent>

          <TabsContent value="seo" className="product-form-tab-content">
            <div className="form-section">
          <div className="form-section-heading">
            <h2>Arama ve sosyal paylaşım</h2>
            <p>Boş bırakılan alanlar ürünün temel bilgilerinden üretilebilir.</p>
          </div>
          <details className="advanced-fields" open>
            <summary>SEO ve sosyal paylaşım alanlarını düzenle</summary>
            <div className="advanced-fields-body"><SeoFields register={register} errors={errors} /></div>
          </details>
        </div>

          </TabsContent>

          <TabsContent value="media" className="product-form-tab-content">
            <div className="form-section product-media-section">
              <div className="form-section-heading">
                <h2>Ürün kartı görselleri</h2>
                <p>Kapak görseli zorunludur. Hover görseli eklenirse kartın üzerine gelindiğinde gösterilir.</p>
              </div>

              <div className="product-image-slots">
                <section className="product-image-slot" aria-labelledby="cover-image-title">
                  <div className="product-image-slot-heading">
                    <div>
                      <h3 id="cover-image-title">Kapak görseli</h3>
                      <p>Ürün kartlarında varsayılan olarak görünür.</p>
                    </div>
                    <span className="badge badge-neutral">Zorunlu</span>
                  </div>

                  <figure className="product-image-slot-preview">
                    {selectedImages.cover ? (
                      <Image
                        src={selectedImages.cover.preview}
                        alt={selectedImages.cover.file.name}
                        fill
                        sizes="(max-width: 900px) 100vw, 40vw"
                        unoptimized
                      />
                    ) : existingCoverImage ? (
                      // Dinamik API görselleri Next optimizer izin listesinden bağımsız yüklenir.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className="absolute inset-0 h-full w-full object-contain"
                        src={existingCoverImage.imageUrl}
                        alt={existingCoverImage.altText || product?.name || "Kapak görseli"}
                      />
                    ) : (
                      <div className="product-image-slot-empty">
                        <ImageSquare size={30} aria-hidden="true" />
                        <span>Henüz kapak görseli yok</span>
                      </div>
                    )}
                    {selectedImages.cover ? (
                      <button
                        className="product-image-remove"
                        type="button"
                        onClick={() => removeSelectedImage("cover")}
                        aria-label="Seçilen kapak görselini kaldır"
                      >
                        <Trash size={16} aria-hidden="true" />
                      </button>
                    ) : null}
                  </figure>

                  <div
                    {...coverDropzone.getRootProps({
                      className: "dropzone product-image-dropzone",
                      "data-active": coverDropzone.isDragActive,
                    })}
                  >
                    <input {...coverDropzone.getInputProps()} />
                    <UploadSimple size={22} aria-hidden="true" />
                    <div>
                      <strong>{coverDropzone.isDragActive ? "Görseli bırakın" : existingCoverImage ? "Kapak görselini değiştir" : "Kapak görseli seç"}</strong>
                      <span>JPEG, PNG veya WebP · En fazla 5 MB</span>
                    </div>
                  </div>
                </section>

                <section className="product-image-slot" aria-labelledby="hover-image-title">
                  <div className="product-image-slot-heading">
                    <div>
                      <h3 id="hover-image-title">Hover görseli</h3>
                      <p>Fareyle kartın üzerine gelindiğinde kapak yerine görünür.</p>
                    </div>
                    <span className="badge badge-sage">Opsiyonel</span>
                  </div>

                  <figure className="product-image-slot-preview">
                    {selectedImages.hover ? (
                      <Image
                        src={selectedImages.hover.preview}
                        alt={selectedImages.hover.file.name}
                        fill
                        sizes="(max-width: 900px) 100vw, 40vw"
                        unoptimized
                      />
                    ) : existingHoverImage ? (
                      // Dinamik API görselleri Next optimizer izin listesinden bağımsız yüklenir.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className="absolute inset-0 h-full w-full object-contain"
                        src={existingHoverImage.imageUrl}
                        alt={existingHoverImage.altText || product?.name || "Hover görseli"}
                      />
                    ) : (
                      <div className="product-image-slot-empty">
                        <ImageSquare size={30} aria-hidden="true" />
                        <span>Hover görseli eklenmedi</span>
                      </div>
                    )}
                    {selectedImages.hover ? (
                      <button
                        className="product-image-remove"
                        type="button"
                        onClick={() => removeSelectedImage("hover")}
                        aria-label="Seçilen hover görselini kaldır"
                      >
                        <Trash size={16} aria-hidden="true" />
                      </button>
                    ) : existingHoverImage && userRole === "admin" ? (
                      <button
                        className="product-image-remove"
                        type="button"
                        onClick={() => setImageToDelete(existingHoverImage)}
                        disabled={pendingImageId !== null}
                        aria-label="Hover görselini kaldır"
                      >
                        <Trash size={16} aria-hidden="true" />
                      </button>
                    ) : null}
                  </figure>

                  <div
                    {...hoverDropzone.getRootProps({
                      className: "dropzone product-image-dropzone",
                      "data-active": hoverDropzone.isDragActive,
                    })}
                  >
                    <input {...hoverDropzone.getInputProps()} />
                    <UploadSimple size={22} aria-hidden="true" />
                    <div>
                      <strong>{hoverDropzone.isDragActive ? "Görseli bırakın" : existingHoverImage ? "Hover görselini değiştir" : "Hover görseli ekle"}</strong>
                      <span>İsteğe bağlı · JPEG, PNG veya WebP · En fazla 5 MB</span>
                    </div>
                  </div>
                </section>
              </div>

              {uploadError ? (
                <p className="feedback-message feedback-error" role="alert">
                  <WarningCircle size={18} aria-hidden="true" />
                  {uploadError}
                </p>
              ) : null}
            </div>
          </TabsContent>

          {isTrendyol ? (
            <TabsContent value="integration" forceMount className="product-form-tab-content">
              <div className="form-section">
                <div className="form-section-heading product-integration-heading">
                  <div>
                    <h2><span className="badge badge-neutral">Trendyol</span> Entegrasyon bilgileri</h2>
                    <p>Bu alanlar senkronizasyon tarafından güncellenir; website yayını ve görselleri bu panelden yönetilir.</p>
                  </div>
                  <span className="badge badge-sage">{product.syncStatus === "success" ? "Senkronize" : product.syncStatus || "Bekliyor"}</span>
                </div>
                <dl className="integration-meta">
                  <div><dt>Content ID</dt><dd>{product.trendyolContentId || "-"}</dd></div>
                  <div><dt>Product Main ID</dt><dd>{product.trendyolProductMainId || "-"}</dd></div>
                  <div><dt>Barkod</dt><dd>{product.trendyolBarcode || "-"}</dd></div>
                  <div><dt>Sync</dt><dd>{product.syncStatus || "pending"}</dd></div>
                </dl>
              </div>

              {trendyolMedia.length > 0 ? (
                <div className="form-section">
                  <div className="form-section-heading">
                    <h2>Trendyol detay medyası</h2>
                    <p>Bu remote görsel ve videolar sync tarafından yönetilir; sunucuya indirilmez.</p>
                  </div>
                  <ul className="integration-media-list">
                    {trendyolMedia.map((media, mediaIndex) => {
                      const mediaUrl = media.url || media.imageUrl;
                      const isVideo = media.type === "video";

                      return (
                        <li key={media.externalId || media.id}>
                          {isVideo ? (
                            <div className="integration-media-preview integration-media-preview-video">
                              Video önizlemesi
                            </div>
                          ) : (
                            <a
                              className="integration-media-preview"
                              href={mediaUrl}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="Trendyol ürün görselini yeni sekmede aç"
                            >
                              {/* Trendyol CDN adresleri değişken olduğu için Next Image yapılandırmasına bağlı kalma. */}
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={mediaUrl}
                                alt="Trendyol ürün görseli"
                                loading="eager"
                                fetchPriority={mediaIndex < 3 ? "high" : "auto"}
                                decoding="async"
                                referrerPolicy="no-referrer"
                                onLoad={(event) => {
                                  event.currentTarget
                                    .closest(".integration-media-preview")
                                    ?.setAttribute("data-image-loaded", "true");
                                }}
                                onError={(event) => {
                                  event.currentTarget
                                    .closest(".integration-media-preview")
                                    ?.setAttribute("data-image-error", "true");
                                }}
                              />
                            </a>
                          )}
                          <div className="integration-media-card-footer">
                            <span className="badge badge-neutral">{isVideo ? "Video" : "Görsel"}</span>
                            <a href={mediaUrl} target="_blank" rel="noreferrer">Medyayı aç</a>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </TabsContent>
          ) : null}
        </section>
      </Tabs>

      <div className="page-actions">
        <Link className="button button-secondary" href="/admin/products">Vazgeç</Link>
        <button className="button button-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Kaydediliyor..." : isEditing ? "Değişiklikleri kaydet" : "Ürünü kaydet"}
        </button>
      </div>

      <ConfirmDialog
        isOpen={Boolean(imageToDelete)}
        title="Hover görselini kaldır"
        description="Hover görseli kaldırılacak. Ürün kartı kapak görseliyle çalışmaya devam eder."
        confirmLabel="Hover görselini kaldır"
        isSubmitting={pendingImageId !== null}
        onCancel={() => setImageToDelete(null)}
        onConfirm={deleteExistingImage}
      />
    </form>
  );
}
