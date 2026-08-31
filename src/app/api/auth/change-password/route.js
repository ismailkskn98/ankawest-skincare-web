import { ApiError, apiRequest } from "@/lib/api/server";
import {
  clearAuthFlowToken,
  clearSessionToken,
  getSessionToken,
} from "@/lib/auth/session";
import {
  handleRouteError,
  isSameOriginMutation,
  readJsonBody,
  sameOriginErrorResponse,
  validationErrorResponse,
} from "@/lib/auth/route-utils";
import { changePasswordSchema } from "@/lib/validation/auth";

export async function PUT(request) {
  if (!isSameOriginMutation(request)) {
    return sameOriginErrorResponse();
  }

  const bodyResult = await readJsonBody(request);

  if (!bodyResult.ok) {
    return bodyResult.response;
  }

  const result = changePasswordSchema.safeParse(bodyResult.body);

  if (!result.success) {
    return validationErrorResponse(result);
  }

  const token = await getSessionToken();

  if (!token) {
    return Response.json(
      { status: false, message: "Geçerli bir oturum bilgisi gerekli." },
      { status: 401 },
    );
  }

  try {
    const payload = await apiRequest("/auth/change-password", {
      method: "PUT",
      token,
      json: result.data,
    });

    await clearSessionToken();
    await clearAuthFlowToken();

    return Response.json({
      status: true,
      message:
        payload?.message ||
        "Şifreniz değiştirildi. Yeniden giriş yapabilirsiniz.",
      data: null,
    });
  } catch (error) {
    if (error instanceof ApiError && [401, 403].includes(error.status)) {
      await clearSessionToken();
      await clearAuthFlowToken();
    }

    return handleRouteError(error);
  }
}
