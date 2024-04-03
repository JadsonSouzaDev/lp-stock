"use client";

import { Copy } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type LDetailDialogProps<Type> = {
  label: string;
  open: boolean;
  onClose: () => void;
  data: Type;
  gender?: "male" | "female";
};

function LDetailDialog<Type>({
  open,
  onClose,
  data,
  gender = "male",
  label,
}: LDetailDialogProps<Type>) {
  const params = useSearchParams();
  const router = useRouter();

  const onChangeAction = (action: string) => {
    const newParams = new URLSearchParams(params);
    newParams.set("acao", action);
    router.replace(`?${newParams.toString()}`);
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Detalhes {gender === "male" ? "do" : "da"} {label}
          </DialogTitle>
        </DialogHeader>
        {!!data && (
          <div className="flex flex-col">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="flex gap-2 items-center">
                <span className="text-muted-foreground" key={key}>
                  {key}:
                </span>
                <span>{value as string}</span>
                <Button
                  size="icon"
                  variant={"ghost"}
                  onClick={() => {
                    navigator.clipboard.writeText(value as string);
                  }}
                >
                  <Copy size={16} />
                </Button>
              </div>
            ))}
          </div>
        )}
        <DialogFooter className="sm:justify-start">
          <div className="flex justify-between w-full gap-3">
            <Button variant={"outline"} className="w-full" onClick={onClose}>
              Fechar
            </Button>

            <Button
              variant={"destructive"}
              className="w-full"
              onClick={() => onChangeAction("excluir")}
            >
              Excluir
            </Button>
            <Button className="w-full" onClick={() => onChangeAction("editar")}>
              Editar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LDetailDialog;
