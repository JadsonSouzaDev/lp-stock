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
      <LTable
        emptyProps={emptyProps}
        columns={[]}
        data={[]}
        filters={[
          {
            accessorKey: "name",
            label: "Nome",
            placeholder: "Pesquise pelo nome...",
          },
        ]}
      />
    </LPage>
  );
}
