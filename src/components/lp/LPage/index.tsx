import React, { FC, PropsWithChildren } from "react";

import { LSidebar } from "..";

type LPageProps = {
  title: string;
};

const LPage: FC<PropsWithChildren<LPageProps>> = ({ title, children }) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <LSidebar.Desktop />
      <div className="flex flex-col">
        <LSidebar.Mobile title={title} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {/* <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
          </div> */}
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LPage;
