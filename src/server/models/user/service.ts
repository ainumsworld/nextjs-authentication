import { UserStatus } from "@/types/enums";
import { BadRequest } from "@/helpers/trpc-error";
import type { User } from "@/server/db/schema";
import { userMsg } from "@/server/messages";

export class UserService {
  private readonly message = userMsg;

  constructor(public readonly record: User) {}

  public validateStatus() {
    const { status } = this.record;
    if (status === UserStatus.Blocked) throw BadRequest(this.message.blocked);
  }
}
