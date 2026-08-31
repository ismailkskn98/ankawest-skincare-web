import { completeTotp } from "@/lib/auth/complete-totp";
import { verificationCodeSchema } from "@/lib/validation/auth";

export async function POST(request) {
  return completeTotp(request, {
    endpoint: "/auth/totp/verify",
    schema: verificationCodeSchema,
  });
}
