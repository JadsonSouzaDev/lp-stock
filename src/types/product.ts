export type Product = {
  id: string;
  name: string;
  description: string;
  author: string;
  type: string;
  barcode: string;
  url_image: string;
  category: string;
  quantity: number;
  sale_price: number;
  purchase_price: number;
  profit_per_unit: number;
  profit_total: number;
  is_promotion: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};
