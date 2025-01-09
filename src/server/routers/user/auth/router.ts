import { createTRPCRouter } from "@/server/trpc";

import { AuthController } from "./controller";

const { login, register } = AuthController;

export const authRouter = createTRPCRouter({
  login,
  register,
});
