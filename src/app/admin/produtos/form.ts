import { z } from "zod";

import { FormField } from "@/components/lp/LForm";

export const modifyFormFields: FormField[] = [
  {
    label: "Nome",
    className: "col-span-6",
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
    label: "Descrição",
    className: "col-span-6",
    id: "description",
    type: "text",
    isLongText: true,
    defaultValue: "",
    schema: z
      .string({
        required_error: "A descrição deve ser informada",
        invalid_type_error: "A descrição deve ser informada",
      })
      .min(3, "A descrição deve ter no mínimo 3 caracteres"),
  },
  {
    label: "Código de barras",
    className: "col-span-3",
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
    label: "Quantidade",
    id: "quantity",
    className: "col-span-3",
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
    label: "Autor ou Marca",
    id: "author",
    className: "col-span-2",
    type: "text",
    defaultValue: "",
    schema: z
      .string({
        required_error: "O autor deve ser informado",
        invalid_type_error: "O autor deve ser informado",
      })
      .min(3, "O autor deve ter no mínimo 3 caracteres"),
  },
  {
    label: "Tipo",
    id: "type",
    type: "text",
    defaultValue: "",
    className: "col-span-2",
    schema: z
      .string({
        required_error: "O tipo deve ser informado",
        invalid_type_error: "O tipo deve ser informado",
      })
      .min(3, "O tipo deve ter no mínimo 3 caracteres"),
  },
  {
    label: "Categoria",
    className: "col-span-2",
    id: "category",
    type: "text",
    defaultValue: "",
    schema: z.string().min(3, "A categoria deve ter no mínimo 3 caracteres"),
  },
  {
    label: "Preço de compra",
    className: "col-span-2",
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
    className: "col-span-2",
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
    label: "Promoção",
    id: "is_promotion",
    className: "col-span-2",
    isSwitch: true,
    type: "text",
    defaultValue: false,
    schema: z.boolean({
      required_error: "Informe se o produto está em promoção",
      invalid_type_error: "Tipo invalido para promoção",
    }),
  },
  {
    label: "Imagem",
    className: "col-span-6",
    id: "url_image",
    type: "text",
    defaultValue: "",
    isUpload: true,
    schema: z.string().min(3, "A url da imagem deve ser informada"),
  },
];
