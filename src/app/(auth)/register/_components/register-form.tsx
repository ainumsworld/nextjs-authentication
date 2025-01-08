import { Button } from "@nextui-org/react";

import { useOpen } from "@/hooks/use-open";
import { RHFInput, RHFPassword, RHFProvider } from "@/components/rhf";

import { useRegisterForm, type FormValues } from "../hooks/use-register-form";

export const RegisterForm = () => {
  const { methods, onSubmit } = useRegisterForm();
  const { open: showPassword, handleToggle } = useOpen();

  return (
    <RHFProvider
      methods={methods}
      onSubmit={onSubmit}
    >
      <RHFInput<FormValues>
        name="email"
        label="Email"
        type="email"
      />
      <RHFPassword<FormValues>
        name="password"
        label="Password"
        showPassword={showPassword}
        handleTogglePassword={handleToggle}
      />
      <RHFPassword<FormValues>
        name="confirmPassword"
        label="Confirm Password"
        showPassword={showPassword}
        handleTogglePassword={handleToggle}
      />

      <Button
        fullWidth
        color="primary"
        type="submit"
      >
        Register
      </Button>
    </RHFProvider>
  );
};
