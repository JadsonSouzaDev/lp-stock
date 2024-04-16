import { getProductById } from "@/app/api/product/repository";

import ProductDetail from "./components/ProductDetail";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const product = await getProductById(id);

  return <ProductDetail product={product} />;
}
