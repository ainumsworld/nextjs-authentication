import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { REDIRECT_AFTER_LOGIN } from "@/config";
import {
  defaultValues as defaultValuesStep1,
  onSuccess,
} from "@/stores/use-google-register";
import { userApi } from "@/trpc/react";
import { authValidator } from "@/server/validators/user";

const schema = authValidator.registerWithGoogle;

export type FormValues = Extract<authValidator.RegisterWithGoogle, { step: 2 }>;

export const useRegisterWithGoogleStep2 = (defaultValues: FormValues) => {
  const router = useRouter();

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = methods;

  const mutation = userApi.auth.registerWithGoogle.useMutation();

  const onSubmit = handleSubmit((formData) => {
    mutation.mutate(formData, {
      onSuccess() {
        onSuccess(defaultValuesStep1);
        router.push(REDIRECT_AFTER_LOGIN);
        router.refresh();
      },
    });
  });

  return { methods, loading: mutation.isPending, onSubmit };
};
