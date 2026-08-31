"use client";

import Link from "next/link";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { clientApiRequest } from "@/lib/api/client";
import { forgotPasswordSchema } from "@/lib/validation/auth";

export default function ForgotPasswordForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function requestReset(values) {
    setSuccessMessage("");

    try {
      const payload = await clientApiRequest("/api/auth/forgot-password", {
        method: "POST",
        body: values,
      });
      setSuccessMessage(payload.message);
    } catch (error) {
      setError("root", { message: error.message });
    }
  }

  return (
    <form className="form-stack" onSubmit={handleSubmit(requestReset)} noValidate>
      {successMessage ? (
        <div className="feedback-message feedback-success" role="status">
          <CheckCircle size={18} weight="fill" aria-hidden="true" />
          <span>{successMessage}</span>
        </div>
      ) : null}
      {errors.root ? (
        <div className="feedback-message feedback-error" role="alert">
          <WarningCircle size={18} aria-hidden="true" />
          <span>{errors.root.message}</span>
        </div>
      ) : null}

      <div className="form-field">
        <label className="form-label" htmlFor="reset-email">
          E-posta adresi
        </label>
        <input
          className="form-control"
          id="reset-email"
          type="email"
          autoComplete="email"
          autoCapitalize="none"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "reset-email-error" : undefined}
          {...register("email")}
        />
        {errors.email ? (
          <p className="form-error" id="reset-email-error">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <button className="button button-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Gönderiliyor..." : "Sıfırlama bağlantısı gönder"}
      </button>
      <p className="auth-footer-link">
        <Link className="text-link" href="/admin/login">
          Giriş ekranına dön
        </Link>
      </p>
    </form>
  );
}
