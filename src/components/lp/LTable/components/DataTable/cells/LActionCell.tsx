import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type LAction = {
  action: string;
  label: string;
  id: string;
};

type LActionsProps = {
  actions: LAction[];
  hrefBase: string;
};

const LActionsCell: FC<LActionsProps> = ({ actions, hrefBase }) => {
  const router = useRouter();

  const onClick = (action: LAction) => {
    router.replace(`${hrefBase}?acao=${action.action}&id=${action.id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actions.map((action) => (
          <DropdownMenuItem
            key={action.label}
            className={action.label === "Excluir" ? "text-red-500" : ""}
            onClick={() => onClick(action)}
          >
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LActionsCell;
