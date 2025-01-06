import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";

import { type AppRouter } from "@/server/trpc/router";

export type ApiInput = inferRouterInputs<AppRouter>;
export type ApiOutput = inferRouterOutputs<AppRouter>;

export type RootApiInput = ApiInput["root"];
export type RootApiOutput = ApiOutput["root"];

export type UserApiInput = ApiInput["user"];
export type UserApiOutput = ApiOutput["user"];
