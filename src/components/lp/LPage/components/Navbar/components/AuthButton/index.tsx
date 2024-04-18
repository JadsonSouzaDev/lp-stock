"use client";

import { CircleUser, User } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { FC } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AuthButton: FC = ({}) => {
  const { data, status } = useSession();

  const user = data?.user;

  if (status === "loading") {
    return <></>;
  } else if (status === "authenticated") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="hover:text-amber-700 hover:bg-transparent"
          >
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            Olá, {user?.name?.split(" ")[0]}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/perfil">
            <DropdownMenuItem className="cursor-pointer">
              Meu perfil
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => signOut()}
          >
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link href="/login" className="hover:text-amber-700">
      <div className="flex items-end justify-center gap-2 text-sm ml-3">
        <User size={20} />
        <span className="uppercase mb-0 pb-0">Entrar</span>
      </div>
    </Link>
  );
};

export default AuthButton;
