import { Button } from "@nextui-org/react";

import { useOpen } from "@/hooks/use-open";
import { RHFInput, RHFPassword, RHFProvider } from "@/components/rhf";

import { useEnterEmail, type FormValues } from "../hooks/use-enter-email";

type Props = {
  defaultValues: FormValues;
};

export const EnterEmail = ({ defaultValues }: Props) => {
  const { methods, loading, onSubmit } = useEnterEmail(defaultValues);
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
        isLoading={loading}
      >
        Submit
      </Button>
    </RHFProvider>
  );
};
