"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Sayfa beklenmeyen bir hatayla karşılaştı.", error);
  }, [error]);

  return (
    <main className="state-page">
      <section className="state-card" aria-labelledby="error-title">
        <p className="eyebrow">Bir sorun oluştu</p>
        <h1 id="error-title">Sayfa yüklenemedi</h1>
        <p>Geçici bir bağlantı sorunu olabilir. Lütfen yeniden deneyin.</p>
        <button className="button button-primary" type="button" onClick={reset}>
          Yeniden dene
        </button>
      </section>
    </main>
  );
}
