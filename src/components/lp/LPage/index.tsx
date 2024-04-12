"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { FC, PropsWithChildren, useState } from "react";

import { Logo, LogoText } from "@/components/icons";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Início", href: "" },
  { label: "Novidades", href: "#novidades" },
  { label: "Promoções", href: "#promocoes" },
  { label: "Categorias", href: "#categorias" },
  { label: "Ajuda", href: "/ajuda" },
];

const LPage: FC<PropsWithChildren> = ({ children }) => {
  const { data, status } = useSession();
  const [activeTab, setActiveTab] = useState("");

  const user = data?.user;

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const activeTab = navItems.find((item) => {
      const element = document.getElementById(item.href.replace("#", ""));
      if (element) {
        const { top, height } = element.getBoundingClientRect();
        return (
          scrollPosition >= top - windowHeight / 2 &&
          scrollPosition <= top + height - windowHeight / 2
        );
      }
      return false;
    });

    if (scrollPosition < 30) setActiveTab("");
    else setActiveTab(activeTab?.href || "");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    href: string
  ) => {
    e.preventDefault();
    if (!href) window.scrollTo({ top: 0, behavior: "smooth" });

    const element = document.getElementById(href.replace("#", ""));
    element?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  return (
    <main className="flex flex-col min-h-screen w-full">
      <nav className="px-6 w-full shadow-md justify-center flex fixed z-50 bg-white">
        <div className="grid grid-flow-col max-w-screen-xl w-full">
          <div className="flex py-3 items-center gap-1 text-amber-800 ">
            <Logo className="w-10 h-10" />
            <LogoText className="h-10 w-24" />
          </div>

          <div className="flex items-center justify-center ">
            <ul className="flex gap-2 text-sm">
              {navItems.map((item) => {
                const isActive = activeTab === item.href;
                return (
                  <li
                    key={item.label}
                    onClick={(e) => handleClick(e, item.href)}
                    className={cn(
                      "p-4 hover:text-amber-800 uppercase hover:font-bold h-11 cursor-pointer",
                      {
                        "text-amber-800 font-bold border-b-2 border-amber-800":
                          isActive,
                      }
                    )}
                  >
                    {item.label}
                  </li>
                );
              })}
            </ul>
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
