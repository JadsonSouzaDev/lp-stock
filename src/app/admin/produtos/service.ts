import { Dispatch, SetStateAction } from "react";

import { toast } from "@/components/ui/use-toast";
import { Product } from "@/types/product";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/product`;

const getProducts = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  setData: Dispatch<SetStateAction<Product[]>>
) => {
  try {
    setLoading(true);
    const response = await fetch(API_URL, { next: { revalidate: 30 } });
    if (response.ok) {
      const data: Product[] = await response.json();
      setData(data);
    }
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Erro!",
      description: `Erro ao buscar produtos!`,
    });
  } finally {
    setLoading(false);
  }
};

export const onModifyProduct = async (
  product: Product,
  setLoadingModify: Dispatch<SetStateAction<boolean>>,
  setLoadingData: Dispatch<SetStateAction<boolean>>,
  setOpenDialog: Dispatch<SetStateAction<boolean>>,
  setData: Dispatch<SetStateAction<Product[]>>,
  isUpdate: boolean
) => {
  try {
    setLoadingModify(true);
    const response = await fetch(API_URL, {
      method: isUpdate ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (response.ok) {
      toast({
        variant: "success",
        title: "Sucesso!",
        description: `O produto ${product.name} foi ${
          isUpdate ? "atualizado" : "criado"
        } com sucesso!`,
      });
      setOpenDialog(false);
      await getProducts(setLoadingData, setData);
    } else {
      toast({
        variant: "alert",
        title: "Erro!",
        description:
          response.statusText ||
          `Erro ao ${isUpdate ? "atualizar" : "criar"} o produto ${
            product.name
          }!`,
      });
    }
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Erro!",
      description: `Erro ao  ${isUpdate ? "atualizar" : "criar"} o produto ${
        product.name
      }!`,
    });
  } finally {
    setLoadingModify(false);
  }
};

export const onDeleteProduct = async (
  id: string,
  setLoadingModify: Dispatch<SetStateAction<boolean>>,
  setLoadingData: Dispatch<SetStateAction<boolean>>,
  setOpenDialog: Dispatch<SetStateAction<boolean>>,
  setData: Dispatch<SetStateAction<Product[]>>
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
        description: `O produto foi excluído com sucesso!`,
      });
      setOpenDialog(false);
      await getProducts(setLoadingData, setData);
    } else {
      toast({
        variant: "alert",
        title: "Erro!",
        description: `Erro ao excluir o produto!`,
      });
    }
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Erro!",
      description: `Erro ao excluir o produto!`,
    });
  } finally {
    setLoadingModify(false);
  }
};
