import { X } from "lucide-react";
import React, { FC, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { formatedCurrency } from "@/lib/currency";

import BasketItem from "./BasketItem";
import { getBasket } from "./service";

type BasketProps = {
  onClose: () => void;
};

const Basket: FC<BasketProps> = ({ onClose }) => {
  const [basket, setBasket] = useState(getBasket());

  window.addEventListener("basketChanged", () => {
    setBasket(getBasket());
  });

  return (
    <Drawer open onClose={onClose}>
      <DrawerContent className="max-w-lg min-h-screen max-h-screen ml-auto">
        <div className="mx-auto md:px-2 w-full flex flex-col justify-between flex-1">
          <DrawerHeader>
            <DrawerTitle className="flex items-center justify-between ">
              <span className="text-amber-800">Minha cesta</span>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-6 w-6" />
              </Button>
            </DrawerTitle>
            {/* <DrawerDescription className="flex text-black justify-start">
              Faltam apenas R$80 para frete grátis
            </DrawerDescription>
            <div className="flex h-3 border  border-black">
              <div className="h-full bg-black w-1/5 "></div>
            </div> */}
          </DrawerHeader>
          <div className="flex p-4">
            {basket.items.length === 0 && (
              <span className="text-sm text-muted-foreground mx-auto">
                Não há produtos na cesta
              </span>
            )}

            <div className="flex flex-col gap-2">
              {basket.items.map((product) => (
                <BasketItem key={product.id} product={product} />
              ))}
            </div>
          </div>
          <DrawerFooter>
            {basket.items.length > 0 && (
              <>
                <div className="flex h-[1px] mb-4 bg-gray-300"></div>
                <div className="flex justify-between pb-8 text-amber-800">
                  <div className="font-bold">Subtotal</div>
                  <div className="font-bold tracking-tighter">
                    {formatedCurrency(basket.subtotal)}
                  </div>
                </div>
                <Button className="rounded-full bg-amber-800 hover:bg-amber-700">
                  Finalizar compra
                </Button>
              </>
            )}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Basket;
