import { LPage, LTable } from "@/components/lp";
import { EmptyStateProps } from "@/components/lp/LTable/components/EmptyState";

export default function Products() {
  const emptyProps: EmptyStateProps = {
    text: {
      singular: "produto",
      plural: "produtos",
    },
    isFiltering: false,
    type: "male",
  };

  return (
    <LPage title="Produtos">
      <LTable emptyProps={emptyProps} />
    </LPage>
  );
}
