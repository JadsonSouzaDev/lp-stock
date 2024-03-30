import { FC } from "react";

import { Button } from "@/components/ui/button";

export type EmptyStateProps = {
  text: { singular: string; plural: string };
  type: "male" | "female";
  isFiltering: boolean;
};

const EmptyState: FC<EmptyStateProps> = ({ text, isFiltering, type }) => {
  return (
    <>
      <h3 className="text-2xl font-bold tracking-tight">
        Não há {text.plural}{" "}
        {isFiltering
          ? "para esse filtro"
          : type === "male"
          ? "cadastrados"
          : "cadastradas"}
      </h3>
      <p className="text-sm text-muted-foreground">
        Você pode adicionar {type === "male" ? "um" : "uma"} {text.singular}{" "}
        clicando no botão abaixo.
      </p>
      <Button className="mt-4">Adicionar {text.singular}</Button>
    </>
  );
};

export default EmptyState;
