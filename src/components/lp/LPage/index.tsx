"use client";

import { Search, User } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FC, PropsWithChildren, useState } from "react";

import { Logo, LogoText } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LPage: FC<PropsWithChildren> = ({ children }) => {
  const { data, status } = useSession();
  const [openSearch, setOpenSearch] = useState(false);

  const user = data?.user;

  return (
    <main className="flex flex-col min-h-screen w-full">
      <nav className="px-6 w-full shadow-md justify-center flex fixed z-50 bg-white">
        <div className="grid grid-flow-col max-w-screen-xl w-full">
          <div className="flex py-3 items-center gap-1 text-amber-800 ">
            <Logo className="w-10 h-10" />
            <LogoText className="h-10 w-24" />
          </div>

          <div
            className={`flex items-center justify-center space-x-2 ${
              !openSearch ? "animate-pulse duration-1000" : ""
            }`}
          >
            {openSearch && (
              <Input
                autoFocus
                className="w-[300px]"
                placeholder="Pesquise pelo título ou por categoria..."
              />
            )}
            <Button
              variant="ghost"
              className="text-amber-800"
              onClick={() => setOpenSearch(true)}
            >
              <Search size={22} />
            </Button>
          </div>

          <div className="justify-end items-center flex pr-2">
            {status !== "loading" && (
              <Link
                href="/login"
                className="hover:text-amber-800 hover:font-bold"
              >
                <div className="flex items-end gap-2 text-sm">
                  <User size={24} />
                  <span className="uppercase mb-0 pb-0">
                    {user ? user?.name : "Entrar"}
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="min-h-screen max-w-screen-xl w-full flex flex-col mx-auto pt-16">
        {children}
      </div>
    </main>
  );
};

export default LPage;
