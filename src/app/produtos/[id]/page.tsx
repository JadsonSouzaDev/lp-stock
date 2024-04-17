import { revalidatePath } from "next/cache";

import { getProductById } from "@/app/api/product/repository";

import ProductDetail from "./components/ProductDetail";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  async function getData(id: string) {
    "use server";
    revalidatePath(`/produtos/${id}`);
    return getProductById(id);
  }

  const product = await getData(id);

  return <ProductDetail product={product} />;
}
