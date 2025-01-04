import { AuthLayout } from "@/layout/auth";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return <AuthLayout>{children}</AuthLayout>;
}
