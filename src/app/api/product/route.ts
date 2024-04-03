import { NextApiResponse } from "next";

import { Product } from "@/types/product";

import { createProduct, getProducts } from "./repository";

export async function GET() {
  try {
    const serializedRows: Product[] = await getProducts();
    return Response.json(serializedRows);
  } catch (error) {
    console.error("Error get products - /product: ", error);
    return Response.error();
  }
}

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const savedProduct: Product = await createProduct(
      req.json() as unknown as Product
    );
    return Response.json(savedProduct);
  } catch (error) {
    console.error("Error creating product - /product: ", error);
    res.status(500);
    return Response.error();
  }
}
