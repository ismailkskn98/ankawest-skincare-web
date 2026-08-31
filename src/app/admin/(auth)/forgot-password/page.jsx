import AuthCard from "@/components/auth/auth-card";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";

export const metadata = {
  title: "Şifremi Unuttum",
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Şifrenizi sıfırlayın"
      description="Hesabınıza bağlı e-posta adresini girin. Güvenli sıfırlama bağlantısını size gönderelim."
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
