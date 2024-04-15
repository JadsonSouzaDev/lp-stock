"use client";

import { Heart, Search, ShoppingBasket, User } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FC } from "react";

import { Logo, LogoText } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar: FC = () => {
  const { data, status } = useSession();

  const user = data?.user;

  return (
    <nav className="px-6 w-full shadow-md justify-center flex fixed z-50 bg-gradient-to-r from-orange-300 to-orange-200 text-amber-800">
      <div className="grid grid-cols-3 max-w-screen-xl w-full items-center justify-between">
        <div className="flex flex-1 py-3 items-center gap-1">
          <Logo className="w-10 h-10" />
          <LogoText className="h-10 w-24" />
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="flex items-center justify-center space-x-2 bg-white py-1 px-4 pr-5 rounded-xl">
            <Input
              autoFocus
              className="w-[300px] focus-visible:ring-transparent border-none bg-transparent"
              placeholder="Pesquise pelo título ou por categoria..."
            />
            <Search size={22} />
          </div>
        </div>

        <div className="justify-end items-center flex pr-2 space-x-1">
          <Button
            variant="ghost"
            className="hover:text-amber-700 hover:bg-transparent"
          >
            <Heart size={20} />
          </Button>

          <Button
            variant="ghost"
            className="hover:text-amber-700 hover:bg-transparent"
          >
            <ShoppingBasket size={20} />
          </Button>
          {status !== "loading" && (
            <Link href="/login" className="hover:text-amber-700">
              <div className="flex items-end justify-center gap-2 text-sm ml-3">
                <User size={20} />
                <span className="uppercase mb-0 pb-0">
                  {user ? user?.name : "Entrar"}
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
