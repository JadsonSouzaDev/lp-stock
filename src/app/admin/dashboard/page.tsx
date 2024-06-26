import { LAdminPage, LTable } from "@/components/lp";
import { EmptyStateProps } from "@/components/lp/LTable/components/EmptyState";

export default function Dashboard() {
  const emptyProps: EmptyStateProps = {
    text: {
      singular: "dashboard",
      plural: "dashboards",
    },
    isFiltering: false,
    type: "male",
  };

  return (
    <LAdminPage title="Dashboard">
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
    </LAdminPage>
  );
}
