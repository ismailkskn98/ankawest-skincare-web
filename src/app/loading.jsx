export default function Loading() {
  return (
    <main className="state-page" aria-busy="true" aria-label="Sayfa yükleniyor">
      <div className="state-card loading-grid">
        <div className="skeleton" style={{ height: 72 }} />
        <div
          className="skeleton"
          style={{ height: 28, width: "64%", margin: "0 auto" }}
        />
        <div
          className="skeleton"
          style={{ height: 16, width: "82%", margin: "0 auto" }}
        />
      </div>
    </main>
  );
}
