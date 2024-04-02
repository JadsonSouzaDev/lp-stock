export type Product = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  sale_price: number;
  purchase_price: number;
  profit_per_unit: number;
  profit_total: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};
