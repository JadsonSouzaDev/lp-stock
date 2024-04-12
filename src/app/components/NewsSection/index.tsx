import Image from "next/image";
import { FC } from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/types/product";

type NewsSectionProps = {
  products: Product[];
};

const NewsSection: FC<NewsSectionProps> = ({ products }) => {
  return (
    <section
      id="novidades"
      className="flex flex-col items-center px-4 py-14 lg:px-8 xl:px-10 gap-16"
    >
      <div className="border-b-4 py-2 border-amber-800 flex w-fit">
        <h1 className="text-center text-4xl text-amber-800">Novidades</h1>
      </div>
      <div className=" grid grid-cols-4 gap-8" style={{ rowGap: "40px" }}>
        {products.map((product) => {
          const price = product.sale_price
            .toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
            .replace(".", ",");

          return (
            <Card
              key={product.id}
              className="w-[250px] h-[350px] rounded-2xl py-0"
            >
              <CardContent className="pt-6 px-0">
                <div className="flex w-full h-[200px] relative">
                  <Image
                    className="rounded-xl"
                    src={product.url_image}
                    alt={product.name}
                    priority
                    fill
                    sizes="100%"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </CardContent>
              <CardFooter className="p-0">
                <div className="flex flex-col justify-between w-full h-[100px] p-4">
                  <span className="leading-tight">{product.name}</span>
                  <span className="text-amber-800 font-bold">R$ {price}</span>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default NewsSection;
