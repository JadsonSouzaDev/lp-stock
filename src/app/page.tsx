import { LPage } from "@/components/lp";
import { Product } from "@/types/product";

import {
  getBestCategories,
  getNewestProducts,
  getPromotionProducts,
} from "./api/product/repository";
import { CampaignSection, ProductSection } from "./components";
import CategorySection from "./components/CategorySection";

export default async function Home() {
  const newestProducts: Product[] = await getNewestProducts();
  const promotionProducts: Product[] = await getPromotionProducts();
  const categories = await getBestCategories();
  return (
    <LPage>
      <CampaignSection />
      <CategorySection categories={categories} />
      <ProductSection
        title="Novidades"
        sectionId="novidades"
        products={newestProducts}
      />
      <ProductSection
        title="Promoções"
        sectionId="promocoes"
        products={promotionProducts}
      />
    </LPage>
  );
}
