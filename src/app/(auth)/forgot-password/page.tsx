import NextLink from "next/link";
import { Link } from "@nextui-org/link";

import { EvaIcon } from "@/config/icons";
import { APP_METADATA } from "@/config/metadata";
import { APP_ROUTES } from "@/config/routes";
import { Logo } from "@/components/logo";

import { CardWrapper } from "../_components/card-wrapper";
import { Form } from "./_components/form";

export const metadata = APP_METADATA.forgotPassword;

export default function page() {
  return (
    <CardWrapper>
      <Logo className="mb-6 text-default-foreground" />

      <div className="flex flex-col gap-3 mb-10">
        <h5 className="text-xl font-bold">Forgot your password?</h5>
        <p className="text-small text-default-500 dark:text-default-400">
          Please enter the email address associated with your account and we'll
          send you a otp to reset your password.
        </p>
      </div>

      <Form />

      <Link
        underline="hover"
        as={NextLink}
        href={APP_ROUTES.login}
        className="mt-6 text-sm text-default-foreground font-semibold self-center"
      >
        <EvaIcon.ArrowIosBack />
        Return to login
      </Link>
    </CardWrapper>
  );
}
