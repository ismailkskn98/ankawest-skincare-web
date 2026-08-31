"use client";

import { SignOut } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { clientApiRequest } from "@/lib/api/client";

export default function LogoutButton() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function logout() {
    setIsSubmitting(true);

    try {
      await clientApiRequest("/api/auth/logout", { method: "POST", body: {} });
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <button
      className="button button-ghost button-block"
      type="button"
      onClick={logout}
      disabled={isSubmitting}
    >
      <SignOut size={17} aria-hidden="true" />
      {isSubmitting ? "Çıkış yapılıyor..." : "Çıkış yap"}
    </button>
  );
}
