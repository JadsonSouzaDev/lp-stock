import { getProducts } from "@/app/api/product/repository";
import { Product } from "@/types/product";

import ProductSection from "./components/section";

export default async function Products() {
  const data: Product[] = await getProducts();
  return <ProductSection data={data} />;
}
