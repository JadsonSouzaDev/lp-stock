"use client";

import { FC } from "react";

import { LCrudSection } from "@/components/lp";
import { User } from "@/types/user";

import { columns } from "./columns";
import { modifyFormFields } from "./form";
import { onDeleteUser, onModifyUser } from "./service";

type ClientSectionProps = {
  data: User[];
};

const ClientSection: FC<ClientSectionProps> = ({ data: initialData }) => {
  const getItem = (id: string, data: User[]) => {
    return data.find((user) => user.id === id);
  };

  const getItemTitle = (id: string, data: User[]) => {
    return data.find((user) => user.id === id)?.name || "";
  };

  return (
    <LCrudSection<User>
      initialData={initialData}
      hrefBase="/admin/clientes"
      getItem={getItem}
      getItemTitle={getItemTitle}
      modifyFormFields={{ gridCols: 3, fields: modifyFormFields }}
      onModifyItem={onModifyUser}
      onDeleteItem={onDeleteUser}
      tableProps={{
        columns,
        tableFilters: [
          {
            accessorKey: "name",
            label: "Nome",
            placeholder: "Pesquise pelo nome...",
          },
        ],
        tableVisibility: {},
      }}
      typeProps={{
        singular: "cliente",
        plural: "clientes",
        gender: "male",
      }}
    />
  );
};

export default ClientSection;
