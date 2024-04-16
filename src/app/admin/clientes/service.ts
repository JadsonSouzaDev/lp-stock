import { Dispatch, SetStateAction } from "react";

import { toast } from "@/components/ui/use-toast";
import { User } from "@/types/user";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/user`;

const getUsers = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  setData: Dispatch<SetStateAction<User[]>>
) => {
  try {
    setLoading(true);
    const response = await fetch(API_URL, { next: { revalidate: 30 } });
    if (response.ok) {
      const data: User[] = await response.json();
      setData(data);
    }
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Erro!",
      description: `Erro ao buscar clientes!`,
    });
  } finally {
    setLoading(false);
  }
};

export const onModifyUser = async (
  user: User,
  setLoadingModify: Dispatch<SetStateAction<boolean>>,
  setLoadingData: Dispatch<SetStateAction<boolean>>,
  setOpenDialog: Dispatch<SetStateAction<boolean>>,
  setData: Dispatch<SetStateAction<User[]>>,
  isUpdate: boolean
) => {
  try {
    setLoadingModify(true);
    const response = await fetch(API_URL, {
      method: isUpdate ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      toast({
        variant: "success",
        title: "Sucesso!",
        description: `O cliente ${user.name} foi ${
          isUpdate ? "atualizado" : "criado"
        } com sucesso!`,
      });
      setOpenDialog(false);
      await getUsers(setLoadingData, setData);
    } else {
      const error = (await response.json()) as { message: string };
      toast({
        variant: "alert",
        title: "Ops!",
        description:
          error.message ||
          `Erro ao ${isUpdate ? "atualizar" : "criar"} o cliente ${user.name}!`,
      });
    }
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Erro!",
      description: `Erro ao  ${isUpdate ? "atualizar" : "criar"} o cliente ${
        user.name
      }!`,
    });
  } finally {
    setLoadingModify(false);
  }
};

export const onDeleteUser = async (
  id: string,
  setLoadingModify: Dispatch<SetStateAction<boolean>>,
  setLoadingData: Dispatch<SetStateAction<boolean>>,
  setOpenDialog: Dispatch<SetStateAction<boolean>>,
  setData: Dispatch<SetStateAction<User[]>>
) => {
  try {
    setLoadingModify(true);
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      toast({
        variant: "success",
        title: "Sucesso!",
        description: `O cliente foi excluído com sucesso!`,
      });
      setOpenDialog(false);
      await getUsers(setLoadingData, setData);
    } else {
      toast({
        variant: "alert",
        title: "Erro!",
        description: `Erro ao excluir o cliente!`,
      });
    }
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Erro!",
      description: `Erro ao excluir o cliente!`,
    });
  } finally {
    setLoadingModify(false);
  }
};
