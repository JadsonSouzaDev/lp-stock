import Link from "next/link";

import { LSignup } from "@/components/lp";

export default function Signup() {
  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-gradient-to-r from-orange-300 to-orange-200 py-4 md:py-0">
      <div className="bg-white p-6 flex flex-col items-center justify-center rounded-2xl shadow-2xl">
        <LSignup />
        <div className="flex flex-col pb-8 w-full gap-6 px-10">
          <div className="flex items-center justify-center gap-6">
            <div className="h-[1px] w-full bg-gray-300"></div>
            <span>ou</span>
            <div className="h-[1px] w-full bg-gray-300"></div>
          </div>

          <div className="flex gap-1 items-center justify-center">
            <p className="text-sm text-gray-500">Já tem uma conta?</p>
            <Link href="/login" className="text-sm text-orange-800">
              Entre agora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
