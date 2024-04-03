"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { FC, useState } from "react";

import { LDeleteDialog, LModifyDialog, LPage, LTable } from "@/components/lp";
import { EmptyStateProps } from "@/components/lp/LTable/components/EmptyState";
import { Product } from "@/types/product";

import { onDeleteProduct, onModifyProduct } from "../service";

import { columns } from "./columns";
import { formFields } from "./formFields";

type ProductSectionProps = {
  data: Product[];
};

const ProductSection: FC<ProductSectionProps> = ({ data: initialData }) => {
  const [loadingModify, setLoadingModify] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [data, setData] = useState<Product[]>(initialData);

  const params = useSearchParams();
  const router = useRouter();

  const action = params.get("acao");
  const id = params.get("id");

  const clearAction = () => {
    router.replace("/produtos");
  };

  const setCreateAction = () => {
    router.replace(`/produtos?acao=novo`);
  };

  const emptyProps: EmptyStateProps = {
    text: {
      singular: "produto",
      plural: "produtos",
    },
    isFiltering: false,
    type: "male",
    onCreate: () => {
      setCreateAction();
    },
  };

  return (
    <div>
      <LPage title="Produtos">
        <LTable
          loading={loadingData}
          emptyProps={emptyProps}
          visibility={{ category: false, purchase_price: false }}
          columns={columns}
          data={data}
          filters={[
            {
              accessorKey: "name",
              label: "Nome",
              placeholder: "Pesquise pelo nome...",
            },
          ]}
        />
      </LPage>

      <LModifyDialog<Product>
        label="produto"
        open={action === "editar" || action === "novo"}
        setOpen={clearAction}
        loading={loadingModify}
        fields={formFields}
        state={data.find((product) => product.id === id)}
        onSubmit={(formData) => {
          const oldData = data.find((product) => product.id === id);
          const modifiedData: Product = !id
            ? formData
            : { ...oldData, ...formData };
          onModifyProduct(
            modifiedData,
            setLoadingModify,
            setLoadingData,
            clearAction,
            setData,
            !!id
          );
        }}
      />

      <LDeleteDialog
        label="produto"
        title={data.find((product) => product.id === id)?.name || ""}
        open={action === "excluir"}
        loading={loadingModify}
        onClose={() => clearAction()}
        onDelete={() =>
          onDeleteProduct(
            id as string,
            setLoadingModify,
            setLoadingData,
            clearAction,
            setData
          )
        }
      />
    </div>
  );
};

export default ProductSection;
