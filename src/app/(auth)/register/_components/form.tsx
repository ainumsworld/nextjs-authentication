"use client";

import { RegisterStep } from "@/types/enums";
import { switchInvalidCase } from "@/utils";
import { useRegister } from "@/stores/use-register";

import { EnterDetails } from "./enter-details";
import { EnterEmail } from "./enter-email";
import { VerifyOtp } from "./verify-otp";

export const Form = () => {
  const defaultValues = useRegister();

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
