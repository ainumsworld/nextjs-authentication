import NextLink from "next/link";
import { Button, Input, Link } from "@nextui-org/react";

import { APP_ROUTES } from "@/config/routes";

export const LoginForm = () => {
  return (
    <div>
      <div className="flex flex-col gap-6">
        <Input
          label="Email"
          type="email"
          variant="bordered"
        />
        <Input
          label="Password"
          type="password"
          variant="bordered"
        />
      </div>
      <div className="flex justify-end">
        <Link
          size="sm"
          underline="hover"
          color="foreground"
          as={NextLink}
          href={APP_ROUTES.forgotPassword}
          className="my-4"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        fullWidth
        color="primary"
      >
        Login
      </Button>
    </div>
  );
};
