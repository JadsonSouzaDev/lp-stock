"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

import { LPage } from "@/components/lp";
import { Product } from "@/types/product";

type ProductDetailProps = {
  product: Product | null;
};

const ProductDetail: FC<ProductDetailProps> = ({ product }) => {
  const router = useRouter();
  if (product === null) {
    router.push("/produtos");
  }

  return (
    <LPage>
      <h1>{product?.name}</h1>
    </LPage>
  );
};

export default ProductDetail;
