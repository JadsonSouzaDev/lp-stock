"use client";

import { MessageSquareX, Search } from "lucide-react";
import { FC } from "react";

import ProductCard from "@/app/components/ProductCard";
import { LPage } from "@/components/lp";
import { Product } from "@/types/product";

const ProducSearch: FC<{
  products: Product[];
  search: string;
}> = ({ products, search }) => {
  return (
    <LPage>
      <section
        id="busca"
        className="flex flex-col items-center justify-center px-4 py-6 md:py-12 lg:px-8 xl:px-10 gap-12 md:gap-16"
      >
        <div className="flex items-start justify-start w-full">
          {!!search && search !== " " ? (
            <h1 className="text-2xl text-start">
              {products.length > 0 ? products.length : "Nenhum"}{" "}
              {products.length > 1 ? "resultados" : "resultado"} para a busca:{" "}
              <span className="font-bold">{search}</span>
            </h1>
          ) : (
            <h1 className="text-3xl text-start">Todos os produtos</h1>
          )}
        </div>
        {products.length === 0 && (
          <div className="flex items-center justify-center w-full opacity-70">
            <Search size={150} className="text-orange-300" />
            <MessageSquareX
              size={64}
              className="absolute -mt-20 -mr-20 -scale-x-100 bg-white text-red-600"
            />
          </div>
        )}
        <div
          className="grid grid-cols-5 gap-10 pt-4"
          style={{ rowGap: "40px" }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </LPage>
  );
};

export default ProducSearch;
