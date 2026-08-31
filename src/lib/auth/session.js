import "server-only";

import { cookies } from "next/headers";

import {
  AUTH_FLOW_COOKIE_NAME,
  SESSION_COOKIE_NAME,
} from "@/lib/auth/constants";

export { AUTH_FLOW_COOKIE_NAME, SESSION_COOKIE_NAME };

const commonCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
  priority: "high",
};

export async function getSessionToken() {
  return (await cookies()).get(SESSION_COOKIE_NAME)?.value || null;
}

export async function setSessionToken(token) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    ...commonCookieOptions,
    maxAge: 60 * 60 * 4,
  });
}

export async function clearSessionToken() {
  (await cookies()).set(SESSION_COOKIE_NAME, "", {
    ...commonCookieOptions,
    maxAge: 0,
  });
}

export async function getAuthFlowToken() {
  return (await cookies()).get(AUTH_FLOW_COOKIE_NAME)?.value || null;
}

export async function setAuthFlowToken(token) {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_FLOW_COOKIE_NAME, token, {
    ...commonCookieOptions,
    maxAge: 60 * 10,
  });
}

export async function clearAuthFlowToken() {
  (await cookies()).set(AUTH_FLOW_COOKIE_NAME, "", {
    ...commonCookieOptions,
    maxAge: 0,
  });
}
