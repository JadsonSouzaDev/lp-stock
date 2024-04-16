import { sql } from "@vercel/postgres";

import { Product } from "@/types/product";

export const serializeProduct = (row: any): Product => {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    author: row.author,
    type: row.type,
    barcode: row.barcode,
    url_image: row.url_image,
    sale_price: row.sale_price,
    purchase_price: row.purchase_price,
    quantity: row.quantity,
    category: row.category,
    createdAt: row.createdat,
    updatedAt: row.updatedat,
    profit_per_unit: row.sale_price - row.purchase_price,
    profit_total: (row.sale_price - row.purchase_price) * row.quantity,
    active: row.active,
    is_promotion: row.is_promotion,
  } as Product;
};

export const getProducts = async (): Promise<Product[]> => {
  const { rows } =
    await sql`select * from product p where p.active = true order by p.createdAt desc`;
  return rows.map(serializeProduct);
};

export const getNewestProducts = async (): Promise<Product[]> => {
  const { rows } = await sql`
    select * from product p where p.active = true and p.is_promotion = false order by p.createdAt desc limit 5
  `;
  return rows.map(serializeProduct);
};

export const getPromotionProducts = async (): Promise<Product[]> => {
  const { rows } = await sql`
    select * from product p where p.active = true and p.is_promotion = true order by p.createdAt desc limit 5
  `;
  return rows.map(serializeProduct);
};

export const getBestCategories = async (): Promise<string[]> => {
  const { rows } = await sql`
    select category from product p where p.active = true group by category order by count(*) desc limit 5
  `;
  return rows.map((row) => row.category);
};

export const createProduct = async (product: Product): Promise<Product> => {
  const { rows } = await sql`
    insert into product (name, description, author, type, barcode, url_image, sale_price, purchase_price, quantity, category, is_promotion, active)
    values (${product.name}, ${product.description}, ${product.author}, ${product.type}, ${product.barcode}, ${product.url_image}, ${product.sale_price}, ${product.purchase_price}, ${product.quantity}, ${product.category}, ${product.is_promotion}, true)
    returning *
  `;
  const [row] = rows;
  return serializeProduct(row);
};

export const updateProduct = async (product: Product): Promise<Product> => {
  const { rows } = await sql`
    update product
    set name = ${product.name},
      description = ${product.description},
      author = ${product.author},
      type = ${product.type},
      barcode = ${product.barcode},
      url_image = ${product.url_image},
      sale_price = ${product.sale_price},
      purchase_price = ${product.purchase_price},
      quantity = ${product.quantity},
      category = ${product.category},
      is_promotion = ${product.is_promotion}
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
