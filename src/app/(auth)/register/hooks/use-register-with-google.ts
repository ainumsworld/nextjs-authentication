import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

import { defaultValuesStep2, onSuccess } from "@/stores/use-google-register";
import { userApi } from "@/trpc/react";

export const useRegisterWithGoogle = () => {
  const mutation = userApi.auth.registerWithGoogle.useMutation({
    onSuccess(data) {
      if ("email" in data) {
        const { email, fullname = "", avatar } = data;

        onSuccess({
          ...defaultValuesStep2,
          email,
          fullname,
          ...(avatar && { avatar }),
        });
      }
    },
  });

  const register = useGoogleLogin({
    flow: "auth-code",
    onSuccess: ({ code }) =>
      mutation.mutate({
        step: 1,
        code,
      }),
    onError: (error) => toast.error("Registration failed!"),
  });

  return { register, loading: mutation.isPending };
};
