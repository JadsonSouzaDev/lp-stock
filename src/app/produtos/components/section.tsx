"use client";

import { FC, useState } from "react";

import { LPage, LTable } from "@/components/lp";
import LForm from "@/components/lp/LForm";
import { EmptyStateProps } from "@/components/lp/LTable/components/EmptyState";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/types/product";

import { columns } from "./columns";
import { formFields } from "./formFields";

type ProductSectionProps = {
  data: Product[];
};

const ProductSection: FC<ProductSectionProps> = ({ data }) => {
  const { toast } = useToast();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(false);

  const emptyProps: EmptyStateProps = {
    text: {
      singular: "produto",
      plural: "produtos",
    },
    isFiltering: false,
    type: "male",
    onCreate: () => {
      setOpenDrawer(true);
    },
  };

  const onSubmit = async (product: Product) => {
    try {
      setLoading(true);
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      console.log(API_URL);
      const response = await fetch(`${API_URL}/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      console.log(response.ok, response.statusText);
      if (response.ok) {
        toast({
          variant: "success",
          title: "Sucesso!",
          description: `O produto ${product.name} foi criado com sucesso!`,
        });
        setOpenDrawer(false);
      } else {
        toast({
          variant: "alert",
          title: "Erro!",
          description:
            response.statusText || `Erro ao criar o produto ${product.name}!`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro!",
        description: `Erro ao criar o produto ${product.name}!`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <LPage title="Produtos">
        <LTable
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

      <Dialog open={openDrawer} onOpenChange={setOpenDrawer}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="pb-3">
            <DialogTitle>Novo Produto</DialogTitle>
          </DialogHeader>
          <LForm
            loading={loading}
            fields={formFields}
            buttonTexts={{
              default: "Cadastrar produto",
              loading: "Cadastrando...",
            }}
            onSubmit={(data) => onSubmit(data)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductSection;
