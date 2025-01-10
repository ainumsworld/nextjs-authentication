import type { PartialBy } from "@/types";
import { OTP_EXPIRE_TIME, OTP_LENGTH } from "@/config";
import { BadRequest } from "@/helpers/trpc-error";
import { getFutureTime } from "@/utils/format-time";
import { generateRandomNumberOfDigits } from "@/utils/random-number";
import { type OtpInsertInput } from "@/server/db/schema";
import { otpMsg } from "@/server/messages";

import { OtpQuery, type GetOtpArgs } from "./query";

type SendOtpArgs = Omit<OtpInsertInput, "id" | "code">;

export class OtpService {
  private static readonly query = OtpQuery;

  private static generateOtp() {
    return generateRandomNumberOfDigits(OTP_LENGTH);
  }

  public static async sendOtp(args: PartialBy<SendOtpArgs, "validTill">) {
    const code = this.generateOtp();
    const validTill = args.validTill || getFutureTime(OTP_EXPIRE_TIME);
    await this.query.createOrUpdate({ ...args, code, validTill });
    return code;
  }

  public static async verifyOtp(args: GetOtpArgs) {
    const record = await this.query.getRecordOrNull(args);
    if (!record) throw BadRequest(otpMsg.invalid);
    if (record.validTill < new Date()) throw BadRequest(otpMsg.expired);
    await this.query.delete(args);
  }
}
