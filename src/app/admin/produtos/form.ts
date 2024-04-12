import { z } from "zod";

import { FormField } from "@/components/lp/LForm";

export const modifyFormFields: FormField[] = [
  {
    label: "Nome",
    id: "name",
    type: "text",
    defaultValue: "",
    schema: z
      .string({
        required_error: "O nome deve ser informado",
        invalid_type_error: "O nome deve ser informado",
      })
      .min(3, "O nome deve ter no mínimo 3 caracteres"),
  },
  {
    label: "Código de barras",
    id: "barcode",
    type: "text",
    defaultValue: "",
    schema: z
      .string({
        required_error: "O código de barras deve ser informado",
        invalid_type_error: "O código de barras deve ser informado",
      })
      .min(3, "O código de barras deve ter no mínimo 3 caracteres"),
  },
  {
    label: "Preço de compra",
    id: "purchase_price",
    type: "number",
    defaultValue: 0,
    isCurrency: true,
    schema: z
      .number({
        required_error: "O preço de compra deve ser informado",
        invalid_type_error: "O preço de compra deve ser um montante válido",
      })
      .positive("O preço de compra deve ser maior que zero"),
  },
  {
    label: "Preço de venda",
    id: "sale_price",
    type: "number",
    defaultValue: 0,
    isCurrency: true,
    schema: z
      .number({
        required_error: "O preço de venda deve ser informado",
        invalid_type_error: "O preço de venda deve ser informado",
      })
      .positive("O preço de venda deve ser maior que zero"),
  },
  {
    label: "Quantidade",
    id: "quantity",
    type: "number",
    defaultValue: 1,
    schema: z
      .number({
        required_error: "A quantidade de produtos deve ser informada",
        invalid_type_error: "A quantidade de produtos deve ser informada",
      })
      .positive("A quantidade deve ser um maior que zero"),
  },
  {
    label: "Categoria",
    id: "category",
    type: "text",
    defaultValue: "",
    schema: z.string().min(3, "A categoria deve ter no mínimo 3 caracteres"),
  },
  {
    label: "Imagem",
    id: "url_image",
    type: "text",
    defaultValue: "",
    isUpload: true,
    schema: z.string().min(3, "A url da imagem deve ser informada"),
  },
];
