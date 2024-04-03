import { Product } from "@/types/product";

import ProductSection from "./components/section";

async function getData(): Promise<Product[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${API_URL}/product`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data - ${API_URL}/products: `, error);
    throw error;
  }
}

export default async function Products() {
  const data = await getData();

  return <ProductSection data={data} />;
}
