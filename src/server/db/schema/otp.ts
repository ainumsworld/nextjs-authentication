import {
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import { OtpPurpose } from "@/types/enums";
import { enumToPgEnum, pgPrimaryId } from "@/helpers/drizzle";

const otpPurposeEnum = enumToPgEnum("otp_purpose", OtpPurpose);

export const otpTbl = pgTable(
  "otp",
  {
    id: pgPrimaryId("id"),
    code: integer("code").notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    purpose: otpPurposeEnum("purpose").notNull(),
    validTill: timestamp("valid_till", {
      withTimezone: true,
    }).notNull(),
  },
  (table) => [
    {
      emailPurposeUnique: uniqueIndex("email_purpose_unique").on(
        table.email,
        table.purpose,
      ),
    },
  ],
);

export type Otp = typeof otpTbl.$inferSelect;
export type OtpInsertInput = typeof otpTbl.$inferInsert;
export type OtpUpdateInput = Partial<OtpInsertInput>;
