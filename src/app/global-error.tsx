"use client";

import "@/styles/globals.css";

import { Button } from "@nextui-org/react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <Button onPress={() => reset()}>Try again</Button>
        <Button onPress={() => window.location.reload()}>Reload</Button>
      </body>
    </html>
  );
}
