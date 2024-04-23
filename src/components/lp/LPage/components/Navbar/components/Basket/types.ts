export type BasketProduct = {
  id: string;
  name: string;
  type: string;
  image: string;
  price: number;
  quantity: number;
};

export type BasketStorage = {
  items: BasketProduct[];
  subtotal: number;
};
