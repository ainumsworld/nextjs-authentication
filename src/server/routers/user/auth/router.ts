import { createTRPCRouter } from "@/server/trpc";

import { login, register } from "./controller";

export const authRouter = createTRPCRouter({
  login,
  register,
});
