import AccountPasswordForm from "@/components/admin/account-password-form";
import PageHeader from "@/components/admin/page-header";
import { requireAdminSession } from "@/lib/auth/dal";

export const metadata = { title: "Hesap Ayarları" };

export default async function AccountSettingsPage() {
  const user = await requireAdminSession();

  return (
    <main className="admin-page">
      <PageHeader
        title="Hesap ayarları"
        description="Kendi oturum ve şifre güvenliği ayarlarınızı yönetin."
      />

      <div className="account-settings-layout">
        <section className="panel" aria-labelledby="password-security-title">
          <header className="panel-header">
            <div className="panel-heading">
              <h2 id="password-security-title">Şifre güvenliği</h2>
              <p>
                <span translate="no">{user.email}</span> hesabının şifresini
                değiştirin. İşlemden sonra tüm açık oturumlar kapatılır.
              </p>
            </div>
          </header>
          <div className="panel-body">
            <AccountPasswordForm />
          </div>
        </section>
      </div>
    </main>
  );
}
