import { revalidatePath } from "next/cache";

import { LPage } from "@/components/lp";
import { Product } from "@/types/product";

import {
  getCategories,
  getNewestProducts,
  getPromotionProducts,
  searchProducts,
} from "./api/product/repository";
import {
  ProductSearch,
  CategorySection,
  CampaignSection,
  ProductSection,
} from "./components";

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const { search } = searchParams;

  async function getSearchData(searchValue: string) {
    "use server";
    revalidatePath(`/?search=${searchValue}`);
    return await searchProducts(searchValue);
  }

  async function getHomeData() {
    "use server";
    const categories = await getCategories();
    const newestProducts = await getNewestProducts();
    const promotionProducts = await getPromotionProducts();
    revalidatePath("/");
    return { categories, newestProducts, promotionProducts };
  }

  // Search page
  if (search) {
    const products = await getSearchData(search ?? "");
    return <ProductSearch products={products} search={search} />;
  }

  // Home page
  const { categories, newestProducts, promotionProducts } = await getHomeData();

  return (
    <LPage>
      <CampaignSection />
      <CategorySection categories={categories} />
      <ProductSection
        title="Novidades"
        sectionId="novidades"
        products={newestProducts}
      />
      {promotionProducts.length > 0 && (
        <ProductSection
          title="Promoções"
          sectionId="promocoes"
          products={promotionProducts}
        />
      )}
    </LPage>
  );
}
