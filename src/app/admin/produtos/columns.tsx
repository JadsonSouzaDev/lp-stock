"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

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
    accessorKey: "url_image",
    header: "Imagem",
    cell: ({ row }) => {
      const src = row.original.url_image;
      return (
        <div className="flex items-center justify-center">
          {src ? (
            <Image
              src={src}
              alt={row.getValue("name")}
              width={50}
              height={50}
            />
          ) : (
            ""
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "barcode",
    header: ({ column }) => {
      return <LSortableHeader column={column} label="Código" />;
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
    accessorKey: "profit_per_unit",
    header: ({ column }) => {
      return <LSortableHeader column={column} label="Lucro por unidade" />;
    },
    cell: ({ row }) => {
      return <LCurrencyCell value={row.getValue("profit_per_unit")} />;
    },
  },
  {
    accessorKey: "profit_total",
    header: ({ column }) => {
      return <LSortableHeader column={column} label="Lucro total" />;
    },
    cell: ({ row }) => {
      return <LCurrencyCell value={row.getValue("profit_total")} />;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <LActionsCell
          hrefBase="/admin/produtos"
          actions={[
            { label: "Detalhes", action: "detalhes", id: row.original.id },
            { label: "Editar", action: "editar", id: row.original.id },
            { label: "Excluir", action: "excluir", id: row.original.id },
          ]}
        />
      );
    },
  },
];
