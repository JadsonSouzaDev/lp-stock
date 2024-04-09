import { Logo, LogoText } from "@/components/icons";

export default function Home() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <Logo className="w-52 h-52 animate-pulse -mb-10 duration-6000" />
      <LogoText className="h-52 w-64 animate-pulse duration-6000" />
    </div>
  );
}
