import { type Metadata } from "next";

export const ROOT_METADATA: Metadata = {
  title: {
    default: "Next.js Authentication | Secure Your Experience",
    template: "%s | Next.js Authentication",
  },
  description:
    "A robust authentication system built with Next.js. Securely log in, register, and manage your profile with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
