"use client";

import { ColumnDef } from "@tanstack/react-table";

import LActionsCell from "@/components/lp/LTable/components/DataTable/cells/LActionCell";
import LSortableHeader from "@/components/lp/LTable/components/DataTable/headers/LSortableHeader";
import { formatPhoneNumber } from "@/lib/phone";
import { User } from "@/types/user";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <LSortableHeader column={column} label="Nome" />;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <LSortableHeader column={column} label="E-mail" />;
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return <LSortableHeader column={column} label="Telefone" />;
    },
    cell: ({ row }) => {
      const formattedPhone = formatPhoneNumber(row.original.phone);
      return <span>{formattedPhone}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <LActionsCell
          hrefBase="/admin/clientes"
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
