"use client";

import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

import { LPage } from "@/components/lp";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { formatedCurrency } from "@/lib/currency";
import { Product } from "@/types/product";

type ProductDetailProps = {
  product: Product | null;
};

const ProductDetail: FC<ProductDetailProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  if (product === null) {
    router.push("/");
    return <></>;
  }

  return (
    <LPage>
      <div className="flex flex-col py-16 px-10 gap-8">
        <div className="flex flex-col">
          <h1 className="text-3xl text-amber-800 font-bold">{product.name}</h1>
          <span>{product.author}</span>
          <span className="text-muted-foreground">{product.category}</span>
        </div>
        <div className="flex space-x-16">
          <div className="flex flex-col gap-12">
            <div className="flex rounded-3xl p-4 mr-auto shadow-lg border border-amber-800 border-opacity-20">
              <Image
                className="rounded-2xl"
                alt={product.name}
                src={product.url_image}
                width={300}
                height={300}
              />
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="italic">Descrição</h2>

              <p className="text-muted-foreground">{product.description}</p>
            </div>
          </div>

          <div className="flex flex-col gap-16 min-w-[320px] lg:min-w-[450px]">
            <div className="flex justify-between">
              <div className="flex">
                <h2 className="text-3xl font-bold text-amber-800">
                  {formatedCurrency(product.sale_price)}
                </h2>
                {product.is_promotion && (
                  <span className="text-sm line-through text-muted-foreground">
                    {formatedCurrency(product.sale_price * 1.2)}
                  </span>
                )}
              </div>
              {product.quantity <= 3 && (
                <div className="flex animate-pulse gap-2 items-center justify-center">
                  <div className="w-3 h-3 bg-amber-800 rounded-full"></div>
                  <span className="text-sm text-amber-800">
                    {`${product.quantity > 1 ? "restam" : "resta"} apenas ${
                      product.quantity
                    } ${product.quantity > 1 ? "unidades" : "unidade"} `}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Tipo</Label>
              <div className="flex">
                <Button className="rounded-full bg-orange-300 hover:bg-orange-200 text-amber-800 hover:text-amber-800">
                  {product.type}
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Quantidade</Label>
              <div className="flex gap-1">
                <Button
                  disabled={quantity === 1}
                  variant="outline"
                  className="rounded-full h-[36px] w-[36px] p-0"
                  onClick={() => setQuantity(quantity - 1)}
                >
                  <Minus className="w-5 h-5" />
                </Button>
                <div className="flex rounded-full border w-[100px] items-center justify-center h-[36px]">
                  <span>{quantity}</span>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full h-[36px] w-[36px] p-0"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button className="rounded-full bg-amber-800 hover:bg-amber-700">
              Adicionar a cesta
            </Button>
          </div>
        </div>
      </div>
    </LPage>
  );
};

export default ProductDetail;
