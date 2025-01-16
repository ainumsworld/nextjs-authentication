import { Button } from "@nextui-org/react";

import { RHFInput, RHFProvider } from "@/components/rhf";

import { useEnterEmail, type FormValues } from "../hooks/use-enter-email";

type Props = {
  defaultValues: FormValues;
};

export const EnterEmail = ({ defaultValues }: Props) => {
  const { methods, loading, onSubmit } = useEnterEmail(defaultValues);

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

      <Button
        fullWidth
        color="primary"
        type="submit"
        isLoading={loading}
      >
        Send request
      </Button>
    </RHFProvider>
  );
};
