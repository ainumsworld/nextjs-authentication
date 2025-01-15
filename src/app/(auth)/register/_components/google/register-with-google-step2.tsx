import { Avatar, Button } from "@nextui-org/react";

import { RHFInput, RHFProvider } from "@/components/rhf";

import {
  useRegisterWithGoogleStep2,
  type FormValues,
} from "../../hooks/use-register-with-google-step2";

type Props = {
  defaultValues: FormValues;
};

export const RegisterWithGoogleStep2 = ({ defaultValues }: Props) => {
  const { methods, loading, onSubmit } =
    useRegisterWithGoogleStep2(defaultValues);

  const { email, avatar } = defaultValues;

  return (
    <>
      <div className="mb-6 flex items-center gap-2">
        <Avatar
          size="sm"
          showFallback
          src={avatar}
        />
        <p className="text-small text-default-500 dark:text-default-400">
          {email}
        </p>
      </div>
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
    </>
  );
};
