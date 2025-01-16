import { createTRPCRouter } from "@/server/trpc";

import {
  forgotPassword,
  login,
  loginWithGoogle,
  register,
  registerWithGoogle,
} from "./controller";

export const authRouter = createTRPCRouter({
  forgotPassword,
  login,
  loginWithGoogle,
  register,
  registerWithGoogle,
});
