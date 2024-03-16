import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export const SignOutButton = () => {
  return (
    <Button size="icon" onClick={() => signOut()} variant="secondary">
      <LogOut size={20} />
    </Button>
  );
};
