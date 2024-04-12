"use client";
import { FC } from "react";

import { LCrudSection } from "@/components/lp";
import { Product } from "@/types/product";

import { columns } from "./columns";
import { modifyFormFields } from "./form";
import { onDeleteProduct, onModifyProduct } from "./service";

type ProductSectionProps = {
  data: Product[];
};

const ProductSection: FC<ProductSectionProps> = ({ data: initialData }) => {
  const getItem = (id: string, data: Product[]) => {
    return data.find((product) => product.id === id);
  };

  const getItemTitle = (id: string, data: Product[]) => {
    return data.find((product) => product.id === id)?.name || "";
  };

  return (
    <LCrudSection<Product>
      initialData={initialData}
      hrefBase="/admin/produtos"
      getItem={getItem}
      getItemTitle={getItemTitle}
      modifyFormFields={modifyFormFields}
      onModifyItem={onModifyProduct}
      onDeleteItem={onDeleteProduct}
      tableProps={{
        columns,
        tableFilters: [
          {
            accessorKey: "name",
            label: "Nome",
            placeholder: "Pesquise pelo nome...",
          },
        ],
        tableVisibility: {
          category: false,
          purchase_price: false,
          profit_per_unit: false,
          profit_total: false,
        },
      }}
      typeProps={{
        singular: "produto",
        plural: "produtos",
        gender: "male",
      }}
    />
  );
};

export default ProductSection;
