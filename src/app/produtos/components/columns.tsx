"use client";

import { ColumnDef } from "@tanstack/react-table";

import LActionsCell from "@/components/lp/LTable/components/DataTable/cells/LActionCell";
import LCurrencyCell from "@/components/lp/LTable/components/DataTable/cells/LCurrencyCell";
import LSortableHeader from "@/components/lp/LTable/components/DataTable/headers/LSortableHeader";
import { Product } from "@/types/product";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <LSortableHeader column={column} label="Nome" />;
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return <LSortableHeader column={column} label="Categoria" />;
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return <LSortableHeader column={column} label="Quantidade" />;
    },
  },
  {
    accessorKey: "purchase_price",
    header: ({ column }) => {
      return <LSortableHeader column={column} label="Preço de compra" />;
    },
    cell: ({ row }) => {
      return <LCurrencyCell value={row.getValue("purchase_price")} />;
    },
  },
  {
    accessorKey: "sale_price",
    header: ({ column }) => {
      return <LSortableHeader column={column} label="Preço de venda" />;
    },
    cell: ({ row }) => {
      return <LCurrencyCell value={row.getValue("sale_price")} />;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <LActionsCell
          actions={[
            { label: "Detalhes", onClick: () => console.log(row.original) },
            { label: "Editar", onClick: () => console.log(row.original) },
            { label: "Excluir", onClick: () => console.log(row.original) },
          ]}
        />
      );
    },
  },
];
