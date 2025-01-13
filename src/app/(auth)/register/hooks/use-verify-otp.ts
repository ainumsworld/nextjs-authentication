import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { RegisterStep } from "@/types/enums";
import { onSuccess } from "@/stores/use-register";
import { userApi } from "@/trpc/react";
import { authValidator } from "@/server/validators/user";

const schema = authValidator.register;

export type FormValues = Extract<
  authValidator.Register,
  { step: RegisterStep.VerifyOTP }
>;

export const useVerifyOtp = (defaultValues: FormValues) => {
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = methods;

  const mutation = userApi.auth.register.useMutation();

  const onSubmit = handleSubmit((formData) => {
    mutation.mutate(formData, {
      onSuccess() {
        onSuccess({ formValues: formData, step: RegisterStep.EnterDetails });
      },
    });
  });

  return { methods, loading: mutation.isPending, onSubmit };
};
