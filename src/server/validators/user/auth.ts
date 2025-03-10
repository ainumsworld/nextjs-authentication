import { discriminatedUnion, literal, object, string, type TypeOf } from "zod";

import { RegisterStep } from "@/types/enums";
import { ZOD_SCHEMA } from "@/helpers/zod";

// login
export const login = object({
  email: ZOD_SCHEMA.email(),
  password: ZOD_SCHEMA.password("Password"),
});

export type Login = TypeOf<typeof login>;

export const loginWithGoogle = object({
  code: string().min(1, "Code is required"),
});

export type LoginWithGoogle = TypeOf<typeof loginWithGoogle>;

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

export const registerWithGoogle = discriminatedUnion("step", [
  object({
    step: literal(1),
    code: string().min(1, "Code is required"),
  }),
  object({
    step: literal(2),
    email: ZOD_SCHEMA.email(),
    fullname: string().min(1, "Fullname is required"),
    username: ZOD_SCHEMA.userName(),
    avatar: string().optional(),
  }),
]);

export type RegisterWithGoogle = TypeOf<typeof registerWithGoogle>;

// forgot password
export const forgotPassword = discriminatedUnion("step", [
  object({
    step: literal(1),
  }),

  object({
    step: literal(2),
    otp: ZOD_SCHEMA.otp(),
    newPassword: ZOD_SCHEMA.password("New password"),
    confirmPassword: string().min(1, "Confirm password is required"),
  }),
])
  .and(object({ email: ZOD_SCHEMA.email() }))
  .refine(
    (data) => {
      if (data.step === 1) return true;
      return data.step === 2 && data.newPassword === data.confirmPassword;
    },
    {
      path: ["confirmPassword"],
      message: "Passwords are not matching",
    },
  );

export type ForgotPassword = TypeOf<typeof forgotPassword>;
