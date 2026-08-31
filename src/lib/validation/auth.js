import { z } from "zod";

const fitsBcryptByteLimit = (value) => new TextEncoder().encode(value).length <= 72;

export const strongPasswordSchema = z
  .string()
  .min(12, "Şifre en az 12 karakter olmalıdır.")
  .max(128, "Şifre en fazla 128 karakter olabilir.")
  .refine(fitsBcryptByteLimit, "Şifre UTF-8 olarak en fazla 72 bayt olabilir.")
  .regex(/[a-z]/, "Şifre en az bir küçük harf içermelidir.")
  .regex(/[A-Z]/, "Şifre en az bir büyük harf içermelidir.")
  .regex(/[0-9]/, "Şifre en az bir rakam içermelidir.")
  .regex(/[^a-zA-Z0-9]/, "Şifre en az bir özel karakter içermelidir.");

export const loginSchema = z.object({
  email: z.email("Geçerli bir e-posta adresi girin.").trim().toLowerCase(),
  password: z
    .string()
    .min(1, "Şifrenizi girin.")
    .max(128)
    .refine(fitsBcryptByteLimit, "Şifre en fazla 72 bayt olabilir."),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Geçerli bir e-posta adresi girin.").trim().toLowerCase(),
});

export const resetPasswordSchema = z
  .object({
    token: z
      .string()
      .regex(/^[a-fA-F0-9]{64}$/, "Şifre sıfırlama bağlantısı geçersiz."),
    password: strongPasswordSchema,
    passwordConfirmation: z.string(),
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    message: "Şifreler eşleşmiyor.",
    path: ["passwordConfirmation"],
  });

export const verificationCodeSchema = z.object({
  code: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "6 haneli doğrulama kodunu girin."),
});

export const recoveryCodeSchema = z.object({
  recoveryCode: z
    .string()
    .trim()
    .min(8, "Geçerli bir kurtarma kodu girin.")
    .max(128),
});
