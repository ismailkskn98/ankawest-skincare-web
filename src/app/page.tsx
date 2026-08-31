import { siteConfig } from "@/config/site";

export default function HomePage() {
  const homeCopy = siteConfig.copy.home;

  return (
    <div className="flex w-full flex-col gap-16 py-12 sm:py-16 lg:gap-24 lg:py-24">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-[var(--accent)] uppercase">
            {homeCopy.eyebrow}
          </p>
          <h1
            className="mt-5 max-w-4xl text-5xl leading-[0.96] font-semibold tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl"
            translate="no"
          >
            {homeCopy.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
            {homeCopy.description}
          </p>
        </div>

        <aside
          id="proje-durumu"
          aria-labelledby="project-status-title"
          className="scroll-mt-6 rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8"
        >
          <p className="text-xs font-semibold tracking-[0.16em] text-[var(--accent)] uppercase">
            {homeCopy.statusLabel}
          </p>
          <h2
            id="project-status-title"
            className="mt-4 text-2xl font-semibold tracking-[-0.03em]"
          >
            {homeCopy.statusTitle}
          </h2>
          <p className="mt-4 leading-7 text-[var(--muted)]">
            {homeCopy.statusDescription}
          </p>
        </aside>
      </section>

      <section
        aria-labelledby="foundation-title"
        className="border-t border-[var(--line)] pt-10 sm:pt-12"
      >
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-[var(--accent)] uppercase">
              {homeCopy.foundationEyebrow}
            </p>
            <h2
              id="foundation-title"
              className="mt-4 max-w-lg text-3xl font-semibold tracking-[-0.04em] text-balance sm:text-4xl"
            >
              {homeCopy.foundationTitle}
            </h2>
          </div>

          <ul className="grid gap-4 sm:grid-cols-3">
            {homeCopy.foundations.map((foundationItem) => (
              <li
                key={foundationItem.title}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5"
              >
                <h3 className="font-semibold">{foundationItem.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {foundationItem.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
