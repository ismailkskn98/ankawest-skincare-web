import { ApiError, apiRequest } from "@/lib/api/server";
import {
  clearAuthFlowToken,
  clearSessionToken,
  setAuthFlowToken,
  setSessionToken,
} from "@/lib/auth/session";
import {
  handleRouteError,
  isSameOriginMutation,
  readJsonBody,
  sameOriginErrorResponse,
  validationErrorResponse,
} from "@/lib/auth/route-utils";
import { loginSchema } from "@/lib/validation/auth";

const totpSteps = new Set(["totp_setup", "totp_challenge"]);

export async function POST(request) {
  if (!isSameOriginMutation(request)) {
    return sameOriginErrorResponse();
  }

  const bodyResult = await readJsonBody(request);

  if (!bodyResult.ok) {
    return bodyResult.response;
  }

  const result = loginSchema.safeParse(bodyResult.body);

  if (!result.success) {
    return validationErrorResponse(result);
  }

  try {
    const payload = await apiRequest("/auth/login", {
      method: "POST",
      json: result.data,
    });
    const {
      nextStep,
      challengeToken,
      accessToken,
      user,
    } = payload?.data || {};

    await clearSessionToken();

    if (nextStep === "authenticated") {
      if (!accessToken) {
        throw new ApiError("Oturum bilgisi API yanıtında bulunamadı.", 502);
      }

      await setSessionToken(accessToken);
      await clearAuthFlowToken();

      return Response.json({
        status: true,
        message: payload?.message || "Oturum açıldı.",
        data: { nextStep, user: user || null },
      });
    }

    if (!totpSteps.has(nextStep) || !challengeToken) {
      throw new ApiError("Giriş akışı API yanıtında doğrulanamadı.", 502);
    }

    await setAuthFlowToken(challengeToken);

    return Response.json({
      status: true,
      message: payload?.message || "İki faktörlü doğrulama gerekli.",
      data: { nextStep },
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
