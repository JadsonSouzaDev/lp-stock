import { z } from "zod";

import { FormField } from "@/components/lp/LForm";
import { User } from "@/types/user";

export const getFormFields = (user: User): FormField[] => {
  return [
    {
      type: "text",
      label: "Nome",
      id: "name",
      defaultValue: user.name,
      schema: z
        .string()
        .min(3, "O nome deve ter pelo menos 3 caracteres")
        .max(255, "Nome muito longo"),
    },
    {
      type: "email",
      label: "E-mail",
      id: "email",
      defaultValue: user.email,
      schema: z.string().email().max(255, "E-mail muito longo"),
    },
    {
      type: "text",
      label: "Telefone",
      id: "phone",
      defaultValue: user.phone,
      schema: z
        .string()
        .min(11, "O telefone deve conter 11 digitos")
        .max(11, "O telefone deve conter 11 digitos"),
    },
  ];
};
