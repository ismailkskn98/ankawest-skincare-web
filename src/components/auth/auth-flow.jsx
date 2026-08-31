"use client";

import { WarningCircle } from "@phosphor-icons/react";
import { useState } from "react";

import AuthCard from "@/components/auth/auth-card";
import LoginCredentialsForm from "@/components/auth/login-credentials-form";
import TotpChallengeForm from "@/components/auth/totp-challenge-form";
import TotpSetupForm from "@/components/auth/totp-setup-form";
import { clientApiRequest } from "@/lib/api/client";

export default function AuthFlow() {
  const [step, setStep] = useState("credentials");
  const [setupData, setSetupData] = useState(null);
  const [flowError, setFlowError] = useState("");

  async function continueLogin(nextStep) {
    setFlowError("");

    if (nextStep === "totp_challenge") {
      setStep("challenge");
      return;
    }

    try {
      const payload = await clientApiRequest("/api/auth/totp/setup", {
        method: "POST",
        body: {},
      });
      setSetupData(payload.data);
      setStep("setup");
    } catch (error) {
      setFlowError(error.message);
    }
  }

  function returnToCredentials() {
    setSetupData(null);
    setFlowError("");
    setStep("credentials");
  }

  if (step === "setup" && setupData) {
    return (
      <AuthCard
        title="İki faktörlü doğrulamayı kurun"
        description="Devam etmek için authenticator uygulamanızı hesabınıza bağlayın."
      >
        <TotpSetupForm setupData={setupData} onBack={returnToCredentials} />
      </AuthCard>
    );
  }

  if (step === "challenge") {
    return (
      <AuthCard
        title="Doğrulama kodu"
        description="Authenticator uygulamanızdaki güncel kodu girin."
      >
        <TotpChallengeForm onBack={returnToCredentials} />
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Yönetim paneline giriş"
      description="İçerik ve ürün yönetimine devam etmek için hesabınızla giriş yapın."
    >
      {flowError ? (
        <div className="feedback-message feedback-error" role="alert">
          <WarningCircle size={18} aria-hidden="true" />
          <span>{flowError}</span>
        </div>
      ) : null}
      <LoginCredentialsForm onNextStep={continueLogin} />
    </AuthCard>
  );
}
