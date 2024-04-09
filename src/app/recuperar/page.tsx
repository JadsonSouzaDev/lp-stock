import Link from "next/link";

export default function Recovery() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-orange-300 to-orange-200">
      <div className="bg-white p-6 flex flex-col items-center justify-center rounded-2xl shadow-2xl">
        {/* <LLogin /> */}
        <div className="flex flex-col pb-8 w-full gap-6 px-10">
          <div className="flex items-center justify-center gap-6">
            <div className="h-[1px] w-full bg-gray-300"></div>
            <span>ou</span>
            <div className="h-[1px] w-full bg-gray-300"></div>
          </div>

          <div className="flex gap-1 items-center justify-center">
            <p className="text-sm text-gray-500">Não tem uma conta?</p>
            <Link href="/cadastrar" className="text-sm text-orange-800">
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
