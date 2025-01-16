import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { onSuccess } from "@/stores/use-forgot-password";
import { userApi } from "@/trpc/react";
import { authValidator } from "@/server/validators/user";

export type FormValues = Extract<authValidator.ForgotPassword, { step: 1 }>;

export const useEnterEmail = (defaultValues: FormValues) => {
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(authValidator.forgotPassword),
  });
  const { handleSubmit } = methods;

  const mutation = userApi.auth.forgotPassword.useMutation();

  const onSubmit = handleSubmit((formData) => {
    mutation.mutate(formData, {
      onSuccess() {
        onSuccess({ formValues: formData, step: 2 });
      },
    });
  });

  return { methods, loading: mutation.isPending, onSubmit };
};
