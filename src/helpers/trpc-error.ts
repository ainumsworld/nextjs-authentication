import "server-only";

import { TRPCError } from "@trpc/server";

export const AuthError = (message: string) =>
  new TRPCError({
    code: "UNAUTHORIZED",
    message,
  });

export const ForbiddenError = (message: string) =>
  new TRPCError({
    code: "FORBIDDEN",
    message,
  });

export const BadRequest = (message: string) =>
  new TRPCError({
    code: "BAD_REQUEST",
    message,
  });

export const ServerError = (message: string) =>
  new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message,
  });

export const NotFoundError = (message: string) =>
  new TRPCError({
    code: "NOT_FOUND",
    message,
  });
