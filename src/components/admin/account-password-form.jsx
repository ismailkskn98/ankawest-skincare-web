"use client";

import Link from "next/link";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import PasswordInput from "@/components/ui/password-input";
import { clientApiRequest } from "@/lib/api/client";
import { changePasswordSchema } from "@/lib/validation/auth";

const defaultValues = {
  currentPassword: "",
  newPassword: "",
  newPasswordConfirmation: "",
};

export default function AccountPasswordForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const {
    clearErrors,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues,
  });

  async function changePassword(values) {
    clearErrors("root");

    try {
      const payload = await clientApiRequest("/api/auth/change-password", {
        method: "PUT",
        body: values,
      });
      setSuccessMessage(
        payload?.message ||
          "Şifreniz değiştirildi. Yeniden giriş yapabilirsiniz.",
      );
    } catch (error) {
      setError("root", {
        message: error.message || "Şifre değiştirilemedi.",
      });
    }
  }

  if (successMessage) {
    return (
      <div className="form-stack">
        <div className="feedback-message feedback-success" role="status">
          <CheckCircle size={18} weight="fill" aria-hidden="true" />
          <span>{successMessage}</span>
        </div>
        <Link className="button button-primary" href="/admin/login">
          Yeniden giriş yap
        </Link>
      </div>
    );
  }

  return (
    <form className="form-stack" onSubmit={handleSubmit(changePassword)} noValidate>
      {errors.root ? (
        <div className="feedback-message feedback-error" role="alert">
          <WarningCircle size={18} aria-hidden="true" />
          <span>{errors.root.message}</span>
        </div>
      ) : null}

      <div className="form-field">
        <label className="form-label" htmlFor="account-current-password">
          Mevcut şifre
        </label>
        <PasswordInput
          id="account-current-password"
          autoComplete="current-password"
          aria-invalid={Boolean(errors.currentPassword)}
          aria-describedby={
            errors.currentPassword ? "account-current-password-error" : undefined
          }
          visibilityLabel="Mevcut şifreyi"
          {...register("currentPassword")}
        />
        {errors.currentPassword ? (
          <p className="form-error" id="account-current-password-error">
            {errors.currentPassword.message}
          </p>
        ) : null}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="account-new-password">
          Yeni şifre
        </label>
        <PasswordInput
          id="account-new-password"
          autoComplete="new-password"
          aria-invalid={Boolean(errors.newPassword)}
          aria-describedby={
            errors.newPassword
              ? "account-new-password-hint account-new-password-error"
              : "account-new-password-hint"
          }
          visibilityLabel="Yeni şifreyi"
          {...register("newPassword")}
        />
        <p className="form-hint" id="account-new-password-hint">
          En az 12 karakter; küçük ve büyük harf, rakam ve özel karakter içermeli.
          UTF-8 olarak en fazla 72 bayt olabilir.
        </p>
        {errors.newPassword ? (
          <p className="form-error" id="account-new-password-error">
            {errors.newPassword.message}
          </p>
        ) : null}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="account-new-password-confirmation">
          Yeni şifre tekrar
        </label>
        <PasswordInput
          id="account-new-password-confirmation"
          autoComplete="new-password"
          aria-invalid={Boolean(errors.newPasswordConfirmation)}
          aria-describedby={
            errors.newPasswordConfirmation
              ? "account-new-password-confirmation-error"
              : undefined
          }
          visibilityLabel="Şifre tekrarını"
          {...register("newPasswordConfirmation")}
        />
        {errors.newPasswordConfirmation ? (
          <p className="form-error" id="account-new-password-confirmation-error">
            {errors.newPasswordConfirmation.message}
          </p>
        ) : null}
      </div>

      <button className="button button-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Şifre değiştiriliyor…" : "Şifreyi değiştir"}
      </button>
    </form>
  );
}
