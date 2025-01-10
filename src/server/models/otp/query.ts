import { and, eq } from "drizzle-orm";

import type { PartialBy } from "@/types";
import { NotFoundError } from "@/helpers/trpc-error";
import { db } from "@/server/db";
import {
  otpTbl,
  type OtpInsertInput,
  type OtpUpdateInput,
} from "@/server/db/schema";
import { otpMsg } from "@/server/messages";

export type GetOtpArgs = Pick<OtpInsertInput, "email" | "purpose" | "code">;

export class OtpQuery {
  private static readonly table = otpTbl;

  public static async getRecordOrNull(args: PartialBy<GetOtpArgs, "code">) {
    const { email, purpose, code } = args;
    const otp = await db.query.otpTbl.findFirst({
      where: and(
        eq(this.table.email, email),
        eq(this.table.purpose, purpose),
        code ? eq(this.table.code, code) : undefined,
      ),
    });
    return otp ? otp : null;
  }

  public static async getRecord(args: PartialBy<GetOtpArgs, "code">) {
    const otp = await this.getRecordOrNull(args);
    if (!otp) throw NotFoundError(otpMsg.notFound);
    return otp;
  }

  public static async create(input: OtpInsertInput) {
    return db.insert(this.table).values(input);
  }

  public static async update(args: GetOtpArgs, input: OtpUpdateInput) {
    const { email, purpose, code } = args;
    return db
      .update(this.table)
      .set(input)
      .where(
        and(
          and(
            eq(this.table.email, email),
            eq(this.table.purpose, purpose),
            eq(this.table.code, code),
          ),
        ),
      );
  }

  public static async createOrUpdate(input: OtpInsertInput) {
    const { code, validTill } = input;
    return db
      .insert(this.table)
      .values(input)
      .onConflictDoUpdate({
        target: [this.table.email, this.table.purpose],
        set: { code, validTill },
      });
  }

  public static async delete(args: GetOtpArgs) {
    const { email, purpose, code } = args;
    return db
      .delete(this.table)
      .where(
        and(
          eq(this.table.email, email),
          eq(this.table.purpose, purpose),
          eq(this.table.code, code),
        ),
      );
  }
}
