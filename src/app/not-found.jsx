import Link from "next/link";

export default function NotFound() {
  return (
    <main className="state-page">
      <section className="state-card" aria-labelledby="not-found-title">
        <p className="eyebrow">404</p>
        <h1 id="not-found-title">Sayfa bulunamadı</h1>
        <p>Aradığınız sayfa kaldırılmış veya adresi değişmiş olabilir.</p>
        <Link className="button button-primary" href="/">
          Ana sayfaya dön
        </Link>
      </section>
    </main>
  );
}
