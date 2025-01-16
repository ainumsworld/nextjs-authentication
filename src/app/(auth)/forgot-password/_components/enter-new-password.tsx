import { Button } from "@nextui-org/react";

import { useOpen } from "@/hooks/use-open";
import { RHFInputNumber, RHFPassword, RHFProvider } from "@/components/rhf";

import {
  useEnterNewPassword,
  type FormValues,
} from "../hooks/use-enter-new-password";

type Props = {
  defaultValues: FormValues;
};

export const EnterNewPassword = ({ defaultValues }: Props) => {
  const { methods, loading, onSubmit } = useEnterNewPassword(defaultValues);
  const { open: showPassword, handleToggle } = useOpen();

  return (
    <RHFProvider
      methods={methods}
      onSubmit={onSubmit}
    >
      <RHFInputNumber<FormValues>
        name="otp"
        label="OTP"
      />
      <RHFPassword<FormValues>
        name="newPassword"
        label="New password"
        showPassword={showPassword}
        handleTogglePassword={handleToggle}
      />
      <RHFPassword<FormValues>
        name="confirmPassword"
        label="Confirm password"
        showPassword={showPassword}
        handleTogglePassword={handleToggle}
      />

      <Button
        fullWidth
        color="primary"
        type="submit"
        isLoading={loading}
      >
        Reset
      </Button>
    </RHFProvider>
  );
};
