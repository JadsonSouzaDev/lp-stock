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
];
