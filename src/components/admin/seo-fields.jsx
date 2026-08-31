export default function SeoFields({ register, errors }) {
  return (
    <div className="form-grid">
      <div className="form-field">
        <label className="form-label" htmlFor="seo-title">
          SEO başlığı
        </label>
        <input
          className="form-control"
          id="seo-title"
          maxLength={70}
          aria-invalid={Boolean(errors.seoTitle)}
          {...register("seoTitle")}
        />
        {errors.seoTitle ? <p className="form-error">{errors.seoTitle.message}</p> : null}
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="canonical-url">
          Canonical URL
        </label>
        <input
          className="form-control"
          id="canonical-url"
          type="url"
          placeholder="https://..."
          aria-invalid={Boolean(errors.canonicalUrl)}
          {...register("canonicalUrl")}
        />
      </div>
      <div className="form-field form-field-full">
        <label className="form-label" htmlFor="seo-description">
          SEO açıklaması
        </label>
        <textarea
          className="form-textarea"
          id="seo-description"
          maxLength={170}
          rows={3}
          aria-invalid={Boolean(errors.seoDescription)}
          {...register("seoDescription")}
        />
      </div>
      <div className="form-field form-field-full">
        <label className="form-label" htmlFor="seo-keywords">
          SEO anahtar kelimeleri
        </label>
        <textarea
          className="form-textarea"
          id="seo-keywords"
          rows={3}
          placeholder="Örn. cilt bakımı, nemlendirici, hassas cilt"
          {...register("seoKeywordsText")}
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="og-title">
          Sosyal paylaşım başlığı
        </label>
        <input
          className="form-control"
          id="og-title"
          maxLength={95}
          {...register("ogTitle")}
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="og-image-url">
          Sosyal paylaşım görsel adresi
        </label>
        <input
          className="form-control"
          id="og-image-url"
          type="url"
          placeholder="https://..."
          {...register("ogImageUrl")}
        />
      </div>
      <div className="form-field form-field-full">
        <label className="form-label" htmlFor="og-description">
          Sosyal paylaşım açıklaması
        </label>
        <textarea
          className="form-textarea"
          id="og-description"
          maxLength={220}
          rows={3}
          {...register("ogDescription")}
        />
      </div>
    </div>
  );
}
