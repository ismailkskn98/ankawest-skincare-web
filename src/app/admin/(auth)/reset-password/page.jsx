import AuthCard from "@/components/auth/auth-card";
import ResetPasswordForm from "@/components/auth/reset-password-form";

export const metadata = {
  title: "Yeni Şifre Belirle",
};

export default function ResetPasswordPage() {
  return (
    <AuthCard
      title="Yeni şifre belirleyin"
      description="Hesabınız için güçlü ve daha önce kullanmadığınız bir şifre oluşturun."
    >
      <ResetPasswordForm />
    </AuthCard>
  );
}
