import Image from "next/image";
import Link from "next/link";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminAuthLayout({ children }) {
  return (
    <div className="auth-page">
      <aside className="auth-brand-panel" aria-label="Anka West Skincare">
        <Link href="/" aria-label="Anka West Skincare ana sayfa">
          <Image
            className="auth-brand-logo"
            src="/images/logo/ankawestskincare-logo.webp"
            alt="Anka West Skincare"
            width={220}
            height={136}
            priority
          />
        </Link>
        <div className="auth-brand-copy">
          <p className="auth-kicker">Anka West yönetim merkezi</p>
          <h1>İçeriği tek ve güvenli bir yerden yönetin.</h1>
          <p>
            Ürünleri, kategorileri ve site içeriklerini kontrollü bir yayın
            akışıyla güncelleyin.
          </p>
        </div>
        <span className="auth-brand-footer">Güvenli katalog ve içerik yönetimi</span>
      </aside>
      <main className="auth-content-panel">
        <Link className="auth-mobile-brand" href="/" aria-label="Anka West Skincare ana sayfa">
          <Image src="/images/logo/ankawestskincare-logo.webp" alt="Anka West Skincare" width={150} height={93} priority />
        </Link>
        {children}
        <p className="auth-security-note">Korumalı yönetim oturumu</p>
      </main>
    </div>
  );
}
