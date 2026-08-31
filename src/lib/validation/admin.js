import { z } from "zod";

import { strongPasswordSchema } from "@/lib/validation/auth";

const optionalNumber = (schema) =>
  z.preprocess((value) => (value === "" ? undefined : value), schema.optional());

const seoFields = {
  seoTitle: z.string().trim().max(70).optional(),
  seoDescription: z.string().trim().max(170).optional(),
  seoKeywordsText: z.string().optional(),
  canonicalUrl: z.string().trim().optional(),
  ogTitle: z.string().trim().max(95).optional(),
  ogDescription: z.string().trim().max(220).optional(),
  ogImageUrl: z.string().trim().optional(),
};

export const categoryFormSchema = z.object({
  name: z.string().trim().min(2, "Kategori adı en az 2 karakter olmalıdır."),
  slug: z.string().trim().optional(),
  description: z.string().trim().max(1000).optional(),
  displayOrder: optionalNumber(z.coerce.number().int().min(0)),
  ...seoFields,
});

export const productFormSchema = z.object({
  categoryId: z.string().trim().min(1, "Bir kategori seçin."),
  brand: z.string().trim().min(2, "Marka adını girin."),
  name: z.string().trim().min(2, "Ürün adı en az 2 karakter olmalıdır."),
  slug: z.string().trim().optional(),
  sku: z.string().trim().optional(),
  price: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.coerce.number({ error: "Fiyatı girin." }).min(0, "Fiyat negatif olamaz."),
  ),
  currency: z.string().trim().length(3, "Para birimi 3 harf olmalıdır."),
  sizeLabel: z.string().trim().optional(),
  shortDescription: z.string().trim().max(500).optional(),
  description: z.string().trim().optional(),
  benefitsText: z.string().optional(),
  activeIngredientsText: z.string().optional(),
  suitableForText: z.string().optional(),
  usageInstructions: z.string().trim().optional(),
  warnings: z.string().trim().optional(),
  internalNote: z.string().trim().optional(),
  isFeatured: z.boolean(),
  displayOrder: optionalNumber(z.coerce.number().int().min(0)),
  ...seoFields,
});

export const siteContentFormSchema = z.object({
  section: z.string().trim().min(2, "İçerik bölümünü girin."),
  contentKey: z
    .string()
    .trim()
    .min(2, "İçerik anahtarını girin.")
    .regex(
      /^[a-z0-9][a-z0-9._-]*$/,
      "Yalnızca küçük harf, sayı, nokta, tire ve alt çizgi kullanın.",
    ),
  title: z.string().trim().max(200).optional(),
  body: z.string().trim().min(1, "İçerik metnini girin."),
  metadataText: z.string().optional(),
  displayOrder: optionalNumber(z.coerce.number().int().min(0)),
  ...seoFields,
});

const userBaseSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Ad soyad en az 2 karakter olmalıdır.")
    .max(150, "Ad soyad en fazla 150 karakter olabilir."),
  email: z.email("Geçerli bir e-posta adresi girin.").trim().toLowerCase(),
  role: z.enum(["admin", "editor"]),
  status: z.enum(["active", "inactive"]),
});

export const createUserFormSchema = userBaseSchema.extend({
  password: strongPasswordSchema,
});

export const updateUserFormSchema = userBaseSchema.extend({
  password: z.union([z.literal(""), strongPasswordSchema]).optional(),
});
