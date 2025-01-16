import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { APP_ROUTES } from "@/config/routes";
import { onSuccess } from "@/stores/use-forgot-password";
import { userApi } from "@/trpc/react";
import { authValidator } from "@/server/validators/user";

export type FormValues = Extract<authValidator.ForgotPassword, { step: 2 }>;

export const useEnterNewPassword = (defaultValues: FormValues) => {
  const router = useRouter();

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(authValidator.forgotPassword),
  });
  const { handleSubmit } = methods;

  const mutation = userApi.auth.forgotPassword.useMutation();

  const onSubmit = handleSubmit((formData) => {
    mutation.mutate(formData, {
      onSuccess() {
        onSuccess({ formValues: formData, step: 1 });
        router.push(APP_ROUTES.login);
        router.refresh();
      },
    });
  });

  return { methods, loading: mutation.isPending, onSubmit };
};
