import { LPage, LTable } from "@/components/lp";
import { EmptyStateProps } from "@/components/lp/LTable/components/EmptyState";
import { Product } from "@/types/product";

import { columns } from "./components/columns";

async function getData(): Promise<Product[]> {
  const response = await fetch("http://localhost:3000/api/products");
  const data = await response.json();
  return data;
}

export default async function Products() {
  const data = await getData();

  const emptyProps: EmptyStateProps = {
    text: {
      singular: "produto",
      plural: "produtos",
    },
    isFiltering: false,
    type: "male",
  };

  return (
    <LPage title="Produtos">
      <LTable
        emptyProps={emptyProps}
        columns={columns}
        data={[]}
        filters={[
          {
            accessorKey: "name",
            label: "Nome",
            placeholder: "Pesquise pelo nome...",
          },
        ]}
      />
    </LPage>
  );
}
