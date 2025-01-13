import { Button } from "@nextui-org/react";

import { RHFInput, RHFProvider } from "@/components/rhf";

import { useEnterDetails, type FormValues } from "../hooks/use-enter-details";

type Props = {
  defaultValues: FormValues;
};

export const EnterDetails = ({ defaultValues }: Props) => {
  const { methods, loading, onSubmit } = useEnterDetails(defaultValues);

  return (
    <RHFProvider
      methods={methods}
      onSubmit={onSubmit}
    >
      <RHFInput<FormValues>
        name="fullname"
        label="Fullname"
      />
      <RHFInput<FormValues>
        name="username"
        label="Username"
      />

      <Button
        fullWidth
        color="primary"
        type="submit"
        isLoading={loading}
      >
        Register
      </Button>
    </RHFProvider>
  );
};
