import { FC, PropsWithChildren } from "react";

import Navbar from "./components/Navbar";

const LPage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="flex flex-col min-h-screen w-full">
      <Navbar />

      <div className="min-h-screen max-w-screen-xl w-full flex flex-col mx-auto pt-16">
        {children}
      </div>
    </main>
  );
};

export default LPage;
