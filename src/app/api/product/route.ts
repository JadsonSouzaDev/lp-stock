import { sql } from "@vercel/postgres";
// import { NextApiRequest, NextApiResponse } from "next";

import { Product } from "@/types/product";

const serializeProduct = (row: any): Product => {
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

export const getProducts = async () => {
  const { rows } = await sql`select * from product p where p.active = true`;
  return rows.map(serializeProduct);
};

export async function GET() {
  try {
    const serializedRows = getProducts();
    return Response.json(serializedRows);
  } catch (error) {
    console.error("Error fetching data - /product: ", error);
    return Response.error();
  }
}

export async function POST(req: Request) {
  const { name, sale_price, purchase_price, quantity, category } =
    await req.json();

  const { rows } = await sql`
    insert into product (name, sale_price, purchase_price, quantity, category)
    values (${name}, ${sale_price}, ${purchase_price}, ${quantity}, ${category})
    returning *
  `;

  const [row] = rows;

  return Response.json(serializeProduct(row));
}
