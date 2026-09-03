"use client";

import {
  ArrowLeft,
  CheckCircle,
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
    isFeatured: Boolean(product?.isFeatured),
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
  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState(() =>
    normalizeImages(product?.images),
  );
  const [savedProductId, setSavedProductId] = useState(product?.id || null);
  const [pendingImageId, setPendingImageId] = useState(null);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const isEditing = Boolean(savedProductId);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: buildDefaultValues(product),
  });

  useEffect(() => {
    const previewUrls = previewUrlsRef.current;
    return () => previewUrls.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  function handleAcceptedImages(files) {
    setUploadError("");
    const availableSlots = 8 - selectedImages.length;

    if (availableSlots <= 0) {
      setUploadError("En fazla 8 yeni görsel seçebilirsiniz.");
      return;
    }

    const newImages = files.slice(0, availableSlots).map((file) => {
      const preview = URL.createObjectURL(file);
      previewUrlsRef.current.add(preview);
      return { file, preview };
    });

    setSelectedImages((current) => [...current, ...newImages]);

    if (files.length > availableSlots) {
      setUploadError("En fazla 8 yeni görsel seçebilirsiniz.");
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: imageAccept,
    maxFiles: 8,
    maxSize: 5 * 1024 * 1024,
    multiple: true,
    onDropAccepted: handleAcceptedImages,
    onDropRejected: () => {
      setUploadError(
        "Yalnızca JPEG, PNG veya WebP formatında ve en fazla 5 MB görseller seçin.",
      );
    },
  });

  function removeImage(preview) {
    URL.revokeObjectURL(preview);
    previewUrlsRef.current.delete(preview);
    setSelectedImages((current) =>
      current.filter((image) => image.preview !== preview),
    );
  }

  async function makeImagePrimary(imageId) {
    setPendingImageId(imageId);
    setUploadError("");

    try {
      await clientApiRequest(
        `/api/admin/products/${savedProductId}/images/update/${imageId}`,
        { method: "PUT", body: { isPrimary: true } },
      );
      setExistingImages((current) =>
        current.map((image) => ({
          ...image,
          isPrimary: String(image.id) === String(imageId),
        })),
      );
      setFormMessage("Birincil ürün görseli güncellendi.");
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setPendingImageId(null);
    }
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
        const remainingImages = current.filter(
          (image) => String(image.id) !== String(imageToDelete.id),
        );

        if (
          imageToDelete.isPrimary &&
          remainingImages.length > 0 &&
          !remainingImages.some((image) => image.isPrimary)
        ) {
          return remainingImages.map((image, index) => ({
            ...image,
            isPrimary: index === 0,
          }));
        }

        return remainingImages;
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

      if (selectedImages.length > 0) {
        const formData = new FormData();
        selectedImages.forEach(({ file }) => formData.append("images", file));
        formData.append(
          "altTexts",
          JSON.stringify(selectedImages.map(() => values.name)),
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
      <div className="page-actions" style={{ justifyContent: "space-between" }}>
        <Link className="button button-secondary" href="/admin/products">
          <ArrowLeft size={17} aria-hidden="true" />
          Ürünlere dön
        </Link>
        <button className="button button-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Kaydediliyor..." : isEditing ? "Değişiklikleri kaydet" : "Ürünü kaydet"}
        </button>
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

      <section className="panel">
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

        <div className="form-section">
          <div className="form-section-heading">
            <h2>Arama ve sosyal paylaşım</h2>
            <p>Boş bırakılan alanlar ürünün temel bilgilerinden üretilebilir.</p>
          </div>
          <SeoFields register={register} errors={errors} />
        </div>

        <div className="form-section">
          <div className="form-section-heading">
            <h2>Ürün görselleri</h2>
            <p>JPEG, PNG veya WebP; en fazla 8 yeni görsel ve görsel başına 5 MB.</p>
          </div>
          {existingImages.length > 0 ? (
            <div className="image-preview-grid" aria-label="Kayıtlı ürün görselleri">
              {existingImages.map((image) => (
                <figure className="image-preview" key={image.id}>
                  <Image
                    src={image.imageUrl}
                    alt={image.altText || product?.name || "Ürün görseli"}
                    fill
                    sizes="160px"
                  />
                  {image.isPrimary ? (
                    <span className="image-primary-badge">Birincil</span>
                  ) : null}
                  <div className="image-preview-toolbar">
                    {!image.isPrimary ? (
                      <button
                        type="button"
                        onClick={() => makeImagePrimary(image.id)}
                        disabled={pendingImageId !== null}
                        aria-label={`${image.altText || "Ürün görselini"} birincil yap`}
                        title="Birincil yap"
                      >
                        <CheckCircle size={15} aria-hidden="true" />
                      </button>
                    ) : null}
                    {userRole === "admin" ? (
                      <button
                        type="button"
                        onClick={() => setImageToDelete(image)}
                        disabled={pendingImageId !== null}
                        aria-label={`${image.altText || "Ürün görselini"} kaldır`}
                        title="Görseli kaldır"
                      >
                        <Trash size={15} aria-hidden="true" />
                      </button>
                    ) : null}
                  </div>
                </figure>
              ))}
            </div>
          ) : null}
          <div {...getRootProps({ className: "dropzone", "data-active": isDragActive })}>
            <input {...getInputProps()} />
            <div>
              <UploadSimple size={25} aria-hidden="true" />
              <strong>{isDragActive ? "Görselleri bırakın" : "Görselleri seçin veya sürükleyin"}</strong>
              <span>Seçilen dosyalar ürün kaydedildikten sonra yüklenir.</span>
            </div>
          </div>
          {uploadError ? (
            <p className="feedback-message feedback-error" role="alert">
              <WarningCircle size={18} aria-hidden="true" />
              {uploadError}
            </p>
          ) : null}
          {selectedImages.length > 0 ? (
            <div className="image-preview-grid" aria-label="Seçilen görseller">
              {selectedImages.map(({ file, preview }) => (
                <figure className="image-preview" key={preview}>
                  <Image src={preview} alt={file.name} fill sizes="160px" unoptimized />
                  <button type="button" onClick={() => removeImage(preview)} aria-label={`${file.name} görselini kaldır`}>
                    <Trash size={15} aria-hidden="true" />
                  </button>
                </figure>
              ))}
            </div>
          ) : (
            <p className="form-hint" style={{ marginTop: 10 }}>
              <ImageSquare size={16} aria-hidden="true" /> Henüz yeni görsel seçilmedi.
            </p>
          )}
        </div>
      </section>

      <div className="page-actions">
        <Link className="button button-secondary" href="/admin/products">Vazgeç</Link>
        <button className="button button-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Kaydediliyor..." : isEditing ? "Değişiklikleri kaydet" : "Ürünü kaydet"}
        </button>
      </div>

      <ConfirmDialog
        isOpen={Boolean(imageToDelete)}
        title="Ürün görselini kaldır"
        description="Bu görsel ürün galerisinden kaldırılacak. Kaldırma işlemi sonrasında görsel panelde gösterilmez."
        confirmLabel="Görseli kaldır"
        isSubmitting={pendingImageId !== null}
        onCancel={() => setImageToDelete(null)}
        onConfirm={deleteExistingImage}
      />
    </form>
  );
}
