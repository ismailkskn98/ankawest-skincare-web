import "server-only";

import { redirect } from "next/navigation";

import { ApiError, apiRequest } from "@/lib/api/server";
import { getSessionToken } from "@/lib/auth/session";

function toSearchParams(query) {
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const search = searchParams.toString();
  return search ? `?${search}` : "";
}

export async function adminApiRequest(pathname, options = {}) {
  const token = await getSessionToken();

  if (!token) {
    redirect("/admin/login");
  }

  try {
    return await apiRequest(`/admin/${pathname}`, { ...options, token });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      redirect("/admin/login");
    }

    throw error;
  }
}

export async function getAdminList(resource, query = {}) {
  const payload = await adminApiRequest(`${resource}/list`, {
    search: toSearchParams(query),
  });

  return {
    records: Array.isArray(payload?.data?.records) ? payload.data.records : [],
    pagination: payload?.data?.pagination || {
      page: 1,
      limit: query.limit || 20,
      total: 0,
      totalPages: 1,
    },
  };
}

export async function getAdminRecord(resource, id) {
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
    return null;
  }

  try {
    const payload = await adminApiRequest(`${resource}/list/${id}`);
    return payload?.data || null;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}
