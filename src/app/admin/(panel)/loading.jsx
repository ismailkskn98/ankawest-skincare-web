export default function AdminLoading() {
  return (
    <main className="admin-page" aria-busy="true" aria-label="Yönetim sayfası yükleniyor">
      <div className="loading-grid">
        <div className="skeleton" style={{ width: 280, height: 34 }} />
        <div className="skeleton" style={{ width: "52%", height: 16 }} />
        <div className="stats-grid" style={{ marginTop: 12 }}>
          {[1, 2, 3, 4].map((entry) => (
            <div className="skeleton" style={{ height: 118 }} key={entry} />
          ))}
        </div>
        <div className="skeleton" style={{ height: 320, marginTop: 18 }} />
      </div>
    </main>
  );
}
