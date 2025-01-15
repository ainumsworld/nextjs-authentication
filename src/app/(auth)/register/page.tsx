import NextLink from "next/link";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";

import { APP_METADATA } from "@/config/metadata";
import { APP_ROUTES } from "@/config/routes";
import { Logo } from "@/components/logo";

import { CardWrapper } from "../_components/card-wrapper";
import { Form } from "./_components/form";
import { RegisterWithGoogle } from "./_components/google/register-with-google";

export const metadata = APP_METADATA.register;

export default function page() {
  return (
    <CardWrapper>
      <Logo className="mb-6 text-default-foreground" />

      <div className="flex flex-col gap-3 mb-10">
        <h5 className="text-xl font-bold">Sign up new account</h5>
        <p className="text-small text-default-500 dark:text-default-400">
          Already have an account?&nbsp;
          <Link
            size="sm"
            underline="hover"
            className="font-semibold"
            as={NextLink}
            href={APP_ROUTES.login}
          >
            Login
          </Link>
        </p>
      </div>

      <Form />

      <span className="mt-5 text-xs text-center text-default-500 dark:text-default-400">
        {"By signing up, I agree to "}
        <Link
          underline="always"
          as={NextLink}
          href={"#"}
          className="text-xs text-default-foreground font-semibold"
        >
          Terms of Service
        </Link>
        {" and "}
        <Link
          underline="always"
          as={NextLink}
          href={"#"}
          className="text-xs text-default-foreground font-semibold"
        >
          Privacy Policy
        </Link>
      </span>

      <Divider className="my-5" />

      <RegisterWithGoogle />
    </CardWrapper>
  );
}
