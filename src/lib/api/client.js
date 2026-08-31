export class ClientApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.name = "ClientApiError";
    this.status = status;
    this.payload = payload;
  }
}

export async function clientApiRequest(pathname, options = {}) {
  const headers = new Headers(options.headers);
  const requestOptions = {
    ...options,
    headers,
    credentials: "same-origin",
  };

  if (
    options.body &&
    !(options.body instanceof FormData) &&
    typeof options.body !== "string"
  ) {
    headers.set("Content-Type", "application/json");
    requestOptions.body = JSON.stringify(options.body);
  }

  const response = await fetch(pathname, requestOptions);
  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new ClientApiError(
      payload?.message || "İşlem tamamlanamadı.",
      response.status,
      payload,
    );
  }

  return payload;
}

export function getPayloadData(payload) {
  return payload?.data ?? null;
}
