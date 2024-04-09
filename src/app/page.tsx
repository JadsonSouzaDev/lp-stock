import { Logo, LogoText } from "@/components/icons";

export default function Home() {
  return (
    <div className="flex flex-col h-screen items-center justify-center animate-pulse duration-6000">
      <h1 className="text-5xl font-bold mb-10">Em breve...</h1>
      <Logo className="w-52 h-52 -mb-10" />
      <LogoText className="h-52 w-64 " />
    </div>
  );
}
