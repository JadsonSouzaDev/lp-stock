import { LPage, LTable } from "@/components/lp";
import { EmptyStateProps } from "@/components/lp/LTable/components/EmptyState";

export default function Orders() {
  const emptyProps: EmptyStateProps = {
    text: {
      singular: "pedido",
      plural: "pedidos",
    },
    isFiltering: false,
    type: "male",
  };

  return (
    <LPage title="Pedidos">
      <LTable
        visibility={{}}
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
