import { relations } from "drizzle-orm";
import { index, pgTable, varchar } from "drizzle-orm/pg-core";

import { pgPrimaryId, pgRefId, timestamps } from "@/helpers/drizzle";

import { userTbl } from "./user";

export const postTbl = pgTable(
  "post",
  {
    id: pgPrimaryId("id"),
    title: varchar("title", { length: 256 }).notNull(),
    userId: pgRefId("user_id")
      .notNull()
      .references(() => userTbl.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (table) => [index("post_title_idx").on(table.title)],
);

export const postRelations = relations(postTbl, ({ one }) => ({
  user: one(userTbl, {
    fields: [postTbl.userId],
    references: [userTbl.id],
  }),
}));

//
export type Post = typeof postTbl.$inferSelect;
