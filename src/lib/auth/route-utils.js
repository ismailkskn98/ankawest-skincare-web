import "server-only";

import { apiErrorResponse } from "@/lib/api/server";

const JSON_BODY_LIMIT_BYTES = 64 * 1024;

export function isSameOriginMutation(request) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");

  if (!origin && !fetchSite) {
    return false;
  }

  if (origin && origin !== requestUrl.origin) {
    return false;
  }

  if (fetchSite && !["same-origin", "none"].includes(fetchSite)) {
    return false;
  }

  return true;
}

export function sameOriginErrorResponse() {
  return Response.json(
    { status: false, message: "İstek kaynağı doğrulanamadı." },
    { status: 403 },
  );
}

function jsonBodyErrorResponse(message, status) {
  return Response.json({ status: false, message }, { status });
}

export async function readJsonBody(request) {
  const declaredLength = Number(request.headers.get("content-length"));

  if (Number.isFinite(declaredLength) && declaredLength > JSON_BODY_LIMIT_BYTES) {
    return {
      ok: false,
      response: jsonBodyErrorResponse("İstek gövdesi çok büyük.", 413),
    };
  }

  if (!request.body) {
    return {
      ok: false,
      response: jsonBodyErrorResponse("Geçerli bir JSON gövdesi gönderin.", 400),
    };
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let bodyText = "";
  let receivedBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      receivedBytes += value.byteLength;

      if (receivedBytes > JSON_BODY_LIMIT_BYTES) {
        await reader.cancel();
        return {
          ok: false,
          response: jsonBodyErrorResponse("İstek gövdesi çok büyük.", 413),
        };
      }

      bodyText += decoder.decode(value, { stream: true });
    }

    bodyText += decoder.decode();

    return { ok: true, body: JSON.parse(bodyText) };
  } catch {
    return {
      ok: false,
      response: jsonBodyErrorResponse("Geçerli bir JSON gövdesi gönderin.", 400),
    };
  }
}

export function validationErrorResponse(result) {
  const fieldErrors = result.error.flatten().fieldErrors;
  return Response.json(
    {
      status: false,
      message: "Lütfen form alanlarını kontrol edin.",
      data: { fieldErrors },
    },
    { status: 422 },
  );
}

export async function handleRouteError(error) {
  return apiErrorResponse(error);
}
