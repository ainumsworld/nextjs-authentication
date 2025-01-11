import { convertToMilliseconds } from "@/utils/format-time";

export const MIN_PASSWORD_LENGTH = 6;
export const OTP_LENGTH = 6;
export const OTP_EXPIRE_TIME = convertToMilliseconds(3, "seconds"); // milliseconds
export const TOKEN_EXPIRE_TIME = convertToMilliseconds(1, "days"); // milliseconds

export const APP_URL = "http://localhost:3000";
