export const enum RegisterStep {
  EnterEmail = "ENTER_EMAIL",
  VerifyOTP = "VERIFY_OTP",
  EnterDetails = "ENTER_DETAILS",
}

export const enum SessionKey {
  UserSession = "x-session",
  AdminSession = "x-admin-session",
  SellerSession = "x-seller-session",
}

// FOR DATABASE
export enum UserRole {
  User = "USER",
  Admin = "ADMIN",
}

export enum UserStatus {
  Active = "ACTIVE",
  Blocked = "BLOCKED",
}

export enum OtpPurpose {
  Login = "LOGIN",
  Register = "REGISTER",
  ForgotPassword = "FORGOT_PASSWORD",
}
