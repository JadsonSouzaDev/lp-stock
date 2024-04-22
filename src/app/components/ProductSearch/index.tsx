"use client";

import { MessageSquareX, Search } from "lucide-react";
import { FC } from "react";

import ProductCard from "@/app/components/ProductCard";
import { LPage } from "@/components/lp";
import { Product } from "@/types/product";

type ProducSearchProps = {
  products: Product[];
  search: string;
};

const ProducSearchTitle: FC<ProducSearchProps> = ({ products, search }) => {
  return (
    <div className="flex w-full">
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
  );
};

const ProducSearchEmpty: FC = () => {
  return (
    <div className="flex items-center justify-center w-full opacity-70">
      <Search size={150} className="text-orange-300" />
      <MessageSquareX
        size={64}
        className="absolute -mt-20 -mr-20 -scale-x-100 bg-white text-red-600"
      />
    </div>
  );
};

const ProducSearch: FC<ProducSearchProps> = ({ products, search }) => {
  return (
    <LPage breadcrumbItems={[{ label: search, href: `/?search=${search}` }]}>
      <section
        id="busca"
        className="flex flex-col items-start justify-center gap-8 px-2 md-px-4 lg-px-8"
      >
        <ProducSearchTitle products={products} search={search} />
        {products.length === 0 && <ProducSearchEmpty />}

        <div
          className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 base:grid-cols-4 base-lg:grid-cols-5 gap-8 w-full"
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
