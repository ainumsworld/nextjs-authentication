import { Button } from "@nextui-org/button";

import { LogosIcon } from "@/config/icons";

export const RegisterWithGoogle = () => {
  return (
    <Button
      variant="flat"
      startContent={<LogosIcon.Google />}
    >
      Continue with Google
    </Button>
  );
};
