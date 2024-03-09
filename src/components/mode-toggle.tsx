"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Tabs defaultValue="dark" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger
          className="w-full"
          value="light"
          onClick={() => setTheme("light")}
        >
          <SunIcon width={20} height={20} />
        </TabsTrigger>
        <TabsTrigger
          className="w-full"
          value="dark"
          onClick={() => setTheme("dark")}
        >
          <MoonIcon width={20} height={20} />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
