import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SessionKey } from "@/types/enums";
import { REDIRECT_AFTER_LOGOUT } from "@/config";

export const GET = async () => {
  (await cookies()).delete(SessionKey.UserSession);
  redirect(REDIRECT_AFTER_LOGOUT);
};
