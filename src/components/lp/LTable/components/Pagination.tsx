import { FC } from "react";

import { Button } from "@/components/ui/button";

type PaginationProps = {
  previousPage: () => void;
  canPreviousPage: boolean;
  nextPage: () => void;
  canNextPage: boolean;
  total: number;
};

const Pagination: FC<PaginationProps> = ({
  previousPage,
  canPreviousPage,
  nextPage,
  canNextPage,
  total,
}) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex justify-center pl-1">
        <span className="text-sm text-muted-foreground">
          Total de {total} itens
        </span>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
