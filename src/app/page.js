import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="coming-soon-page">
      <section className="coming-soon-card" aria-labelledby="page-title">
        <Image
          src="/images/logo/ankawestskincare-logo.png"
          alt="Anka West Skincare"
          width={260}
          height={161}
          priority
          className="coming-soon-logo"
        />
        <p className="eyebrow">Yeni dijital deneyim</p>
        <h1 id="page-title">Hazırlanıyor</h1>
        <p>
          Anka West Skincare ürünlerini keşfedebileceğiniz yeni web sitemiz çok
          yakında burada olacak.
        </p>
        <Link className="text-link" href="/admin/login">
          Yönetim paneli
        </Link>
      </section>
    </main>
  );
}
