import { getApiUrl } from "@/lib/api/server";
import { clearSessionToken, getSessionToken } from "@/lib/auth/session";
import {
  isSameOriginMutation,
  sameOriginErrorResponse,
} from "@/lib/auth/route-utils";

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxImageSize = 5 * 1024 * 1024;
const maxMultipartSize = 42 * 1024 * 1024;
const maxJsonSize = 1024 * 1024;

const routeRules = [
  { pattern: /^products\/list(?:\/[a-zA-Z0-9_-]+)?$/, methods: ["GET"] },
  { pattern: /^products\/create$/, methods: ["POST"] },
  { pattern: /^products\/(?:update|publish)\/[a-zA-Z0-9_-]+$/, methods: ["PUT"] },
  { pattern: /^products\/delete\/[a-zA-Z0-9_-]+$/, methods: ["DELETE"] },
  {
    pattern: /^products\/[a-zA-Z0-9_-]+\/images\/create$/,
    methods: ["POST"],
  },
  {
    pattern: /^products\/[a-zA-Z0-9_-]+\/images\/update\/[a-zA-Z0-9_-]+$/,
    methods: ["PUT"],
  },
  {
    pattern: /^products\/[a-zA-Z0-9_-]+\/images\/delete\/[a-zA-Z0-9_-]+$/,
    methods: ["DELETE"],
  },
  { pattern: /^categories\/list(?:\/[a-zA-Z0-9_-]+)?$/, methods: ["GET"] },
  { pattern: /^categories\/create$/, methods: ["POST"] },
  { pattern: /^categories\/(?:update|publish)\/[a-zA-Z0-9_-]+$/, methods: ["PUT"] },
  { pattern: /^categories\/delete\/[a-zA-Z0-9_-]+$/, methods: ["DELETE"] },
  { pattern: /^site-contents\/list(?:\/[a-zA-Z0-9_-]+)?$/, methods: ["GET"] },
  { pattern: /^site-contents\/create$/, methods: ["POST"] },
  { pattern: /^site-contents\/(?:update|publish)\/[a-zA-Z0-9_-]+$/, methods: ["PUT"] },
  { pattern: /^site-contents\/delete\/[a-zA-Z0-9_-]+$/, methods: ["DELETE"] },
  { pattern: /^users\/list(?:\/[a-zA-Z0-9_-]+)?$/, methods: ["GET"] },
  { pattern: /^users\/create$/, methods: ["POST"] },
  { pattern: /^users\/update\/[a-zA-Z0-9_-]+$/, methods: ["PUT"] },
  {
    pattern: /^users\/(?:deactivate|reset-totp)\/[a-zA-Z0-9_-]+$/,
    methods: ["PUT"],
  },
];

function isAllowedRoute(pathname, method) {
  return routeRules.some(
    (rule) => rule.pattern.test(pathname) && rule.methods.includes(method),
  );
}

function validateImageFormData(formData) {
  const files = formData
    .getAll("images")
    .filter((value) => typeof value === "object" && "size" in value);
  const hasUnexpectedFile = Array.from(formData.entries()).some(
    ([key, value]) =>
      key !== "images" && typeof value === "object" && "size" in value,
  );

  if (hasUnexpectedFile || files.length < 1 || files.length > 8) {
    return "En az 1, en fazla 8 görsel yükleyebilirsiniz.";
  }

  if (files.some((file) => !allowedImageTypes.has(file.type))) {
    return "Yalnızca JPEG, PNG veya WebP görsel yükleyebilirsiniz.";
  }

  if (files.some((file) => file.size > maxImageSize)) {
    return "Her görsel en fazla 5 MB olabilir.";
  }

  return null;
}

async function readBoundedBody(request, maxBytes) {
  const declaredSize = Number(request.headers.get("content-length") || 0);

  if (declaredSize > maxBytes) {
    return null;
  }

  if (!request.body) {
    return new Uint8Array();
  }

  const reader = request.body.getReader();
  const chunks = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    totalBytes += value.byteLength;

    if (totalBytes > maxBytes) {
      await reader.cancel();
      return null;
    }

    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;

  chunks.forEach((chunk) => {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  });

  return body;
}

async function handleAdminRequest(request, context) {
  const { path } = await context.params;
  const pathname = Array.isArray(path) ? path.join("/") : "";
  const method = request.method.toUpperCase();

  if (!isAllowedRoute(pathname, method)) {
    return Response.json(
      { status: false, message: "Bu yönetim API rotasına izin verilmiyor." },
      { status: 404 },
    );
  }

  if (method !== "GET" && !isSameOriginMutation(request)) {
    return sameOriginErrorResponse();
  }

  const token = await getSessionToken();

  if (!token) {
    return Response.json(
      { status: false, message: "Oturum bulunamadı." },
      { status: 401 },
    );
  }

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  let body;

  if (method !== "GET") {
    if (pathname.endsWith("/images/create")) {
      const boundedBody = await readBoundedBody(request, maxMultipartSize);

      if (!boundedBody) {
        return Response.json(
          { status: false, message: "Yükleme toplam boyutu çok büyük." },
          { status: 413 },
        );
      }

      const boundedRequest = new Request(request.url, {
        method,
        headers: request.headers,
        body: boundedBody,
      });
      const formData = await boundedRequest.formData();
      const validationMessage = validateImageFormData(formData);

      if (validationMessage) {
        return Response.json(
          { status: false, message: validationMessage },
          { status: 422 },
        );
      }

      body = formData;
    } else {
      const boundedBody = await readBoundedBody(request, maxJsonSize);

      if (!boundedBody) {
        return Response.json(
          { status: false, message: "İstek gövdesi çok büyük." },
          { status: 413 },
        );
      }

      const contentType = request.headers.get("content-type");

      if (contentType) {
        headers.set("Content-Type", contentType);
      }

      body = boundedBody.byteLength > 0 ? boundedBody : undefined;
    }
  }

  let upstreamResponse;

  try {
    upstreamResponse = await fetch(
      getApiUrl(`/admin/${pathname}`, request.nextUrl.search),
      {
        method,
        headers,
        body,
        cache: "no-store",
      },
    );
  } catch {
    return Response.json(
      { status: false, message: "API servisine şu anda ulaşılamıyor." },
      { status: 503 },
    );
  }

  if (upstreamResponse.status === 401) {
    await clearSessionToken();
  }

  const responseHeaders = new Headers({ "Cache-Control": "no-store" });
  const contentType = upstreamResponse.headers.get("content-type");

  if (contentType) {
    responseHeaders.set("Content-Type", contentType);
  }

  return new Response(await upstreamResponse.arrayBuffer(), {
    status: upstreamResponse.status,
    headers: responseHeaders,
  });
}

export function GET(request, context) {
  return handleAdminRequest(request, context);
}

export function POST(request, context) {
  return handleAdminRequest(request, context);
}

export function PUT(request, context) {
  return handleAdminRequest(request, context);
}

export function DELETE(request, context) {
  return handleAdminRequest(request, context);
}
