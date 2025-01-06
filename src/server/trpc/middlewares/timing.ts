import { env } from "@/env";

import { trpc } from "../root";

export const timingMiddleware = trpc.middleware(async ({ next, path }) => {
  const start = Date.now();

  const result = await next();

  const end = Date.now();

  if (env.NODE_ENV === "development") {
    console.log(`[TRPC] ${path} took ${end - start}ms to execute`);
  }

  return result;
});
