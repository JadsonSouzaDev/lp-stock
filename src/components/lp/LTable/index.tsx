import { FC } from "react";

import EmptyState, { EmptyStateProps } from "./components/EmptyState";

type LTableProps = {
  emptyProps: EmptyStateProps;
};

const LTable: FC<LTableProps> = ({ emptyProps }) => {
  return (
    <>
      <EmptyState {...emptyProps} />
    </>
  );
};

export default LTable;
