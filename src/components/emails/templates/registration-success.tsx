import { Code } from "../_components/code";
import { Document } from "../_components/document";
import { Paragraph } from "../_components/paragraph";

type Props = {
  firstName: string;
};

export default function RegistrationSuccess({ firstName = "User" }: Props) {
  return (
    <Document heading="Registration Successful">
      <Paragraph>Hi {firstName},</Paragraph>
      <Paragraph>
        Congratulations! Your registration was successful. You are now part of
        our growing community.
      </Paragraph>
      <Code className="text-lg">Empowering you to achieve more.</Code>
      <Paragraph>
        You can now log in to your account and start exploring all the amazing
        features we offer. If you have any questions, feel free to reach out to
        our support team.
      </Paragraph>
    </Document>
  );
}
