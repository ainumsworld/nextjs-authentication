import { GeistSans } from "geist/font/sans";

import { ROOT_METADATA } from "@/config/metadata";

import "@/styles/globals.css";

import { AppProvider } from "@/providers/app";

export const metadata = ROOT_METADATA;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable}`}
    >
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
