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

export async function GET() {
  const { rows } = await sql`select * from product p where p.active = true`;
  const serializableRows = rows.map(serializeProduct);
  return Response.json(serializableRows);
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
