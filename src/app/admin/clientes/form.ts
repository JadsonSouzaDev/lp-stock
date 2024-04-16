import { z } from "zod";

import { FormField } from "@/components/lp/LForm";

export const modifyFormFields: FormField[] = [
  {
    label: "Nome",
    className: "col-span-3",
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
    label: "Email",
    className: "col-span-2",
    id: "email",
    type: "email",
    defaultValue: "",
    schema: z
      .string({
        required_error: "O email deve ser informado",
        invalid_type_error: "O email deve ser informado",
      })
      .email("O email informado é inválido"),
  },
  {
    label: "Telefone",
    className: "col-span-1",
    id: "phone",
    type: "tel",
    defaultValue: "",
    schema: z
      .string({
        required_error: "O telefone deve ser informado",
        invalid_type_error: "O telefone deve ser informado",
      })
      .min(11, "O telefone deve ter no mínimo 11 caracteres"),
  },
];
