import "server-only";

const API_BASE_ENV = "ANKAWEST_SKINCARE_API_BASE_URL";

export class ApiError extends Error {
  constructor(message, status = 500, payload = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

export function getApiUrl(pathname, search = "") {
  const baseUrl = process.env[API_BASE_ENV];

  if (!baseUrl) {
    throw new ApiError(
      `${API_BASE_ENV} ortam değişkeni tanımlı değil.`,
      500,
    );
  }

  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
  const normalizedPath = pathname.replace(/^\//, "");
  return `${normalizedBaseUrl}/${normalizedPath}${search}`;
}

function parseResponseBody(text, contentType) {
  if (!text) {
    return null;
  }

  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  }

  return text;
}

export async function apiRequest(
  pathname,
  { method = "GET", token, json, body, headers, search = "" } = {},
) {
  const requestHeaders = new Headers(headers);

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  let requestBody = body;

  if (json !== undefined) {
    requestHeaders.set("Content-Type", "application/json");
    requestBody = JSON.stringify(json);
  }

  let response;

  try {
    response = await fetch(getApiUrl(pathname, search), {
      method,
      headers: requestHeaders,
      body: requestBody,
      cache: "no-store",
    });
  } catch {
    throw new ApiError("API servisine şu anda ulaşılamıyor.", 503);
  }

  const responseText = await response.text();
  const payload = parseResponseBody(
    responseText,
    response.headers.get("content-type") || "",
  );

  if (!response.ok) {
    throw new ApiError(
      payload?.message || "İşlem tamamlanamadı.",
      response.status,
      payload,
    );
  }

  return payload;
}

export function apiErrorResponse(error) {
  const status = error instanceof ApiError ? error.status : 500;
  const message =
    error instanceof ApiError
      ? error.message
      : "Beklenmeyen bir sunucu hatası oluştu.";

  return Response.json({ status: false, message }, { status });
}
