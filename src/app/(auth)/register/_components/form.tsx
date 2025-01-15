"use client";

import { RegisterStep } from "@/types/enums";
import { switchInvalidCase } from "@/utils";
import { useGoogleRegister } from "@/stores/use-google-register";
import { useRegister } from "@/stores/use-register";

import { EnterDetails } from "./enter-details";
import { EnterEmail } from "./enter-email";
import { RegisterWithGoogleStep2 } from "./google/register-with-google-step2";
import { VerifyOtp } from "./verify-otp";

export const Form = () => {
  const defaultValues = useRegister();
  const googleDefaultValues = useGoogleRegister();

  if (googleDefaultValues.step === 2)
    return <RegisterWithGoogleStep2 defaultValues={googleDefaultValues} />;

  switch (defaultValues.step) {
    case RegisterStep.EnterEmail:
      return <EnterEmail defaultValues={defaultValues} />;
    case RegisterStep.VerifyOTP:
      return <VerifyOtp defaultValues={defaultValues} />;
    case RegisterStep.EnterDetails:
      return <EnterDetails defaultValues={defaultValues} />;
    default:
      switchInvalidCase();
  }
};
