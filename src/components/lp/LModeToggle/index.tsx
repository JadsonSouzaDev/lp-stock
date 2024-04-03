"use client";

import { Moon, Sun } from "lucide-react";
import * as React from "react";
import { FC, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

type ThemeOption = "light" | "dark";

const LModeToggle: FC = () => {
  const initialTheme =
    typeof window !== "undefined"
      ? (localStorage.getItem("theme") as ThemeOption) ?? "dark"
      : "dark";
  const [theme, setTheme] = useState<ThemeOption>(initialTheme);

  const onChangeTheme = (theme: ThemeOption) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => onChangeTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" && <Sun className="absolute h-[1.2rem] w-[1.2rem]" />}
      {theme === "light" && <Moon className="absolute h-[1.2rem] w-[1.2rem]" />}
    </Button>
  );
};

export default LModeToggle;
