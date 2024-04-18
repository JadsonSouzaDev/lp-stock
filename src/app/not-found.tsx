import { LPage } from "@/components/lp";
import Link from "next/link";

export default async function NotFound() {
  return (
    <LPage>
      <div className="flex flex-col items-center justify-center min-h-96">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-lg mt-4">Página não encontrada</p>
        <Link href="/" className="text-xl mt-8 hover:text-amber-800">
          Voltar para a página inicial
        </Link>
      </div>
    </LPage>
  );
}
