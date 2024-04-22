import { ChangeEventHandler, FC, PropsWithChildren } from "react";

import LBreadcrumb, { LBreadcrumbItem } from "./components/Breadcrumb";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const LPage: FC<
  PropsWithChildren<{
    hideBreadcrumb?: boolean;
    breadcrumbItems?: LBreadcrumbItem[];
  }>
> = ({ children, hideBreadcrumb, breadcrumbItems }) => {
  return (
    <main className="flex flex-col min-h-screen w-full">
      <Navbar />

      <div className="min-h-screen max-w-screen-xl w-full flex flex-col sm:px-4 md:px-8 xl:px-0 mx-auto py-20 md:py-16">
        {!hideBreadcrumb && <LBreadcrumb items={breadcrumbItems} />}
        {children}
      </div>

      <Footer />
    </main>
  );
};

export default LPage;
