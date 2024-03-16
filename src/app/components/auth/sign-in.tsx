"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Google } from "../icons/google";
import { LogOut } from "lucide-react";

export const SignInButton = () => (
  <Button
    size="icon"
    onClick={() => signIn("google")}
    variant="outline"
    className="h-auto w-auto p-1 rounded-full"
  >
    <Google width={36} height={36} />
  </Button>
);
