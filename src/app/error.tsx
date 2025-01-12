"use client";

import "@/styles/globals.css";

import { Button } from "@nextui-org/react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button onPress={() => reset()}>Try again</Button>
      <Button onPress={() => window.location.reload()}>Reload</Button>
    </div>
  );
}
