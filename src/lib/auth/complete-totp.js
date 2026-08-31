import "server-only";

import { ApiError, apiRequest } from "@/lib/api/server";
import {
  clearAuthFlowToken,
  getAuthFlowToken,
  setSessionToken,
} from "@/lib/auth/session";
import {
  handleRouteError,
  isSameOriginMutation,
  readJsonBody,
  sameOriginErrorResponse,
  validationErrorResponse,
} from "@/lib/auth/route-utils";

export async function completeTotp(request, { endpoint, schema }) {
  if (!isSameOriginMutation(request)) {
    return sameOriginErrorResponse();
  }

  const bodyResult = await readJsonBody(request);

  if (!bodyResult.ok) {
    return bodyResult.response;
  }

  const result = schema.safeParse(bodyResult.body);

  if (!result.success) {
    return validationErrorResponse(result);
  }

  const challengeToken = await getAuthFlowToken();

  if (!challengeToken) {
    return Response.json(
      {
        status: false,
        message: "Giriş doğrulama süresi doldu. Lütfen yeniden giriş yapın.",
      },
      { status: 401 },
    );
  }

  try {
    const payload = await apiRequest(endpoint, {
      method: "POST",
      token: challengeToken,
      json: result.data,
    });
    const { accessToken, user, recoveryCodes } = payload?.data || {};

    if (!accessToken) {
      throw new ApiError("Oturum bilgisi API yanıtında bulunamadı.", 502);
    }

    await setSessionToken(accessToken);
    await clearAuthFlowToken();

    return Response.json({
      status: true,
      message: payload?.message || "Giriş başarıyla tamamlandı.",
      data: {
        user: user || null,
        recoveryCodes: Array.isArray(recoveryCodes) ? recoveryCodes : undefined,
      },
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
