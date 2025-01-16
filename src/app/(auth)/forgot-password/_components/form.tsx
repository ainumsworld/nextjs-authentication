"use client";

import { switchInvalidCase } from "@/utils";
import { useForgotPassword } from "@/stores/use-forgot-password";

import { EnterEmail } from "./enter-email";
import { EnterNewPassword } from "./enter-new-password";

export const Form = () => {
  const defaultValues = useForgotPassword();

  switch (defaultValues.step) {
    case 1:
      return <EnterEmail defaultValues={defaultValues} />;
    case 2:
      return <EnterNewPassword defaultValues={defaultValues} />;
    default:
      switchInvalidCase();
  }
};
