import { OtpPurpose, RegisterStep, SessionKey } from "@/types/enums";
import { BCRYPT } from "@/helpers/bcrypt";
import { REGISTRATION_TOKEN, TOKEN } from "@/helpers/token";
import { BadRequest } from "@/helpers/trpc-error";
import { sendResponse, switchInvalidCase } from "@/utils";
import { otpMsg, userMsg } from "@/server/messages";
import { OtpService } from "@/server/models/otp";
import { UserQuery, UserService } from "@/server/models/user";
import { AuthService } from "@/server/services/auth";
import { EmailService } from "@/server/services/email";
import { publicProcedure } from "@/server/trpc";
import { authValidator } from "@/server/validators/user";
import {
  EmailVerification,
  ForgotPassword,
  RegistrationSuccess,
} from "@/components/emails/templates";

export const login = publicProcedure
  .input(authValidator.login)
  .mutation(async ({ input }) => {
    const { email, password } = input;
    const user = await UserQuery.getRecordOrNull({ by: "email", email });
    if (!user) throw BadRequest(userMsg.noAccount);
    const userService = new UserService(user);
    userService.validateStatus();
    userService.verifyPassword(password);
    await TOKEN.create(user.id, SessionKey.UserSession);
    return sendResponse({ message: userMsg.loginSuccess });
  });

export const loginWithGoogle = publicProcedure
  .input(authValidator.loginWithGoogle)
  .mutation(async ({ input }) => {
    const { code } = input;

    const authService = new AuthService(code);
    const { email } = await authService.getUserProfile();

    const user = await UserQuery.getRecordOrNull({ by: "email", email });
    if (!user) throw BadRequest(userMsg.noAccount);
    const userService = new UserService(user);
    userService.validateStatus();
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
        await EmailService.sendMail({
          email,
          subject: "Email Verification",
          reactEmail: EmailVerification({ email, otp }),
        });
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
        await EmailService.sendMail({
          email,
          subject: "Registration Success",
          reactEmail: RegistrationSuccess({ firstName: user.fullname }),
        });
        return sendResponse({ message: userMsg.registerSuccess });
      default:
        switchInvalidCase();
    }
  });

export const registerWithGoogle = publicProcedure
  .input(authValidator.registerWithGoogle)
  .mutation(async ({ input }) => {
    const { step } = input;

    if (step === 1) {
      const { code } = input;
      const authService = new AuthService(code);
      const userProfile = await authService.getUserProfile();
      const { email } = userProfile;

      // check if email already exist
      const isEmailExist = await UserQuery.getRecordOrNull({
        by: "email",
        email,
      });
      if (isEmailExist) throw BadRequest(userMsg.emailExists);
      await REGISTRATION_TOKEN.create(email);
      return userProfile;
    }

    // step 2
    const { email, fullname, username, avatar } = input;
    await REGISTRATION_TOKEN.verify(email);
    const isEmailExist = await UserQuery.getRecordOrNull({
      by: "email",
      email,
    });
    if (isEmailExist) throw BadRequest(userMsg.emailExists);
    const isUsernameExist = await UserQuery.getRecordOrNull({
      by: "username",
      username,
    });
    if (isUsernameExist) throw BadRequest(userMsg.usernameExists);
    const user = await UserQuery.create({
      fullname,
      username,
      email,
      avatar,
    });
    await TOKEN.create(user.id, SessionKey.UserSession);
    await EmailService.sendMail({
      email,
      subject: "Registration Success",
      reactEmail: RegistrationSuccess({ firstName: user.fullname }),
    });
    return sendResponse({ message: userMsg.registerSuccess });
  });

export const forgotPassword = publicProcedure
  .input(authValidator.forgotPassword)
  .mutation(async ({ input }) => {
    const { step, email } = input;
    const purpose = OtpPurpose.ForgotPassword;

    const user = await UserQuery.getRecordOrNull({ by: "email", email });
    if (!user) throw BadRequest(userMsg.noAccount);
    const userService = new UserService(user);
    userService.validateStatus();
    userService.validatePassword();

    switch (step) {
      case 1:
        const otp = await OtpService.sendOtp({ email, purpose });
        await EmailService.sendMail({
          email,
          subject: "Forgot Password",
          reactEmail: ForgotPassword({ email, otp }),
        });
        return sendResponse({ message: otpMsg.send });

      case 2:
        await OtpService.verifyOtp({ email, purpose, code: input.otp });
        const hashPassword = await BCRYPT.hash(input.confirmPassword);
        await UserQuery.update(user.id, { password: hashPassword });
        return sendResponse({ message: userMsg.passwordForgottenSuccess });
      default:
        switchInvalidCase();
    }
  });
