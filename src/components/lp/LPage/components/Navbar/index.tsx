"use client";

import { Heart, Search, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, FC, useState } from "react";

import { Logo, LogoText } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import AuthButton from "./components/AuthButton";

const Navbar: FC = ({}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? ""
  );

  const onSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    const search = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", search);
    router.push(search ? `/?${params.toString()}` : "/");
  };

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const debouncedSearch = debounce(onSearch, 600);

  return (
    <nav className="px-6 w-full shadow-md justify-center flex fixed z-50 bg-gradient-to-r from-orange-300 to-orange-200 text-amber-800">
      <div className="grid grid-cols-3 max-w-screen-xl w-full items-center justify-between">
        <Link href="/" className="flex flex-1 py-3 items-center gap-1">
          <Logo className="w-10 h-10" />
          <LogoText className="h-10 w-24" />
        </Link>

        <div className="flex flex-1 items-center justify-center">
          <div className="flex items-center justify-center space-x-2 bg-white py-1 px-4 pr-5 rounded-xl">
            <Input
              value={searchValue}
              autoFocus
              className="w-[300px] focus-visible:ring-transparent border-none bg-transparent"
              placeholder="Pesquise pelo título ou por categoria..."
              onChange={(event) => {
                setSearchValue(event.target.value);
                debouncedSearch(event);
              }}
            />
            <Search size={22} />
          </div>
        </div>

        <div className="justify-end items-center flex pr-2 space-x-5">
          <Button
            variant="ghost"
            size={"icon"}
            className="hover:text-amber-700 hover:bg-transparent"
          >
            <Heart size={20} />
          </Button>
          <Button
            size={"icon"}
            variant="ghost"
            className="hover:text-amber-700 hover:bg-transparent"
          >
            <ShoppingBasket size={20} />
          </Button>
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
