"use client";

import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import React, { FC, PropsWithChildren, useEffect } from "react";

import { LSidebar } from "..";

type LPageProps = {
  title: string;
};

const LAdminPage: FC<PropsWithChildren<LPageProps>> = ({ title, children }) => {
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const session = await getSession();
      const user = session?.user as { isAdmin: boolean };
      if (!user?.isAdmin) {
        router.push("/"); // redireciona para a página inicial se o usuário não for um administrador
      }
    };

    checkAdmin();
  }, [router]);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <LSidebar.Desktop />
      <div className="flex flex-col">
        <LSidebar.Mobile title={title} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {/* <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
          </div> */}
          <div className="flex justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col w-full p-4 items-center text-center">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LAdminPage;
