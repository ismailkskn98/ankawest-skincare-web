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
      className="rounded-[1.5rem] bg-[#f2f2ef] p-5 min-[640px]:rounded-[1.75rem] min-[768px]:p-8"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="grid gap-5 min-[768px]:grid-cols-2">
        <label className="grid gap-2 text-[0.72rem] font-semibold tracking-[0.08em] text-site-copy uppercase">
          Ad soyad
          <input
            className="min-h-12 rounded-full border border-site-ink/10 bg-site-paper px-5 text-[0.95rem] font-normal tracking-normal text-site-ink outline-none transition-[border-color,box-shadow] duration-300 focus:border-site-ink/30 focus:shadow-[0_0_0_4px_rgba(59,59,59,0.08)]"
            name="fullName"
            type="text"
            autoComplete="name"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </label>

        <label className="grid gap-2 text-[0.72rem] font-semibold tracking-[0.08em] text-site-copy uppercase">
          E-posta
          <input
            className="min-h-12 rounded-full border border-site-ink/10 bg-site-paper px-5 text-[0.95rem] font-normal tracking-normal text-site-ink outline-none transition-[border-color,box-shadow] duration-300 focus:border-site-ink/30 focus:shadow-[0_0_0_4px_rgba(59,59,59,0.08)]"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className="grid gap-2 text-[0.72rem] font-semibold tracking-[0.08em] text-site-copy uppercase">
          Telefon
          <input
            className="min-h-12 rounded-full border border-site-ink/10 bg-site-paper px-5 text-[0.95rem] font-normal tracking-normal text-site-ink outline-none transition-[border-color,box-shadow] duration-300 focus:border-site-ink/30 focus:shadow-[0_0_0_4px_rgba(59,59,59,0.08)]"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
          />
        </label>

        <label className="grid gap-2 text-[0.72rem] font-semibold tracking-[0.08em] text-site-copy uppercase">
          Konu
          <input
            className="min-h-12 rounded-full border border-site-ink/10 bg-site-paper px-5 text-[0.95rem] font-normal tracking-normal text-site-ink outline-none transition-[border-color,box-shadow] duration-300 focus:border-site-ink/30 focus:shadow-[0_0_0_4px_rgba(59,59,59,0.08)]"
            name="subject"
            type="text"
            value={form.subject}
            onChange={handleChange}
          />
        </label>
      </div>

      <label className="mt-5 grid gap-2 text-[0.72rem] font-semibold tracking-[0.08em] text-site-copy uppercase">
        Mesaj
        <textarea
          className="min-h-[160px] resize-y rounded-[1.5rem] border border-site-ink/10 bg-site-paper px-5 py-4 text-[0.95rem] font-normal tracking-normal text-site-ink outline-none transition-[border-color,box-shadow] duration-300 focus:border-site-ink/30 focus:shadow-[0_0_0_4px_rgba(59,59,59,0.08)]"
          name="message"
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
        className="group mt-7 inline-flex items-center gap-4 rounded-full bg-site-ink py-2 pr-2 pl-6 text-[0.7rem] font-semibold tracking-[0.08em] text-site-paper uppercase transition-transform duration-500 active:scale-[0.98]"
        type="submit"
      >
        Mesaj gönder
        <span className="grid size-10 place-items-center rounded-full bg-site-paper text-site-ink transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105 motion-reduce:transition-none">
          <ArrowUpRightIcon size={17} weight="light" aria-hidden="true" />
        </span>
      </button>
    </form>
  );
}
