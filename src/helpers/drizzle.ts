import { createId } from "@paralleldrive/cuid2";
import { pgEnum, timestamp, varchar } from "drizzle-orm/pg-core";

export const pgPrimaryId = (name: string) =>
  varchar(name, { length: 30 })
    .primaryKey()
    .$defaultFn(() => createId());

export const pgRefId = (name: string) => varchar(name, { length: 30 });

export const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
};

/**
 * Converts a TypeScript enum to a pgEnum while retaining type safety.
 *
 * @param name - The name of the PostgreSQL enum.
 * @param tsEnum - The TypeScript enum object.
 * @returns A pgEnum definition with strict type safety.
 */
export function enumToPgEnum<T extends Record<string, any>>(
  name: string,
  tsEnum: T,
) {
  const values = Object.values(tsEnum) as T[keyof T][];
  if (values.length === 0) {
    throw new Error("Enum must have at least one value.");
  }
  return pgEnum(name, values as [T[keyof T]]);
}
