"use client";

import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";

import { LForm } from "@/components/lp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/types/user";

import { getFormFields } from "./form";

const ProfileSection: FC = () => {
  const [user, setUser] = useState<User>();
  const session = useSession();
  const data = session?.data?.user as { accessToken: string };
  const token = data?.accessToken;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await response.json();
      setUser(user);
    };

    if (token) fetchUser();
  }, [token]);

  if (!user || session.status === "loading") return <div>Carregando...</div>;

  const fields = getFormFields(user);

  return (
    <section>
      <Tabs defaultValue="account" className="max-w-2xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Meus dados</TabsTrigger>
          <TabsTrigger value="password">Minha senha</TabsTrigger>
          <TabsTrigger value="address">Meus endereços</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="flex flex-col gap-6 pt-3">
          <h1>Meus dados</h1>

          <div className="flex">
            <LForm
              fields={fields}
              buttonTexts={{
                default: "Atualizar",
                loading: "Atualizando...",
              }}
              onSubmit={() => null}
            />
          </div>
        </TabsContent>

        <TabsContent value="password" className="flex flex-col gap-6">
          <h1>Minha senha</h1>

          <div className="flex"></div>
        </TabsContent>

        <TabsContent value="address" className="flex flex-col gap-6">
          <h1>Meus endereços</h1>

          <div className="flex"></div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ProfileSection;
