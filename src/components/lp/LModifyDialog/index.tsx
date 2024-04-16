import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { LForm } from "..";
import { FormField } from "../LForm";

type LModifyDialogProps<Type> = {
  label: string;
  type?: "male" | "female";
  open: boolean;
  setOpen: (value: boolean) => void;
  loading: boolean;
  fields: FormField[];
  gridCols?: number;
  onSubmit: (newData: Type) => void;
  state?: Type;
};

function LModifyDialog<Type>({
  label,
  type = "male",
  open,
  setOpen,
  loading,
  fields,
  onSubmit,
  state,
  gridCols = 1,
}: LModifyDialogProps<Type>) {
  const isUpdate = !!state;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-screen-md max-h-screen overflow-y-auto my-2">
        <DialogHeader className="pb-3">
          <DialogTitle>
            {isUpdate ? "Editar" : type === "male" ? "Novo" : "Nova"} {label}
          </DialogTitle>
        </DialogHeader>
        <LForm<Type>
          initialValue={state}
          loading={loading}
          gridCols={gridCols}
          fields={fields}
          buttonTexts={{
            default: `${isUpdate ? "Atualizar" : `Cadastrar`} ${label}`,
            loading: isUpdate ? "Atualizando..." : "Cadastrando...",
          }}
          onSubmit={(data: Type) => onSubmit(data)}
        />
      </DialogContent>
    </Dialog>
  );
}

export default LModifyDialog;
