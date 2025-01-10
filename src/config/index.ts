import { convertToMilliseconds } from "@/utils/format-time";

export const MIN_PASSWORD_LENGTH = 6;
export const OTP_LENGTH = 6;
export const OTP_EXPIRE_TIME = convertToMilliseconds(3, "seconds"); // milliseconds
