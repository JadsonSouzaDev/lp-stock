import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

import { FormField } from "../LForm";
import { EmptyStateProps } from "../LTable/components/EmptyState";
import { TableFilter } from "../LTable/type";

export type onModifyItemProps<Type> = (
  item: Type,
  setLoadingModify: Dispatch<SetStateAction<boolean>>,
  setLoadingData: Dispatch<SetStateAction<boolean>>,
  setOpenDialog: Dispatch<SetStateAction<boolean>>,
  setData: Dispatch<SetStateAction<Type[]>>,
  isUpdate: boolean
) => void;

export type onDeleteItemProps<Type> = (
  id: string,
  setLoadingModify: Dispatch<SetStateAction<boolean>>,
  setLoadingData: Dispatch<SetStateAction<boolean>>,
  setOpenDialog: Dispatch<SetStateAction<boolean>>,
  setData: Dispatch<SetStateAction<Type[]>>
) => void;

export type LCrudTypeProps = {
  singular: string;
  plural: string;
  gender: "male" | "female";
};

export type LCrudTableProps<Type> = {
  tableVisibility?: VisibilityState;
  tableFilters?: TableFilter[];
  columns: ColumnDef<Type>[];
};

export type LCrudSectionProps<Type> = {
  initialData: Type[];
  disableCreate?: boolean;
  hrefBase: string;
  tableProps: LCrudTableProps<Type>;
  typeProps: LCrudTypeProps;
  modifyFormFields: { gridCols: number; fields: FormField[] };
  getItem: (id: string, data: Type[]) => Type | undefined;
  getItemTitle: (id: string, data: Type[]) => string;
  onModifyItem: onModifyItemProps<Type>;
  onDeleteItem: onDeleteItemProps<Type>;
};
