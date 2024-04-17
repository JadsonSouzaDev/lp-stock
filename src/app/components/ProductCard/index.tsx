import { BadgePercent } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const isPromotion = product.is_promotion;
  const price = product.sale_price
    .toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace(".", ",");

  return (
    <Card
      key={product.id}
      className="w-[210px] h-[390px] border-amber-800 border-opacity-25 rounded-2xl py-0 shadow-md"
    >
      <CardContent className="pt-4 pb-4 px-0">
        <div className="flex w-full h-[170px] relative">
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
        <div className="flex flex-col justify-between w-full h-[190px] p-4">
          <div className="flex flex-col gap-1">
            <span className="leading-tight">{product.name}</span>
            <span className="leading-tight text-sm text-muted-foreground">
              {product.category}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex space-x-1">
              <span className="text-amber-800 font-bold">R$ {price}</span>
              {isPromotion && (
                <BadgePercent
                  className={cn(
                    "text-amber-800",
                    "bg-yellow-300",
                    "rounded-full"
                  )}
                  size={24}
                />
              )}
            </div>
            <Link
              href={`/produtos/${product.id}`}
              className="flex items-center justify-center"
            >
              <Button className="bg-orange-300 hover:bg-orange-200 text-amber-800 text-md w-full">
                Comprar
              </Button>
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
