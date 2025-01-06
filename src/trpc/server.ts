import "server-only";

import { cache } from "react";
import { createHydrationHelpers } from "@trpc/react-query/rsc";

import { createCaller, type AppRouter } from "@/server/trpc/router";

import { createQueryClient } from "./query-client";

const getQueryClient = cache(createQueryClient);
const caller = createCaller({});

export const {
  trpc: { root: serverRootApi, user: serverUserApi },
  HydrateClient,
} = createHydrationHelpers<AppRouter>(caller, getQueryClient);
