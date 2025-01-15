import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

import { REDIRECT_AFTER_LOGIN } from "@/config";
import { userApi } from "@/trpc/react";

export const useLoginWithGoogle = () => {
  const router = useRouter();

  const mutation = userApi.auth.loginWithGoogle.useMutation({
    onSuccess() {
      router.push(REDIRECT_AFTER_LOGIN);
      router.refresh();
    },
  });

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: ({ code }) => mutation.mutate({ code }),
    onError: (error) => toast.error("Login failed!"),
  });

  return { login, loading: mutation.isPending };
};
