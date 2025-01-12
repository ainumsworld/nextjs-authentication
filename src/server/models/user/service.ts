import { UserStatus } from "@/types/enums";
import { BCRYPT } from "@/helpers/bcrypt";
import { BadRequest } from "@/helpers/trpc-error";
import type { User } from "@/server/db/schema";
import { userMsg } from "@/server/messages";

export class UserService {
  constructor(public readonly record: User) {}

  public validateStatus() {
    const { status } = this.record;
    if (status === UserStatus.Blocked) throw BadRequest(userMsg.accountBlocked);
  }

  public async validatePassword(password: string) {
    const { password: userPassword } = this.record;
    if (!userPassword) throw BadRequest(userMsg.passwordNotUsed);
    const isPasswordMatch = await BCRYPT.compare(password, userPassword);
    if (!isPasswordMatch) throw BadRequest(userMsg.invalidPassword);
  }
}
