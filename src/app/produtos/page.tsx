import { Product } from "@/types/product";

import { getProducts } from "../api/product/route";

import ProductSection from "./components/section";

export default async function Products() {
  const data: Product[] = await getProducts();
  return <ProductSection data={data} />;
}
