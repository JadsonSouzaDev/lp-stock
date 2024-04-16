import { searchProducts } from "../api/product/repository";

import ProductSearch from "./[id]/components/ProductSearch";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const { search } = searchParams;
  const products = await searchProducts(search ?? "");
  return <ProductSearch products={products} search={search} />;
}
