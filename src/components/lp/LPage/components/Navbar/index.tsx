"use client";

import { Heart, Menu, Search, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, FC, useEffect, useState } from "react";

import { Logo, LogoText } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import AuthButton from "./components/AuthButton";

const Navbar: FC = ({}) => {
  const searchParams = useSearchParams();
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setShowMenu(window.innerWidth > 639);
    };

    handleResize(); // Set initial value based on window width
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    <nav className="px-2 md:px-6 w-full shadow-md justify-center flex fixed z-50 bg-gradient-to-r from-orange-300 to-orange-200 text-amber-800">
      <div className="grid grid-cols-6 md:grid-cols-3 max-w-screen-xl w-full items-center justify-between">
        <Link href="/" className="flex flex-1 py-3 items-center gap-1">
          <Logo className="w-10 h-10" />
          <LogoText className="hidden sm:flex h-10 w-24" />
        </Link>

        <div className="col-span-4 md:col-span-1 flex items-center justify-center">
          <div className="flex flex-1 max-w-[390px] items-center justify-center space-x-2 bg-white py-1 px-1 sm:px-4 md:pr-5 rounded-xl">
            <Input
              value={searchValue}
              autoFocus
              className="truncate w-60 sm:w-[250px] md:w-[300px] focus-visible:ring-transparent border-none bg-transparent"
              placeholder="Pesquise pelo título ou categoria..."
              onChange={(event) => {
                setSearchValue(event.target.value);
                debouncedSearch(event);
              }}
            />
            <Search className="hidden md:flex" size={22} />
          </div>
        </div>

        <div className="flex sm:hidden justify-end items-center pr-2">
          <Button
            size="icon"
            variant="ghost"
            className="hover:bg-transparent text-amber-800 hover:text-amber-800"
            onClick={() => setShowMenu((state) => !state)}
          >
            <Menu size={30} />
          </Button>
        </div>

        {showMenu && (
          <div className="col-span-6 sm:col-span-1 flex justify-center sm:justify-end items-center sm:pr-2 space-x-8 sm:space-x-3 md:space-x-5">
            <Button
              variant="ghost"
              size={"icon"}
              className="hover:text-amber-700 hover:bg-transparent"
            >
              <Heart size={22} />
            </Button>
            <Button
              size={"icon"}
              variant="ghost"
              className="hover:text-amber-700 hover:bg-transparent"
            >
              <ShoppingBasket size={22} />
            </Button>
            <AuthButton />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
