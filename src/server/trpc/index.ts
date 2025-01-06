import { timingMiddleware } from "./middlewares/timing";
import { trpc } from "./root";

export const { createCallerFactory } = trpc;
export const createTRPCRouter = trpc.router;

export const publicProcedure = trpc.procedure.use(timingMiddleware);
