"use client";
import Link from "next/link";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, HomeIcon } from "lucide-react";
import { UserAvatar } from "./UserAvatar";

type Props = {
  user: Pick<User, "name" | "email" | "image">;
};
export function UserAccountNav({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full p-1">
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex-flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-zinc-700">{user.email}</p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuItem>
          <HomeIcon className="mr-2 h-4 w-4" />
          <Link href="/">Home</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            signOut().catch(console.error);
          }}
          className="cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />

          <p>Sair</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
