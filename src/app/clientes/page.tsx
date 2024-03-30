import { LPage, LTable } from "@/components/lp";
import { EmptyStateProps } from "@/components/lp/LTable/components/EmptyState";

export default function Clients() {
  const emptyProps: EmptyStateProps = {
    text: {
      singular: "cliente",
      plural: "clientes",
    },
    isFiltering: false,
    type: "male",
  };

  return (
    <LPage title="Clientes">
      <LTable emptyProps={emptyProps} />
    </LPage>
  );
}
