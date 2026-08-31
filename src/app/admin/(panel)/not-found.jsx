import Link from "next/link";

export default function AdminNotFound() {
  return (
    <main className="admin-page">
      <section className="panel empty-state">
        <div className="empty-state-content">
          <p className="eyebrow">404</p>
          <h2>Kayıt bulunamadı</h2>
          <p>Aradığınız yönetim kaydı silinmiş veya adresi değişmiş olabilir.</p>
          <Link className="button button-primary" href="/admin">
            Genel bakışa dön
          </Link>
        </div>
      </section>
    </main>
  );
}
