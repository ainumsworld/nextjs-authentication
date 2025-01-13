import NextLink from "next/link";
import { Button, Link } from "@nextui-org/react";

import { APP_ROUTES } from "@/config/routes";
import { useOpen } from "@/hooks/use-open";
import { RHFInput, RHFPassword, RHFProvider } from "@/components/rhf";

import { useLoginForm, type FormValues } from "../hooks/use-login-form";

export const LoginForm = () => {
  const { methods, loading, onSubmit } = useLoginForm();
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

      <Link
        size="sm"
        underline="hover"
        color="foreground"
        as={NextLink}
        href={APP_ROUTES.forgotPassword}
        className="self-end -my-2"
      >
        Forgot password?
      </Link>

      <Button
        fullWidth
        color="primary"
        type="submit"
        isLoading={loading}
      >
        Login
      </Button>
    </RHFProvider>
  );
};
