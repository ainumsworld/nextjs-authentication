import { Code } from "../_components/code";
import { Document } from "../_components/document";
import { Paragraph } from "../_components/paragraph";

export default function EmailServiceTest() {
  return (
    <Document heading="Email Service Test">
      <Paragraph>Hi there,</Paragraph>
      <Paragraph>
        This is a test email to verify that the email service is working
        correctly. If you received this email, everything is set up and
        functioning as expected.
      </Paragraph>
      <Code className="text-lg">Your email service is up and running!</Code>
      <Paragraph>
        If you encounter any issues or did not expect this email, please contact
        our support team.
      </Paragraph>
    </Document>
  );
}
