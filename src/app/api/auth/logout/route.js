import { apiRequest } from "@/lib/api/server";
import {
  clearAuthFlowToken,
  clearSessionToken,
  getSessionToken,
} from "@/lib/auth/session";
import {
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

  const token = await getSessionToken();

  try {
    if (token) {
      await apiRequest("/auth/logout", { method: "POST", token, json: {} });
    }
  } catch {
    // Yerel oturum her durumda kapatılır; API oturumu token süresiyle sonlanır.
  } finally {
    await clearSessionToken();
    await clearAuthFlowToken();
  }

  return Response.json({ status: true, message: "Oturum kapatıldı." });
}
