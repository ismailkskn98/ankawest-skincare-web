export default function AuthCard({ title, description, children }) {
  return (
    <section className="auth-card" aria-labelledby="auth-title">
      <header className="auth-card-header">
        <span className="auth-card-mark" aria-hidden="true">AW</span>
        <h1 id="auth-title">{title}</h1>
        <p>{description}</p>
      </header>
      {children}
    </section>
  );
}
