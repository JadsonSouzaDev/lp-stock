import { sql } from "@vercel/postgres";

import { Product } from "@/types/product";

export const serializeProduct = (row: any): Product => {
  return {
    id: row.id,
    name: row.name,
    sale_price: row.sale_price,
    purchase_price: row.purchase_price,
    quantity: row.quantity,
    category: row.category,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    profit_per_unit: row.sale_price - row.purchase_price,
    profit_total: (row.sale_price - row.purchase_price) * row.quantity,
  } as Product;
};

export const getProducts = async (): Promise<Product[]> => {
  const { rows } =
    await sql`select * from product p where p.active = true order by p.createdAt desc`;
  return rows.map(serializeProduct);
};

export const createProduct = async (product: Product): Promise<Product> => {
  const { rows } = await sql`
    insert into product (name, sale_price, purchase_price, quantity, category)
    values (${product.name}, ${product.sale_price}, ${product.purchase_price}, ${product.quantity}, ${product.category})
    returning *
  `;
  const [row] = rows;
  return serializeProduct(row);
};

export const updateProduct = async (product: Product): Promise<Product> => {
  const { rows } = await sql`
    update product
    set name = ${product.name},
      sale_price = ${product.sale_price},
      purchase_price = ${product.purchase_price},
      quantity = ${product.quantity},
      category = ${product.category}
    where id = ${product.id}
    returning *
  `;
  const [row] = rows;
  return serializeProduct(row);
};

export const desactivateProduct = async (id: string): Promise<void> => {
  await sql`
    update product
    set active = false
    where id = ${id} and active = true
  `;
};
