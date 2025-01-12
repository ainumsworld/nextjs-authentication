import { relations } from "drizzle-orm";
import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";

import { UserRole, UserStatus } from "@/types/enums";
import { enumToPgEnum, pgPrimaryId, timestamps } from "@/helpers/drizzle";

import { postTbl } from "./post";

export const userRoleEnum = enumToPgEnum("user_role", UserRole);
export const userStatusEnum = enumToPgEnum("user_status", UserStatus);

export const userTbl = pgTable(
  "user",
  {
    id: pgPrimaryId("id"),
    fullname: varchar("fullname", { length: 256 }).notNull(),
    username: varchar("username", { length: 256 }).notNull().unique(),
    email: varchar("email", { length: 256 }).notNull().unique(),
    password: varchar("password", { length: 256 }),
    avatar: varchar("avatar", { length: 256 }),
    role: userRoleEnum("role").notNull().default(UserRole.User),
    status: userStatusEnum("status").notNull().default(UserStatus.Active),
    ...timestamps,
  },
  (table) => [uniqueIndex("user_email_unique_idx").on(table.email)],
);

export const userRelations = relations(userTbl, ({ many }) => ({
  posts: many(postTbl),
}));

//
export type User = typeof userTbl.$inferSelect;
export type UserInsertInput = typeof userTbl.$inferInsert;
export type UserUpdateInput = Partial<UserInsertInput>;
