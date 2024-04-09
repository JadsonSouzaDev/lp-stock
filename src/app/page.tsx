import Link from "next/link";

import { Logo, LogoText } from "@/components/icons";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-orange-300 to-orange-200">
      <div className="bg-white py-10 px-8 md:px-12 flex flex-col items-center justify-center rounded-2xl shadow-2xl">
        <Logo className="w-32 h-32 -mb-10 text-amber-800" />
        <LogoText className="h-40 w-36 text-amber-800" />

        <div className="flex flex-col text-center items-center pb-8 w-full gap-6">
          <div className="flex flex-col gap-1 items-center justify-center">
            <p className="text-sm text-gray-500">
              Em breve estaremos funcionando!
            </p>
            <p className="text-sm text-gray-500">
              {" "}
              Que tal você fazer o seu{" "}
              <Link href="/cadastrar" className="font-bold text-amber-800">
                pré-cadastro?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
