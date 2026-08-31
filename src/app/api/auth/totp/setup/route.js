import { apiRequest } from "@/lib/api/server";
import { getAuthFlowToken } from "@/lib/auth/session";
import {
  handleRouteError,
  isSameOriginMutation,
  readJsonBody,
  sameOriginErrorResponse,
} from "@/lib/auth/route-utils";

export async function POST(request) {
  if (!isSameOriginMutation(request)) {
    return sameOriginErrorResponse();
  }

  const bodyResult = await readJsonBody(request);

  if (!bodyResult.ok) {
    return bodyResult.response;
  }

  const challengeToken = await getAuthFlowToken();

  if (!challengeToken) {
    return Response.json(
      { status: false, message: "Giriş doğrulama süresi doldu." },
      { status: 401 },
    );
  }

  try {
    const payload = await apiRequest("/auth/totp/setup", {
      method: "POST",
      token: challengeToken,
      json: {},
    });
    const { manualKey, otpauthUri, qrCodeDataUrl } = payload?.data || {};

    return Response.json({
      status: true,
      message: payload?.message || "Doğrulama uygulaması kuruluma hazır.",
      data: { manualKey, otpauthUri, qrCodeDataUrl },
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
