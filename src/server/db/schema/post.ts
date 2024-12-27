import {
  index,
  pgTable,
  integer,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

export const postTbl = pgTable(
  "post",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (table) => ({
    nameIndex: index("name_idx").on(table.name),
  }),
);
