import { LPage, LTable } from "@/components/lp";
import { EmptyStateProps } from "@/components/lp/LTable/components/EmptyState";

export default function Financial() {
  const emptyProps: EmptyStateProps = {
    text: {
      singular: "entrada ou saída",
      plural: "entradas ou saídas",
    },
    isFiltering: false,
    type: "female",
  };

  return (
    <LPage title="Controle de caixa">
      <LTable emptyProps={emptyProps} />
    </LPage>
  );
}
