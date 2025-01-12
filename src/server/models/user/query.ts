import { and, eq } from "drizzle-orm";

import { UserRole } from "@/types/enums";
import { NotFoundError } from "@/helpers/trpc-error";
import { switchInvalidCase } from "@/utils";
import { db } from "@/server/db";
import { userTbl, type User, type UserInsertInput } from "@/server/db/schema";
import { userMsg } from "@/server/messages";

type UserByArgs =
  | ({ by: "id" } & Pick<User, "id">)
  | ({ by: "email" } & Pick<User, "email">)
  | ({ by: "username" } & Pick<User, "username">);

type GetUserArgs = UserByArgs & {
  role?: UserRole;
};

export class UserQuery {
  private static readonly table = userTbl;

  public static getWhereCondition(args: GetUserArgs) {
    const { role } = args;
    function byFns() {
      switch (args.by) {
        case "id":
          return eq(userTbl.id, args.id);
        case "email":
          return eq(userTbl.email, args.email);
        case "username":
          return eq(userTbl.email, args.username);
        default:
          switchInvalidCase();
      }
    }
    const by = byFns();
    const where = role ? and(by, eq(userTbl.role, role)) : by;
    return where;
  }

  public static async getRecordOrNull(args: GetUserArgs) {
    const where = this.getWhereCondition(args);
    const user = await db.query.userTbl.findFirst({ where });
    return user ? user : null;
  }

  public static async getRecord(args: GetUserArgs) {
    const user = await this.getRecordOrNull(args);
    if (!user) throw NotFoundError(userMsg.notFound);
    return user;
  }

  public static async create(input: UserInsertInput) {
    const record = await db.insert(this.table).values(input).returning();
    return record[0]!;
  }
}
