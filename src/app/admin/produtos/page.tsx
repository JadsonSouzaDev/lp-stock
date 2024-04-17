import { revalidatePath } from "next/cache";

import { getProducts } from "@/app/api/product/repository";
import { Product } from "@/types/product";

import ProductSection from "./section";

export default async function Products() {
  async function getData() {
    "use server";
    revalidatePath("/admin/produtos");
    return await getProducts();
  }

  const data: Product[] = await getData();
  return <ProductSection data={data} />;
}
