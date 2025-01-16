import {
  Body,
  Container,
  Font,
  Head,
  Html,
  Img,
  Link,
  Tailwind,
} from "@react-email/components";

import { APP_URL } from "@/config";
import { appConfig } from "@/config/app";

import { Heading } from "./Heading";
import { Paragraph } from "./paragraph";

type Props = {
  heading: string;
  children: React.ReactNode;
};

export const Document = ({ heading, children }: Props) => {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Tailwind>
        <Body className="p-4 bg-gray-50">
          <Container className="p-6 my-10 mx-auto max-w-xl bg-white rounded-lg">
            <Link href={APP_URL}>
              <Img
                src="https://i.postimg.cc/Z5xhJy06/nextjs-authentication-logo.jpg"
                alt={appConfig.name}
                width={40}
                height={40}
              />
            </Link>
            <Heading>{heading}</Heading>
            {children}
            <Paragraph className="text-sm">
              Best regards,
              <br />
              The {appConfig.name} Team
            </Paragraph>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
