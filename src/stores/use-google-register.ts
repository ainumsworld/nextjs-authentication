import { create } from "zustand";

import { authValidator } from "@/server/validators/user";

type State = authValidator.RegisterWithGoogle;

export const defaultValues: State = {
  step: 1,
  code: "",
};

export const defaultValuesStep2: Extract<State, { step: 2 }> = {
  step: 2,
  email: "",
  fullname: "",
  username: "",
};
export const useGoogleRegister = create<State>()(() => defaultValues);

export const onSuccess = (formValues: State) => {
  const { step } = formValues;
  const getDefaultValues = () => {
    switch (step) {
      case 1:
        return defaultValues;
      case 2:
        return formValues;
    }
  };

  useGoogleRegister.setState(getDefaultValues);
};
