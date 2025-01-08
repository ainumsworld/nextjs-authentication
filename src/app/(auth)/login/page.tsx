import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Divider } from "@nextui-org/react";

import { APP_METADATA } from "@/config/metadata";
import { APP_ROUTES } from "@/config/routes";
import { Logo } from "@/components/logo";

import { CardWrapper } from "../_components/card-wrapper";
import { Form } from "./_components/form";
import { LoginWithGoogle } from "./_components/login-with-google";

export const metadata = APP_METADATA.login;

export default function page() {
  return (
    <CardWrapper>
      <Logo className="mb-6 text-default-foreground" />

      <div className="flex flex-col gap-3 mb-10">
        <h5 className="text-xl font-bold">Sign in to your account</h5>
        <p className="text-small text-default-500 dark:text-default-400">
          Don't have an account?&nbsp;
          <Link
            size="sm"
            underline="hover"
            className="font-semibold"
            as={NextLink}
            href={APP_ROUTES.register}
          >
            Get started
          </Link>
        </p>
      </div>

      <Form />

      <Divider className="my-5" />

      <LoginWithGoogle />
    </CardWrapper>
  );
}
