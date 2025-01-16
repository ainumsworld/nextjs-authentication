import { Code } from "../_components/code";
import { Document } from "../_components/document";
import { Paragraph } from "../_components/paragraph";

type Props = {
  email: string;
  otp: number;
};

export default function ForgotPassword({
  email = "test@gmail.com",
  otp = 564873,
}: Props) {
  return (
    <Document heading="Reset Your Password">
      <Paragraph>Dear User,</Paragraph>
      <Paragraph>
        You requested to reset your password for the account associated with the
        email address: {email}.<br /> To proceed, please use the following
        One-Time Password (OTP):
      </Paragraph>
      <Code>{otp}</Code>
      <Paragraph>
        <strong>Note:</strong> Do not share this otp with anyone. If you did not
        request a password reset, please secure your account and contact our
        support team immediately.
      </Paragraph>
      <Paragraph>
        Thank you for using our service to keep your account secure.
      </Paragraph>
    </Document>
  );
}
