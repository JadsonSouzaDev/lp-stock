import { FC } from "react";

import { Button } from "@/components/ui/button";

export type EmptyStateProps = {
  text: { singular: string; plural: string };
  type: "male" | "female";
  isFiltering: boolean;
  onCreate?: () => void;
};

const EmptyState: FC<EmptyStateProps> = ({
  text,
  isFiltering,
  type,
  onCreate,
}) => {
  return (
    <>
      <h3 className="text-lg font-bold tracking-tight">
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
      {!!onCreate && (
        <Button size={"sm"} className="mt-4" onClick={() => onCreate()}>
          Adicionar {text.singular}
        </Button>
      )}
    </>
  );
};

export default EmptyState;
