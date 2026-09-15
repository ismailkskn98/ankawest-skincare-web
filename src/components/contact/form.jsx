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

const fieldClassName = "grid gap-[clamp(0.5rem,1vw,0.75rem)] text-[clamp(0.58rem,0.7vw,0.66rem)] font-semibold tracking-[0.13em] text-site-copy/72 uppercase";
const inputClassName = "min-h-[clamp(3.25rem,4vw,3.5rem)] rounded-full border border-site-ink/10 bg-site-paper px-[clamp(1rem,1.6vw,1.25rem)] text-[clamp(0.9rem,1vw,1rem)] font-normal tracking-[-0.015em] text-site-ink outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-site-copy/34 hover:border-site-ink/20 focus:border-site-ink/35 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,59,59,0.07)]";

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
        <p className="text-[clamp(0.58rem,0.8vw,0.68rem)] font-semibold tracking-[0.14em] text-site-copy uppercase">Mesaj bırak</p>
        <h2 className="font-sentient mt-[clamp(0.9rem,1.5vw,1.5rem)] max-w-[12ch] text-[clamp(2.2rem,6vw,3.6rem)] leading-[0.96] font-light tracking-[-0.045em] text-[#3b3b3b] lg:text-[clamp(2.8rem,4vw,4.8rem)]">
          Sana dönüş yapalım
        </h2>
      </div>

      <div className="mt-[clamp(1.75rem,3vw,3rem)] grid gap-[clamp(0.9rem,1.5vw,1.25rem)] md:grid-cols-2">
        <label className={fieldClassName}>
          Ad soyad
          <input
            className={inputClassName}
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Adınız soyadınız"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </label>

        <label className={fieldClassName}>
          E-posta
          <input
            className={inputClassName}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="ornek@mail.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className={fieldClassName}>
          Telefon
          <input
            className={inputClassName}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+90"
            value={form.phone}
            onChange={handleChange}
          />
        </label>

        <label className={fieldClassName}>
          Konu
          <input
            className={inputClassName}
            name="subject"
            type="text"
            placeholder="Ürün, iş birliği..."
            value={form.subject}
            onChange={handleChange}
          />
        </label>
      </div>

      <label className={`mt-[clamp(0.9rem,1.5vw,1.25rem)] ${fieldClassName}`}>
        Mesaj
        <textarea
          className="min-h-[clamp(10rem,20vh,15rem)] resize-y rounded-[clamp(1.2rem,2.5vw,1.35rem)] border border-site-ink/10 bg-site-paper px-[clamp(1rem,1.6vw,1.25rem)] py-[clamp(0.9rem,1.5vw,1.1rem)] text-[clamp(0.9rem,1vw,1rem)] leading-[1.55] font-normal tracking-[-0.015em] text-site-ink outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-site-copy/34 hover:border-site-ink/20 focus:border-site-ink/35 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,59,59,0.07)]"
          name="message"
          placeholder="Mesajınızı yazın..."
          value={form.message}
          onChange={handleChange}
          required
        />
      </label>

      {error ? (
        <p className="mt-[clamp(0.9rem,1.5vw,1.25rem)] text-[clamp(0.82rem,0.95vw,0.88rem)] text-[#9a3b2f]" role="alert">
          {error}
        </p>
      ) : null}

      {submitted && !error ? (
        <p className="mt-[clamp(0.9rem,1.5vw,1.25rem)] text-[clamp(0.82rem,0.95vw,0.88rem)] text-site-copy" role="status">
          E-posta uygulamanız açılıyor. Mesajınızı gönderdikten sonra size
          döneceğiz.
        </p>
      ) : null}

      <button
        className="group mt-[clamp(1.5rem,3vw,2rem)] inline-flex min-h-[clamp(3.5rem,4vw,3.75rem)] w-full items-center justify-between gap-4 rounded-full bg-site-ink py-1.5 pr-1.5 pl-[clamp(1.25rem,2vw,1.5rem)] text-[clamp(0.66rem,0.58vw,0.72rem)] font-semibold tracking-[0.08em] text-site-paper uppercase transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] motion-reduce:transition-none sm:w-fit sm:min-w-[clamp(14rem,22vw,16rem)]"
        type="submit"
      >
        Mesaj gönder
          <span className="relative grid size-[clamp(2.75rem,3.5vw,3.25rem)] place-items-center overflow-hidden rounded-full bg-site-paper text-site-ink">
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
