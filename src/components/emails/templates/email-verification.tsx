import { Code } from "../_components/code";
import { Document } from "../_components/document";
import { Paragraph } from "../_components/paragraph";

type Props = {
  email: string;
  otp: number;
};

export default function EmailVerification({
  email = "test@gmail.com",
  otp = 564873,
}: Props) {
  return (
    <Document heading="Email Verification">
      <Paragraph>Dear User,</Paragraph>
      <Paragraph>
        Please use the following One-Time Password (OTP) to verify your email
        address: {email}
      </Paragraph>
      <Code>{otp}</Code>
      <Paragraph>
        <strong>Note:</strong> Do not share this otp with anyone. If you did not
        request this verification, please ignore this email.
      </Paragraph>
      <Paragraph>Thank you for choosing our service.</Paragraph>
    </Document>
  );
}
