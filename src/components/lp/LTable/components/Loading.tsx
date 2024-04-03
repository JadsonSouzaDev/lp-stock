import { FC } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

const Loading: FC<{ columns: number }> = ({ columns }) => {
  const rows = 3;
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, index) => (
            <TableCell key={index}>
              <Skeleton className="h-[40px] w-full rounded-xl" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default Loading;
