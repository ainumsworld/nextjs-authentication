import { cookies } from "next/headers";
import { literal, object, string } from "zod";

import { env } from "@/env";
import { SessionKey } from "@/types/enums";
import {
  APP_URL,
  REGISTRATION_TOKEN_EXPIRE_TIME,
  TOKEN_EXPIRE_TIME,
} from "@/config";
import { getFutureTime } from "@/utils/format-time";

import { JWT } from "./jwt";
import { ZOD_SCHEMA } from "./zod";

export const TOKEN = {
  create: async (id: string, purpose: SessionKey) => {
    try {
      const payload = { id, purpose };
      const token = await new JWT({
        secret: env.JWT_SECRET,
        jwtIssuer: APP_URL,
        jwtAudience: APP_URL,
      }).sign({ payload, expires: getFutureTime(TOKEN_EXPIRE_TIME) });
      (await cookies()).set(purpose, token, {
        secure: true,
        httpOnly: true,
        expires: getFutureTime(TOKEN_EXPIRE_TIME),
      });
      return token;
    } catch (err) {
      throw new Error("Error while creating token.");
    }
  },

  verify: async (purpose: SessionKey) => {
    try {
      const token = (await cookies()).get(purpose)?.value;
      if (!token) throw new Error("Unauthorized");
      const { payload } = await new JWT({
        secret: env.JWT_SECRET,
        jwtIssuer: APP_URL,
        jwtAudience: APP_URL,
      }).verify(token);
      const schema = object({
        id: string().min(1, "Id is required"),
        purpose: literal(purpose),
      });
      const result = schema.safeParse(payload);
      if (!result.success) throw new Error("Unauthorized");
      return result.data;
    } catch (err: any) {
      throw new Error(err.message || "Unauthorized");
    }
  },
};

export const REGISTRATION_TOKEN = {
  create: async (email: string) => {
    try {
      const purpose = SessionKey.RegisterSession;
      const payload = { email, purpose };
      const token = await new JWT({
        secret: env.JWT_SECRET,
        jwtIssuer: APP_URL,
        jwtAudience: APP_URL,
      }).sign({
        payload,
        expires: getFutureTime(REGISTRATION_TOKEN_EXPIRE_TIME),
      });
      (await cookies()).set(purpose, token, {
        secure: true,
        httpOnly: true,
        expires: getFutureTime(REGISTRATION_TOKEN_EXPIRE_TIME),
      });
      return token;
    } catch (err) {
      throw new Error("Error while creating token.");
    }
  },

  verify: async (email: string) => {
    try {
      const purpose = SessionKey.RegisterSession;
      const token = (await cookies()).get(purpose)?.value;
      if (!token)
        throw new Error("Registration token not found, Please register again");
      const { payload } = await new JWT({
        secret: env.JWT_SECRET,
        jwtIssuer: APP_URL,
        jwtAudience: APP_URL,
      }).verify(token);
      const schema = object({
        email: ZOD_SCHEMA.email(),
        purpose: literal(purpose),
      });
      const result = schema.safeParse(payload);
      if (!result.success)
        throw new Error("Token verification failed, Please register again");
      (await cookies()).delete(purpose);
      if (email !== result.data.email)
        throw new Error("Token verification failed, Please register again");
      return result.data;
    } catch (err: any) {
      throw new Error(
        err.message || "Token verification failed, Please register again",
      );
    }
  },
};
