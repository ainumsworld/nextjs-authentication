"use client";

import { useTheme } from "next-themes";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

export const ModeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Mode</Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Theme switcher"
        onAction={(key) => setTheme(key as string)}
      >
        <DropdownItem key="light">Light</DropdownItem>
        <DropdownItem key="dark">Dark</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
