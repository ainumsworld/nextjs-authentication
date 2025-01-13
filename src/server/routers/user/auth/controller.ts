import { OtpPurpose, RegisterStep, SessionKey } from "@/types/enums";
import { BCRYPT } from "@/helpers/bcrypt";
import { REGISTRATION_TOKEN, TOKEN } from "@/helpers/token";
import { BadRequest } from "@/helpers/trpc-error";
import { sendResponse, switchInvalidCase } from "@/utils";
import { otpMsg, userMsg } from "@/server/messages";
import { OtpService } from "@/server/models/otp";
import { UserQuery, UserService } from "@/server/models/user";
import { publicProcedure } from "@/server/trpc";
import { authValidator } from "@/server/validators/user";

export const login = publicProcedure
  .input(authValidator.login)
  .mutation(async ({ input }) => {
    const { email, password } = input;
    const user = await UserQuery.getRecordOrNull({ by: "email", email });
    if (!user) throw BadRequest(userMsg.noAccount);
    const userService = new UserService(user);
    userService.validateStatus();
    userService.validatePassword(password);
    await TOKEN.create(user.id, SessionKey.UserSession);
    return sendResponse({ message: userMsg.loginSuccess });
  });

export const register = publicProcedure
  .input(authValidator.register)
  .mutation(async ({ input }) => {
    const { step, email } = input;
    const purpose = OtpPurpose.Register;

    // check if email already exist
    const isEmailExist = await UserQuery.getRecordOrNull({
      by: "email",
      email,
    });
    if (isEmailExist) throw BadRequest(userMsg.emailExists);

    switch (step) {
      case RegisterStep.EnterEmail:
        const otp = await OtpService.sendOtp({ email, purpose });
        // todo: send email(otp)
        return sendResponse({ message: otpMsg.send });

      case RegisterStep.VerifyOTP:
        await OtpService.verifyOtp({ email, purpose, code: input.otp });
        await REGISTRATION_TOKEN.create(email);
        return sendResponse({ message: otpMsg.verified });

      case RegisterStep.EnterDetails:
        const { fullname, username, password } = input;
        await REGISTRATION_TOKEN.verify(email);
        const isUsernameExist = await UserQuery.getRecordOrNull({
          by: "username",
          username,
        });
        if (isUsernameExist) throw BadRequest(userMsg.usernameExists);
        const hashPassword = await BCRYPT.hash(password);
        const user = await UserQuery.create({
          fullname,
          username,
          email,
          password: hashPassword,
        });
        await TOKEN.create(user.id, SessionKey.UserSession);
        // todo: send email(register success)
        return sendResponse({ message: userMsg.registerSuccess });
      default:
        switchInvalidCase();
    }
  });
