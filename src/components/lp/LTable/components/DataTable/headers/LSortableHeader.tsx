import { ArrowUpDown } from "lucide-react";
import { FC } from "react";

import { Button } from "@/components/ui/button";

type LSortableHeaderProps = {
  column: {
    toggleSorting: (isAsc: boolean) => void;
    getIsSorted: () => "asc" | "desc" | false;
  };
  label: string;
};

const LSortableHeader: FC<LSortableHeaderProps> = ({ column, label }) => {
  return (
    <Button
      variant="link"
      className="-ml-4"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export default LSortableHeader;
