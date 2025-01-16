import { create } from "zustand";

import { switchInvalidCase } from "@/utils";
import { authValidator } from "@/server/validators/user";

type State = authValidator.ForgotPassword;

export const defaultValues: State = {
  step: 1,
  email: "",
};

export const useForgotPassword = create<State>()(() => defaultValues);

export const onSuccess = ({
  formValues,
  step,
}: {
  formValues: State;
  step: State["step"];
}) => {
  const getDefaultValues = (): State => {
    switch (step) {
      case 1:
        return defaultValues;
      case 2:
        return {
          ...formValues,
          step,
          otp: 0,
          newPassword: "",
          confirmPassword: "",
        };
      default:
        return switchInvalidCase();
    }
  };

  useForgotPassword.setState(getDefaultValues);
};
