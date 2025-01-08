import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z, { object, string } from "zod";

const schema = object({
  email: string().min(1, "Email is required").email("Email is invalid"),
  password: string().min(1, "Password is required"),
  confirmPassword: string().min(1, "Confirm Password is required"),
});

export type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const useRegisterForm = () => {
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return { methods, onSubmit };
};
