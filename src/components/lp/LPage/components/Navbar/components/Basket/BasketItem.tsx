import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

import { Button } from "@/components/ui/button";
import { formatedCurrency } from "@/lib/currency";

import { removeFromBasket } from "./service";
import { BasketProduct } from "./types";

type BasketItemProps = {
  product: BasketProduct;
};

const BasketItem: FC<BasketItemProps> = ({ product }) => {
  return (
    <div className="flex items-center justify-between py-4 border-t border-gray-300">
      <div className="grid grid-cols-4 gap-4">
        <div className="flex justify-start items-center">
          <Image
            src={product.image}
            alt={product.name}
            width={80}
            height={80}
            className="h-20 w-20 object-cover"
          />
        </div>
        <div className="col-span-2 flex flex-col gap-1">
          <h3 className="text-sm font-semibold truncate">{product.name}</h3>
          <span className="text-xs text-muted-foreground">{product.type}</span>
          <span className="text-xs text-muted-foreground">
            {product.quantity} x {formatedCurrency(product.price)}
          </span>
          <div className="flex gap-2 mt-2">
            <div className="flex gap-1 border rounded-full w-[124px]">
              <Button
                disabled={product.quantity === 1}
                variant="ghost"
                className="rounded-full h-[32px] w-[32px] p-0"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <div className="flex rounded-full w-[60px] items-center justify-center h-[32px]">
                <span className="text-xs">{product.quantity}</span>
              </div>
              <Button
                variant="ghost"
                // disabled={product.quantity === product.quantity}
                className="rounded-full h-[32px] w-[32px] p-0"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-[32px] w-[32px] p-0 bg-red-500 hover:bg-red-600 text-white hover:text-white border-red-500 hover:border-red-600"
              onClick={() => removeFromBasket(product.id)}
            >
              <Trash className="w-4 h-4 " />
            </Button>
          </div>
        </div>
        <div className="flex justify-end">
          <span className="text-sm font-semibold">
            {formatedCurrency(product.quantity * product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BasketItem;
