import {
  MutationCache,
  QueryCache,
  QueryClient,
  defaultShouldDehydrateQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { TRPCClientError } from "@trpc/client";
import toast from "react-hot-toast";
import SuperJSON from "superjson";
import { object, string } from "zod";

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 30 * 1000,
        retry: 0,
        placeholderData: keepPreviousData,
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
    queryCache: new QueryCache({
      // onError: (error) => onError(error),
    }),
    mutationCache: new MutationCache({
      onError: (error) => onError(error),
      onSuccess(data) {
        const result = object({
          message: string(),
        }).safeParse(data);
        if (result.success) {
          const { message } = result.data;
          toast.success(message);
        }
      },
    }),
  });

function onError(error: unknown) {
  if (!(error instanceof TRPCClientError)) {
    toast.error("Something went wrong");
    return;
  }

  toast.error(error.message);
}
