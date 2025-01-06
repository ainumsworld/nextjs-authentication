import { rootRouter } from "../routers/root/router";
import { userRouter } from "../routers/user/router";
import { createCallerFactory, createTRPCRouter } from "./";

export const appRouter = createTRPCRouter({
  root: rootRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
