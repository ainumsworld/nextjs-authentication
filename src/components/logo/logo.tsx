import { type ComponentProps } from "react";
import NextLink from "next/link";
import { Link } from "@nextui-org/link";

import { APP_ROUTES } from "@/config/routes";

type Props = {
  disableLink?: boolean;
} & ComponentProps<"svg">;

export const Logo = ({ disableLink, ...props }: Props) => {
  //   const logo = (
  //     <img
  //       src="/logo/logo.svg"
  //       alt="logo"
  //       className={cn("w-10 h-10", props.className)}
  //       {...props}
  //     />
  //   );

  const logo = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="currentColor">
        <path d="M10.746 8.925v1.271h2.508v-1.27c0-.454-.163-.725-.36-.893c-.216-.182-.53-.29-.88-.283c-.717.014-1.268.451-1.268 1.175M8.75 11.957c0-.15.119-.26.252-.26h5.996c.133 0 .252.11.252.26v3.032c0 .15-.119.261-.252.261H9.002a.257.257 0 0 1-.252-.26z" />
        <path d="M10.68 2.105a2.63 2.63 0 0 1 2.64 0l.001.001l6.611 3.8A2.65 2.65 0 0 1 21.25 8.2v7.603a2.66 2.66 0 0 1-1.318 2.291l-.003.002l-6.608 3.799h-.002a2.63 2.63 0 0 1-2.639 0h-.001l-6.608-3.8h-.003A2.64 2.64 0 0 1 2.75 15.8V8.198a2.66 2.66 0 0 1 1.318-2.291l.003-.002zm4.074 6.82c0-.868-.338-1.568-.891-2.037c-.537-.454-1.224-.65-1.877-.637c-1.287.024-2.74.906-2.74 2.674v1.271h-.244c-.974 0-1.752.795-1.752 1.761v3.032c0 .967.778 1.761 1.752 1.761h5.996c.974 0 1.752-.794 1.752-1.76v-3.033c0-.966-.778-1.76-1.752-1.76h-.244z" />
      </g>
    </svg>
  );

  if (disableLink) return logo;

  return (
    <Link
      as={NextLink}
      href={APP_ROUTES.home}
      className="contents"
    >
      {logo}
    </Link>
  );
};
