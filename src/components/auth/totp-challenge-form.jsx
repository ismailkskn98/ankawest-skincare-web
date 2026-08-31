"use client";

import { WarningCircle } from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { clientApiRequest } from "@/lib/api/client";
import {
  recoveryCodeSchema,
  verificationCodeSchema,
} from "@/lib/validation/auth";

export default function TotpChallengeForm({ onBack }) {
  const router = useRouter();
  const [useRecoveryCode, setUseRecoveryCode] = useState(false);
  const schema = useRecoveryCode ? recoveryCodeSchema : verificationCodeSchema;
  const fieldName = useRecoveryCode ? "recoveryCode" : "code";
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { code: "", recoveryCode: "" },
  });

  async function verifyTotp(values) {
    const endpoint = useRecoveryCode
      ? "/api/auth/totp/recover"
      : "/api/auth/totp/verify";

    try {
      await clientApiRequest(endpoint, { method: "POST", body: values });
      router.replace("/admin");
      router.refresh();
    } catch (error) {
      setError("root", { message: error.message });
    }
  }

  function toggleRecoveryMode() {
    setUseRecoveryCode((current) => !current);
    reset({ code: "", recoveryCode: "" });
  }

  return (
    <form className="form-stack" onSubmit={handleSubmit(verifyTotp)} noValidate>
      {errors.root ? (
        <div className="feedback-message feedback-error" role="alert">
          <WarningCircle size={18} aria-hidden="true" />
          <span>{errors.root.message}</span>
        </div>
      ) : null}

      <div className="form-field">
        <label className="form-label" htmlFor="challenge-code">
          {useRecoveryCode ? "Kurtarma kodu" : "Doğrulama kodu"}
        </label>
        <input
          className="form-control"
          id="challenge-code"
          type="text"
          inputMode={useRecoveryCode ? "text" : "numeric"}
          autoComplete="one-time-code"
          maxLength={useRecoveryCode ? 128 : 6}
          aria-invalid={Boolean(errors[fieldName])}
          aria-describedby={errors[fieldName] ? "challenge-code-error" : undefined}
          {...register(fieldName)}
        />
        {errors[fieldName] ? (
          <p className="form-error" id="challenge-code-error">
            {errors[fieldName].message}
          </p>
        ) : null}
      </div>

      <button className="button button-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Doğrulanıyor..." : "Giriş yap"}
      </button>
      <button className="button button-secondary" type="button" onClick={toggleRecoveryMode}>
        {useRecoveryCode ? "Authenticator kodu kullan" : "Kurtarma kodu kullan"}
      </button>
      <button className="button button-ghost" type="button" onClick={onBack}>
        Girişe dön
      </button>
    </form>
  );
}
