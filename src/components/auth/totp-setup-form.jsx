"use client";

import Image from "next/image";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { clientApiRequest } from "@/lib/api/client";
import { verificationCodeSchema } from "@/lib/validation/auth";

export default function TotpSetupForm({ setupData, onBack }) {
  const router = useRouter();
  const [recoveryCodes, setRecoveryCodes] = useState([]);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(verificationCodeSchema),
    defaultValues: { code: "" },
  });

  async function enableTotp(values) {
    try {
      const payload = await clientApiRequest("/api/auth/totp/enable", {
        method: "POST",
        body: values,
      });
      const codes = payload?.data?.recoveryCodes;

      if (Array.isArray(codes) && codes.length > 0) {
        setRecoveryCodes(codes);
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch (error) {
      setError("root", { message: error.message });
    }
  }

  if (recoveryCodes.length > 0) {
    return (
      <div className="form-stack">
        <div className="feedback-message feedback-success" role="status">
          <CheckCircle size={18} weight="fill" aria-hidden="true" />
          <span>İki faktörlü doğrulama etkinleştirildi.</span>
        </div>
        <p className="form-hint">
          Bu kurtarma kodlarını güvenli bir parola yöneticisine kaydedin. Her kod
          yalnızca bir kez kullanılabilir ve daha sonra yeniden gösterilmez.
        </p>
        <ul className="recovery-codes" aria-label="Kurtarma kodları">
          {recoveryCodes.map((code) => (
            <li key={code}>
              <code>{code}</code>
            </li>
          ))}
        </ul>
        <button
          className="button button-primary button-block"
          type="button"
          onClick={() => {
            router.replace("/admin");
            router.refresh();
          }}
        >
          Kodları kaydettim
        </button>
      </div>
    );
  }

  return (
    <form className="totp-setup" onSubmit={handleSubmit(enableTotp)} noValidate>
      {errors.root ? (
        <div className="feedback-message feedback-error" role="alert">
          <WarningCircle size={18} aria-hidden="true" />
          <span>{errors.root.message}</span>
        </div>
      ) : null}

      {setupData.qrCodeDataUrl ? (
        <Image
          className="totp-qr"
          src={setupData.qrCodeDataUrl}
          alt="Authenticator uygulaması kurulum QR kodu"
          width={190}
          height={190}
          unoptimized
        />
      ) : null}

      <div className="form-field">
        <span className="form-label">Manuel kurulum anahtarı</span>
        <code className="manual-secret">{setupData.manualKey}</code>
        <p className="form-hint">
          QR kodunu tarayamıyorsanız bu anahtarı authenticator uygulamanıza elle
          girin.
        </p>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="setup-code">
          6 haneli doğrulama kodu
        </label>
        <input
          className="form-control"
          id="setup-code"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          aria-invalid={Boolean(errors.code)}
          aria-describedby={errors.code ? "setup-code-error" : undefined}
          {...register("code")}
        />
        {errors.code ? (
          <p className="form-error" id="setup-code-error">
            {errors.code.message}
          </p>
        ) : null}
      </div>

      <button className="button button-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Etkinleştiriliyor..." : "Doğrulamayı etkinleştir"}
      </button>
      <button className="button button-ghost" type="button" onClick={onBack}>
        Girişe dön
      </button>
    </form>
  );
}
