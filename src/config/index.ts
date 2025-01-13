import { APP_ROUTES } from "@/config/routes";
import { convertToMilliseconds } from "@/utils/format-time";

export const MIN_PASSWORD_LENGTH = 6;
export const OTP_LENGTH = 6;
export const OTP_EXPIRE_TIME = convertToMilliseconds(3, "minutes"); // milliseconds
export const TOKEN_EXPIRE_TIME = convertToMilliseconds(1, "days"); // milliseconds
export const REGISTRATION_TOKEN_EXPIRE_TIME = convertToMilliseconds(1, "hours"); // milliseconds

export const DEFAULT_LOGIN_EMAIL = "demo123@gmail.com";
export const DEFAULT_LOGIN_PASSWORD = "demo123";
export const REDIRECT_AFTER_LOGIN = APP_ROUTES.home;
export const REDIRECT_AFTER_LOGOUT = APP_ROUTES.login;

export const APP_URL = "http://localhost:3000";
