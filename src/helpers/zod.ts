import { MIN_PASSWORD_LENGTH, OTP_LENGTH } from "@/config";
import { number, string } from "zod";

// -----------------------------------------

const userName = () => string().min(1, "Username is required").toLowerCase();

const email = () =>
  string()
    .min(1, "Email is required")
    .email("Invalid eamil address")
    .toLowerCase();

const password = (name: string = "Password") =>
  string()
    .min(1, `${name} is required`)
    .min(
      MIN_PASSWORD_LENGTH,
      `${name} must be at least ${MIN_PASSWORD_LENGTH} characters`,
    );

const otp = () =>
  number()
    .gte(10 ** (OTP_LENGTH - 1), "OTP must be 6 digits")
    .lte(10 ** OTP_LENGTH - 1, "OTP must be 6 digits");

// -----------------------------------------

export const ZOD_SCHEMA = {
  email,
  userName,
  password,
  otp,
};
