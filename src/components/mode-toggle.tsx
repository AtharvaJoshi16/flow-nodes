"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { PcCase } from "lucide-react";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <Tabs defaultValue="system" className="w-full">
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
