import { Button } from "@nextui-org/react";

import { RHFInputNumber, RHFProvider } from "@/components/rhf";

import { useVerifyOtp, type FormValues } from "../hooks/use-verify-otp";

type Props = {
  defaultValues: FormValues;
};

export const VerifyOtp = ({ defaultValues }: Props) => {
  const { methods, loading, onSubmit } = useVerifyOtp(defaultValues);

  return (
    <>
      <p className="mb-3 text-small text-default-500 dark:text-default-400">
        Otp has been send to{" "}
        <span className="text-primary underline">{defaultValues.email}</span>
      </p>
      <RHFProvider
        methods={methods}
        onSubmit={onSubmit}
      >
        <RHFInputNumber<FormValues>
          name="otp"
          label="Enter Otp"
          type="number"
        />

        <Button
          fullWidth
          color="primary"
          type="submit"
          isLoading={loading}
        >
          Verify
        </Button>
      </RHFProvider>
      <div className="mt-3 flex flex-col gap-2 items-center">
        <p className="text-small text-default-500 dark:text-default-400">
          Don't receive the code? Check your spam folder or
        </p>
        <Button
          size="sm"
          variant="light"
          color="primary"
          className="h-7 font-bold"
        >
          Resend Otp
        </Button>
      </div>
    </>
  );
};
