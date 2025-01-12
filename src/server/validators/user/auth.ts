import { discriminatedUnion, literal, object, string, type TypeOf } from "zod";

import { RegisterStep } from "@/types/enums";
import { ZOD_SCHEMA } from "@/helpers/zod";

// register
const baseRegister = object({
  email: ZOD_SCHEMA.email(),
  password: ZOD_SCHEMA.password("Password"),
  confirmPassword: string().min(1, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords are not matching",
});

export const register = discriminatedUnion("step", [
  object({
    step: literal(RegisterStep.EnterEmail),
  }),

  object({
    step: literal(RegisterStep.VerifyOTP),
    otp: ZOD_SCHEMA.otp(),
  }),

  object({
    step: literal(RegisterStep.EnterDetails),
    fullname: string().min(1, "Fullname is required"),
    username: ZOD_SCHEMA.userName(),
  }),
]).and(baseRegister);

export type Register = TypeOf<typeof register>;

// login
export const login = object({
  email: ZOD_SCHEMA.email(),
  password: ZOD_SCHEMA.password("Password"),
});

export type Login = TypeOf<typeof login>;
