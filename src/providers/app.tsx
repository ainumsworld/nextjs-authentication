"use client";

import { ThemeProvider } from "next-themes";
import { Toaster as ToastProvider } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";

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
        <ToastProvider />
      </ThemeProvider>
    </NextUIProvider>
  );
};
