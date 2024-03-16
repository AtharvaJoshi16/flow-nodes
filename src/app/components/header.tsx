import { useSession } from "next-auth/react";
import { SignInButton } from "./auth/sign-in";
import { SignOutButton } from "./auth/sign-out";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between items-center m-3">
      <div className="flex items-center gap-[20px]">
        <Image src="/icon.png" width={50} height={50} alt="flow-nodes-logo" />
        <h2 className="font-bold text-3xl">Flow Nodes</h2>
      </div>
      <div className="flex items-center gap-[20px]">
        {session && session.user ? (
          <div className="p-2">
            <SignOutButton />
          </div>
        ) : (
          <div className="p-2">
            <SignInButton />
          </div>
        )}
        <Avatar>
          <AvatarImage
            src={session?.user?.image ?? "/user-fallback.png"}
            alt={session?.user?.name ?? ""}
          />
          <AvatarFallback>
            {`${session?.user?.name?.split(" ")[0][0]}${
              session?.user?.name?.split(" ")[1][0]
            }`}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
