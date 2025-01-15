import { createTRPCRouter } from "@/server/trpc";

import {
  login,
  loginWithGoogle,
  register,
  registerWithGoogle,
} from "./controller";

export const authRouter = createTRPCRouter({
  login,
  loginWithGoogle,
  register,
  registerWithGoogle,
});
