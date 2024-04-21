import { Dispatch, SetStateAction } from "react";

import { toast } from "@/components/ui/use-toast";

import { ProfileForm, UpdatePasswordForm } from "./type";

export const updateProfile = async (
  values: ProfileForm,
  token: string,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    const response = await fetch("/api/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      toast({
        variant: "success",
        title: "Sucesso!",
        description: "Perfil atualizado com sucesso!",
      });
    } else {
      const error = await response.json();
      toast({
        variant: "alert",
        title: "Erro!",
        description:
          error.message ||
          "Erro ao atualizar o perfil. Tente novamente mais tarde.",
      });
    }
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Erro!",
      description: "Erro ao atualizar o perfil. Tente novamente mais tarde.",
    });
  } finally {
    setLoading(false);
  }
};

export const updatePassword = async (
  values: UpdatePasswordForm,
  token: string,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    const response = await fetch("/api/user/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      toast({
        variant: "success",
        title: "Sucesso!",
        description: "Senha atualizada com sucesso!",
      });
    } else {
      const error = await response.json();
      toast({
        variant: "alert",
        title: "Ops!",
        description:
          error.message ||
          "Erro ao atualizar sua senha. Tente novamente mais tarde.",
      });
    }
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Erro!",
      description: "Erro ao atualizar sua senha. Tente novamente mais tarde.",
    });
  } finally {
    setLoading(false);
  }
};
