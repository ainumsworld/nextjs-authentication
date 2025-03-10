"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Button } from "@nextui-org/button";

import { env } from "@/env";
import { LogosIcon } from "@/config/icons";

import { useLoginWithGoogle } from "../hooks/use-login-with-google";

const Content = () => {
  const { login, loading } = useLoginWithGoogle();

  return (
    <Button
      variant="flat"
      startContent={<LogosIcon.Google />}
      onPress={() => login()}
      isLoading={loading}
    >
      Continue with Google
    </Button>
  );
};

export const LoginWithGoogle = () => {
  return (
    <GoogleOAuthProvider clientId={env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Content />
    </GoogleOAuthProvider>
  );
};
