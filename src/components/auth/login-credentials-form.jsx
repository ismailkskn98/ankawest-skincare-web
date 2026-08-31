"use client";

import Link from "next/link";
import { WarningCircle } from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { clientApiRequest } from "@/lib/api/client";
import { loginSchema } from "@/lib/validation/auth";

export default function LoginCredentialsForm({ onNextStep }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function submitCredentials(values) {
    try {
      const payload = await clientApiRequest("/api/auth/login", {
        method: "POST",
        body: values,
      });
      await onNextStep(payload.data.nextStep);
    } catch (error) {
      setError("root", {
        message: error.message || "Giriş bilgileri doğrulanamadı.",
      });
    }
  }

  return (
    <form className="form-stack" onSubmit={handleSubmit(submitCredentials)} noValidate>
      {errors.root ? (
        <div className="feedback-message feedback-error" role="alert">
          <WarningCircle size={18} aria-hidden="true" />
          <span>{errors.root.message}</span>
        </div>
      ) : null}

      <div className="form-field">
        <label className="form-label" htmlFor="email">
          E-posta adresi
        </label>
        <input
          className="form-control"
          id="email"
          type="email"
          autoComplete="username"
          autoCapitalize="none"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
        {errors.email ? (
          <p className="form-error" id="email-error">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="form-field">
        <div className="form-label-row">
          <label className="form-label" htmlFor="password">
            Şifre
          </label>
          <Link className="text-link" href="/admin/forgot-password">
            Şifremi unuttum
          </Link>
        </div>
        <input
          className="form-control"
          id="password"
          type="password"
          autoComplete="current-password"
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "password-error" : undefined}
          {...register("password")}
        />
        {errors.password ? (
          <p className="form-error" id="password-error">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <button
        className="button button-primary button-block"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Doğrulanıyor..." : "Devam et"}
      </button>
    </form>
  );
}
