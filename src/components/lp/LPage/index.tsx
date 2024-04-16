import { ChangeEventHandler, FC, PropsWithChildren } from "react";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const LPage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="flex flex-col min-h-screen w-full">
      <Navbar />

      <div className="min-h-screen max-w-screen-xl w-full flex flex-col mx-auto py-16">
        {children}
      </div>

      <Footer />
    </main>
  );
};

export default LPage;
