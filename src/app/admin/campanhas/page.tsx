import { LAdminPage, LTable } from "@/components/lp";
import { EmptyStateProps } from "@/components/lp/LTable/components/EmptyState";

export default function Campaigns() {
  const emptyProps: EmptyStateProps = {
    text: {
      singular: "campanha",
      plural: "campanhas",
    },
    isFiltering: false,
    type: "female",
  };

  return (
    <LAdminPage title="Campanhas">
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
        visibility={{}}
      />
    </LAdminPage>
  );
}
