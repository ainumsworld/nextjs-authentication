"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Button } from "@nextui-org/button";

import { env } from "@/env";
import { LogosIcon } from "@/config/icons";

import { useRegisterWithGoogle } from "../../hooks/use-register-with-google";

const Content = () => {
  const { register, loading } = useRegisterWithGoogle();

  return (
    <Button
      variant="flat"
      startContent={<LogosIcon.Google />}
      onPress={() => register()}
      isLoading={loading}
    >
      Continue with Google
    </Button>
  );
};

export const RegisterWithGoogle = () => {
  return (
    <GoogleOAuthProvider clientId={env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Content />
    </GoogleOAuthProvider>
  );
};
