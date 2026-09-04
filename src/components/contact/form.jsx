"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { useState } from "react";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fullName = form.fullName.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (fullName.length < 2) {
      setError("Lütfen adınızı girin.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Geçerli bir e-posta adresi girin.");
      return;
    }

    if (message.length < 10) {
      setError("Mesajınız en az 10 karakter olmalı.");
      return;
    }

    const subject = encodeURIComponent(form.subject.trim() || "Anka West Skincare iletişim");
    const body = encodeURIComponent(
      [
        `Ad Soyad: ${fullName}`,
        `E-posta: ${email}`,
        form.phone.trim() ? `Telefon: ${form.phone.trim()}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    );

    window.location.href = `mailto:info@ankawest.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <form
      className="min-h-full"
      onSubmit={handleSubmit}
      noValidate
    >
      <div>
        <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-site-copy uppercase">Mesaj bırak</p>
        <h2 className="font-canela mt-4 max-w-[12ch] text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.96] font-light tracking-[-0.045em] text-[#3b3b3b]">
          Sana dönüş yapalım.
        </h2>
      </div>

      <div className="mt-[clamp(2rem,4vw,3rem)] grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-[0.64rem] font-semibold tracking-[0.13em] text-site-copy/72 uppercase">
          Ad soyad
          <input
            className="min-h-13 rounded-full border border-site-ink/10 bg-site-paper px-5 text-[0.98rem] font-normal tracking-[-0.015em] text-site-ink outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-site-copy/34 hover:border-site-ink/20 focus:border-site-ink/35 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,59,59,0.07)]"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Adınız soyadınız"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </label>

        <label className="grid gap-2 text-[0.64rem] font-semibold tracking-[0.13em] text-site-copy/72 uppercase">
          E-posta
          <input
            className="min-h-13 rounded-full border border-site-ink/10 bg-site-paper px-5 text-[0.98rem] font-normal tracking-[-0.015em] text-site-ink outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-site-copy/34 hover:border-site-ink/20 focus:border-site-ink/35 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,59,59,0.07)]"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="ornek@mail.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className="grid gap-2 text-[0.64rem] font-semibold tracking-[0.13em] text-site-copy/72 uppercase">
          Telefon
          <input
            className="min-h-13 rounded-full border border-site-ink/10 bg-site-paper px-5 text-[0.98rem] font-normal tracking-[-0.015em] text-site-ink outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-site-copy/34 hover:border-site-ink/20 focus:border-site-ink/35 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,59,59,0.07)]"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+90"
            value={form.phone}
            onChange={handleChange}
          />
        </label>

        <label className="grid gap-2 text-[0.64rem] font-semibold tracking-[0.13em] text-site-copy/72 uppercase">
          Konu
          <input
            className="min-h-13 rounded-full border border-site-ink/10 bg-site-paper px-5 text-[0.98rem] font-normal tracking-[-0.015em] text-site-ink outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-site-copy/34 hover:border-site-ink/20 focus:border-site-ink/35 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,59,59,0.07)]"
            name="subject"
            type="text"
            placeholder="Ürün, iş birliği..."
            value={form.subject}
            onChange={handleChange}
          />
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-[0.64rem] font-semibold tracking-[0.13em] text-site-copy/72 uppercase">
        Mesaj
        <textarea
          className="min-h-[clamp(11rem,20vw,15rem)] resize-y rounded-[1.35rem] border border-site-ink/10 bg-site-paper px-5 py-4 text-[0.98rem] leading-[1.55] font-normal tracking-[-0.015em] text-site-ink outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-site-copy/34 hover:border-site-ink/20 focus:border-site-ink/35 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,59,59,0.07)]"
          name="message"
          placeholder="Mesajınızı yazın..."
          value={form.message}
          onChange={handleChange}
          required
        />
      </label>

      {error ? (
        <p className="mt-4 text-[0.88rem] text-[#9a3b2f]" role="alert">
          {error}
        </p>
      ) : null}

      {submitted && !error ? (
        <p className="mt-4 text-[0.88rem] text-site-copy" role="status">
          E-posta uygulamanız açılıyor. Mesajınızı gönderdikten sonra size
          döneceğiz.
        </p>
      ) : null}

      <button
        className="group mt-7 inline-flex min-h-14 w-full items-center justify-between gap-4 rounded-full bg-site-ink py-1.5 pr-1.5 pl-6 text-[0.7rem] font-semibold tracking-[0.08em] text-site-paper uppercase transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] motion-reduce:transition-none sm:w-fit sm:min-w-[15rem]"
        type="submit"
      >
        Mesaj gönder
        <span className="relative grid size-11 place-items-center overflow-hidden rounded-full bg-site-paper text-site-ink">
          <ArrowUpRightIcon
            className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[160%] group-hover:-translate-y-[160%] motion-reduce:transition-none"
            size={18}
            weight="light"
            aria-hidden="true"
          />
          <ArrowUpRightIcon
            className="absolute -translate-x-[160%] translate-y-[160%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0 motion-reduce:hidden"
            size={18}
            weight="light"
            aria-hidden="true"
          />
        </span>
      </button>
    </form>
  );
}
