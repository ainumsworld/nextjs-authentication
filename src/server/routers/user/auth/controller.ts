import { sendResponse } from "@/utils/send-response";
import { authMsg } from "@/server/messages";
import { publicProcedure } from "@/server/trpc";
import { authValidator } from "@/server/validators/user";

export class AuthController {
  private static readonly message = authMsg;

  public static login = publicProcedure
    .input(authValidator.login)
    .mutation(async ({ input }) => {
      const { email, password } = input;
      return sendResponse({ message: this.message.loginSuccess });
    });

  public static register = publicProcedure
    .input(authValidator.register)
    .mutation(async ({ input }) => {
      const { step, email, password, confirmPassword } = input;
      return sendResponse({ message: this.message.registerSuccess });
    });
}
