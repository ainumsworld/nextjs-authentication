import { createTRPCRouter } from "@/server/trpc";

import { authRouter } from "./auth/router";

export const userRouter = createTRPCRouter({
  auth: authRouter,
});
