"use client";

import Link from "next/link";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useForm } from "react-hook-form";

import { clientApiRequest } from "@/lib/api/client";
import { resetPasswordSchema } from "@/lib/validation/auth";

function subscribeToHash() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function readHashToken() {
  return new URLSearchParams(window.location.hash.slice(1)).get("token") || "";
}

function ResetPasswordContent() {
  const [resetToken] = useState(readHashToken);
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: resetToken,
      password: "",
      passwordConfirmation: "",
    },
  });

  const tokenIsValid = /^[a-fA-F0-9]{64}$/.test(resetToken);

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  async function resetPassword(values) {
    try {
      const payload = await clientApiRequest("/api/auth/reset-password", {
        method: "POST",
        body: values,
      });
      setSuccessMessage(payload.message);
    } catch (error) {
      setError("root", { message: error.message });
    }
  }

  if (!tokenIsValid) {
    return (
      <div className="form-stack">
        <div className="feedback-message feedback-error" role="alert">
          <WarningCircle size={18} aria-hidden="true" />
          <span>Şifre sıfırlama bağlantısı geçersiz veya eksik.</span>
        </div>
        <Link className="button button-primary" href="/admin/forgot-password">
          Yeni bağlantı iste
        </Link>
      </div>
    );
  }

  if (successMessage) {
    return (
      <div className="form-stack">
        <div className="feedback-message feedback-success" role="status">
          <CheckCircle size={18} weight="fill" aria-hidden="true" />
          <span>{successMessage}</span>
        </div>
        <Link className="button button-primary" href="/admin/login">
          Giriş yap
        </Link>
      </div>
    );
  }

  return (
    <form className="form-stack" onSubmit={handleSubmit(resetPassword)} noValidate>
      {errors.root ? (
        <div className="feedback-message feedback-error" role="alert">
          <WarningCircle size={18} aria-hidden="true" />
          <span>{errors.root.message}</span>
        </div>
      ) : null}

      <div className="form-field">
        <label className="form-label" htmlFor="new-password">
          Yeni şifre
        </label>
        <input
          className="form-control"
          id="new-password"
          type="password"
          autoComplete="new-password"
          aria-invalid={Boolean(errors.password)}
          aria-describedby="new-password-hint"
          {...register("password")}
        />
        <p className="form-hint" id="new-password-hint">
          En az 12 karakter; küçük ve büyük harf, rakam ve özel karakter içermeli.
          UTF-8 olarak en fazla 72 bayt olabilir.
        </p>
        {errors.password ? <p className="form-error">{errors.password.message}</p> : null}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="password-confirmation">
          Yeni şifre tekrar
        </label>
        <input
          className="form-control"
          id="password-confirmation"
          type="password"
          autoComplete="new-password"
          aria-invalid={Boolean(errors.passwordConfirmation)}
          {...register("passwordConfirmation")}
        />
        {errors.passwordConfirmation ? (
          <p className="form-error">{errors.passwordConfirmation.message}</p>
        ) : null}
      </div>

      <button className="button button-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Güncelleniyor..." : "Şifreyi güncelle"}
      </button>
    </form>
  );
}

export default function ResetPasswordForm() {
  const isClient = useSyncExternalStore(
    subscribeToHash,
    getClientSnapshot,
    getServerSnapshot,
  );

  if (!isClient) {
    return <p className="form-hint" role="status">Bağlantı doğrulanıyor...</p>;
  }

  return <ResetPasswordContent />;
}
