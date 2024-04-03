import { FC } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type LDeleteDialogProps = {
  label: string;
  title: string;
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  loading: boolean;
};

const LDeleteDialog: FC<LDeleteDialogProps> = ({
  open,
  onClose,
  onDelete,
  loading,
  label,
  title,
}) => {
  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="pb-3">
            Tem certeza que deseja excluir o {label}?
          </DialogTitle>
          <DialogDescription className="py-4">
            Após confirmar, o {label} <b>{title}</b> será excluído
            permanentemente.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="justify-between w-full flex gap-3">
            <Button
              className="w-full"
              disabled={loading}
              type="button"
              variant="outline"
              onClick={() => onClose()}
            >
              Cancelar
            </Button>
            <Button
              className="w-full"
              variant="destructive"
              disabled={loading}
              type="button"
              onClick={() => onDelete()}
            >
              {loading ? "Excluindo..." : "Confirmar"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LDeleteDialog;
