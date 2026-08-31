import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";

import { ApiError, apiRequest } from "@/lib/api/server";
import { getSessionToken } from "@/lib/auth/session";

function toAdminUser(user) {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    status: user.status,
  };
}

export const requireAdminSession = cache(async () => {
  const token = await getSessionToken();

  if (!token) {
    redirect("/admin/login");
  }

  try {
    const payload = await apiRequest("/auth/me", { token });
    const user = toAdminUser(payload?.data);

    if (!user || user.status !== "active") {
      redirect("/admin/login");
    }

    return user;
  } catch (error) {
    if (error instanceof ApiError && [401, 403].includes(error.status)) {
      redirect("/admin/login");
    }

    throw error;
  }
});

export async function requireAdministrator() {
  const user = await requireAdminSession();

  if (user.role !== "admin") {
    redirect("/admin");
  }

  return user;
}
