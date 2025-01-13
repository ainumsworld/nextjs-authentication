import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  DEFAULT_LOGIN_EMAIL,
  DEFAULT_LOGIN_PASSWORD,
  REDIRECT_AFTER_LOGIN,
} from "@/config";
import { userApi } from "@/trpc/react";
import { authValidator } from "@/server/validators/user";

const schema = authValidator.login;
export type FormValues = authValidator.Login;

const defaultValues: FormValues = {
  email: DEFAULT_LOGIN_EMAIL,
  password: DEFAULT_LOGIN_PASSWORD,
};

export const useLoginForm = () => {
  const router = useRouter();
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { reset, handleSubmit } = methods;

  const mutation = userApi.auth.login.useMutation({
    onSuccess() {
      reset();
      router.push(REDIRECT_AFTER_LOGIN);
      router.refresh();
    },
  });

  const onSubmit = handleSubmit((formData) => {
    mutation.mutate(formData);
  });

  return { methods, loading: mutation.isPending, onSubmit };
};
