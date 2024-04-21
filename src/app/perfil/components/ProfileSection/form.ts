import { z } from "zod";

import { FormField } from "@/components/lp/LForm";
import { User } from "@/types/user";

export const getProfileFields = (user: User): FormField[] => {
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

export const passwordFields: FormField[] = [
  {
    type: "password",
    label: "Senha atual",
    id: "currentPassword",
    defaultValue: "",
    schema: z.string().min(1, "Informe sua senha antiga"),
  },
  {
    type: "password",
    label: "Nova senha",
    id: "newPassword",
    defaultValue: "",
    schema: z.string().min(6, "Senha muito curta"),
  },
  {
    type: "password",
    label: "Confirmar nova senha",
    id: "confirmPassword",
    defaultValue: "",
    schema: z.string().min(6, "Senha muito curta"),
  },
];

export const passwordRefine = {
  validate: (data: { [x: string]: any }) =>
    data.newPassword === data.confirmPassword,
  message: { message: "Senhas não conferem", path: ["confirmPassword"] },
};
