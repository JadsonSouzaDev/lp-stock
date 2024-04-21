"use client";

import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";

import { LForm } from "@/components/lp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/types/user";

import { getProfileFields, passwordFields, passwordRefine } from "./form";
import { updatePassword, updateProfile } from "./service";
import { ProfileForm, UpdatePasswordForm } from "./type";

const ProfileSection: FC = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
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

  const fields = getProfileFields(user);

  return (
    <section>
      <Tabs defaultValue="account" className="max-w-lg mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Meus dados</TabsTrigger>
          <TabsTrigger value="password">Minha senha</TabsTrigger>
          {/* <TabsTrigger value="address">Meus endereços</TabsTrigger> */}
        </TabsList>
        <TabsContent value="account" className="flex flex-col gap-6 pt-3">
          <h1>Meus dados</h1>

          <div className="flex">
            <LForm<ProfileForm>
              loading={loading}
              fields={fields}
              buttonTexts={{
                default: "Atualizar",
                loading: "Atualizando...",
              }}
              onSubmit={(data) => updateProfile(data, token, setLoading)}
            />
          </div>
        </TabsContent>

        <TabsContent value="password" className="flex flex-col gap-6">
          <h1>Minha senha</h1>

          <div className="flex">
            <LForm<UpdatePasswordForm>
              loading={loading}
              fields={passwordFields}
              onRefine={passwordRefine}
              buttonTexts={{
                default: "Atualizar",
                loading: "Atualizando...",
              }}
              onSubmit={(data) => updatePassword(data, token, setLoading)}
            />
          </div>
        </TabsContent>

        {/* <TabsContent value="address" className="flex flex-col gap-6">
          <h1>Meus endereços</h1>

          <div className="flex"></div>
        </TabsContent> */}
      </Tabs>
    </section>
  );
};

export default ProfileSection;
