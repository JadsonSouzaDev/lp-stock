import { BadgePercent } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

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
    <Card key={product.id} className="w-[200px] h-[380px] rounded-2xl py-0">
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
        <div className="flex flex-col justify-between w-full h-[130px] p-4">
          <div className="flex flex-col gap-1">
            <span className="leading-tight">{product.name}</span>
            <span className="leading-tight text-sm text-muted-foreground">
              {product.category}
            </span>
          </div>
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
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
