import { LPage } from "@/components/lp";
import { Product } from "@/types/product";

import { getNewestProducts } from "./api/product/repository";
import { CampaignSection, NewsSection } from "./components";

export default async function Home() {
  const newestProducts: Product[] = await getNewestProducts();
  return (
    <LPage>
      <CampaignSection />
      <NewsSection products={newestProducts} />
    </LPage>
  );
}
