"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";

import { TRPCReactProvider } from "@/trpc/react";

type Props = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return (
    <NextUIProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
};
