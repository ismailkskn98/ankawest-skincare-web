import { completeTotp } from "@/lib/auth/complete-totp";
import { recoveryCodeSchema } from "@/lib/validation/auth";

export async function POST(request) {
  return completeTotp(request, {
    endpoint: "/auth/totp/recover",
    schema: recoveryCodeSchema,
  });
}
