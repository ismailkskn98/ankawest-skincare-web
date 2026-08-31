import { apiRequest } from "@/lib/api/server";
import {
  handleRouteError,
  isSameOriginMutation,
  readJsonBody,
  sameOriginErrorResponse,
  validationErrorResponse,
} from "@/lib/auth/route-utils";
import { resetPasswordSchema } from "@/lib/validation/auth";

export async function POST(request) {
  if (!isSameOriginMutation(request)) {
    return sameOriginErrorResponse();
  }

  const bodyResult = await readJsonBody(request);

  if (!bodyResult.ok) {
    return bodyResult.response;
  }

  const result = resetPasswordSchema.safeParse(bodyResult.body);

  if (!result.success) {
    return validationErrorResponse(result);
  }

  try {
    const payload = await apiRequest("/auth/reset-password", {
      method: "POST",
      json: result.data,
    });

    return Response.json({
      status: true,
      message: payload?.message || "Şifreniz başarıyla güncellendi.",
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
