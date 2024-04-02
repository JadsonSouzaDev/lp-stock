import { Product } from "@/types/product";

import ProductSection from "./components/section";

async function getData(): Promise<Product[]> {
  const response = await fetch("http://localhost:3000/api/products");
  const data = await response.json();
  return data;
}

export default async function Products() {
  const data = await getData();

  return <ProductSection data={data} />;
}
