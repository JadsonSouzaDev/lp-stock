import { FC } from "react";

import { Product } from "@/types/product";

import ProductCard from "../ProductCard";

type ProductSectionProps = {
  products: Product[];
  title: string;
  sectionId: string;
};

const ProductSection: FC<ProductSectionProps> = ({
  products,
  title,
  sectionId,
}) => {
  return (
    <section
      id={sectionId}
      className="flex flex-col items-center px-4 py-6 md:py-12 lg:px-8 xl:px-10 gap-12 md:gap-16"
    >
      <div className="border-b-4 py-2 border-amber-800 flex w-fit">
        <h1 className="text-center text-4xl text-amber-800">{title}</h1>
      </div>
      <div className="grid grid-cols-5 gap-8" style={{ rowGap: "40px" }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
