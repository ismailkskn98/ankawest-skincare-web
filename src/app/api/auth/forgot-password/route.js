import { apiRequest } from "@/lib/api/server";
import {
  handleRouteError,
  isSameOriginMutation,
  readJsonBody,
  sameOriginErrorResponse,
  validationErrorResponse,
} from "@/lib/auth/route-utils";
import { forgotPasswordSchema } from "@/lib/validation/auth";

export async function POST(request) {
  if (!isSameOriginMutation(request)) {
    return sameOriginErrorResponse();
  }

  const bodyResult = await readJsonBody(request);

  if (!bodyResult.ok) {
    return bodyResult.response;
  }

  const result = forgotPasswordSchema.safeParse(bodyResult.body);

  if (!result.success) {
    return validationErrorResponse(result);
  }

  try {
    await apiRequest("/auth/forgot-password", {
      method: "POST",
      json: result.data,
    });

    return Response.json({
      status: true,
      message:
        "Bu adres sistemde kayıtlıysa şifre sıfırlama bağlantısı gönderildi.",
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
