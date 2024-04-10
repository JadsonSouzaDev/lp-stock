"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import {
  LAdminPage,
  LDeleteDialog,
  LDetailDialog,
  LModifyDialog,
  LTable,
} from "..";
import { EmptyStateProps } from "../LTable/components/EmptyState";

import { LCrudSectionProps } from "./types";

function LCrudSection<Type>({
  initialData,
  hrefBase,
  typeProps,
  tableProps: { columns, tableVisibility, tableFilters },
  modifyFormFields: formFields,
  getItem,
  getItemTitle,
  onModifyItem,
  onDeleteItem,
}: LCrudSectionProps<Type>) {
  // States
  const [loadingModify, setLoadingModify] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [data, setData] = useState<Type[]>(initialData);

  // Query Params
  const params = useSearchParams();
  const router = useRouter();
  const action = params.get("acao");
  const id = params.get("id");

  // Actions
  const clearAction = () => {
    router.replace(hrefBase);
  };

  const setCreateAction = () => {
    router.replace(`${hrefBase}?acao=novo`);
  };

  // Empty State
  const emptyProps: EmptyStateProps = {
    text: typeProps,
    isFiltering: false,
    type: typeProps.gender,
    onCreate: () => {
      setCreateAction();
    },
  };

  return (
    <div>
      <LAdminPage title={typeProps.plural}>
        <LTable
          loading={loadingData}
          emptyProps={emptyProps}
          visibility={tableVisibility ?? {}}
          columns={columns}
          data={data}
          filters={tableFilters ?? []}
        />
      </LAdminPage>

      <LModifyDialog<Type>
        label={typeProps.singular}
        open={action === "editar" || action === "novo"}
        setOpen={clearAction}
        loading={loadingModify}
        fields={formFields}
        state={getItem(id as string, data)}
        onSubmit={(formData) => {
          const oldData = getItem(id as string, data);
          const modifiedData: Type = !id
            ? formData
            : { ...oldData, ...formData };
          onModifyItem(
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
        label={typeProps.singular}
        title={getItemTitle(id as string, data)}
        open={action === "excluir"}
        loading={loadingModify}
        onClose={() => clearAction()}
        onDelete={() =>
          onDeleteItem(
            id as string,
            setLoadingModify,
            setLoadingData,
            clearAction,
            setData
          )
        }
      />

      <LDetailDialog<Type>
        label={typeProps.singular}
        open={action === "detalhes"}
        onClose={() => clearAction()}
        data={getItem(id as string, data) as Type}
      />
    </div>
  );
}

export default LCrudSection;
