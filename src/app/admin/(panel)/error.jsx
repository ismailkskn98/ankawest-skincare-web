"use client";

import { WarningCircle } from "@phosphor-icons/react";
import { useEffect } from "react";

export default function AdminError({ error, reset }) {
  useEffect(() => {
    console.error("Yönetim ekranı yüklenemedi.", error);
  }, [error]);

  return (
    <main className="admin-page">
      <section className="panel empty-state" aria-labelledby="admin-error-title">
        <div className="empty-state-content">
          <span className="empty-state-icon" aria-hidden="true">
            <WarningCircle size={23} />
          </span>
          <h2 id="admin-error-title">Veriler yüklenemedi</h2>
          <p>API bağlantısını kontrol edip işlemi yeniden deneyin.</p>
          <button className="button button-primary" type="button" onClick={reset}>
            Yeniden dene
          </button>
        </div>
      </section>
    </main>
  );
}
