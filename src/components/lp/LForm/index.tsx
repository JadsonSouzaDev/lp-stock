"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentProps, FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MoneyInput from "@/components/ui/money-input";

export type FormField = {
  label: string;
  id: string;
  type: string;
  defaultValue: string | number;
  isCurrency?: boolean;
  schema?: z.ZodType<any, any, any>;
};

type LFormProps = {
  fields: FormField[];
  buttonTexts: { default: string; loading: string };
  onSubmit: (data: any) => void;
  loading?: boolean;
} & ComponentProps<"form">;

const LForm: FC<LFormProps> = ({
  className,
  fields,
  buttonTexts,
  onSubmit,
  loading,
}) => {
  const schema = z.object(
    fields.reduce((acc, field) => {
      if (field.schema) {
        acc[field.id] = field.schema;
      }
      return acc;
    }, {} as { [key: string]: z.ZodType<any, any, any> })
  );

  const form = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {fields.map((field) =>
          field.isCurrency ? (
            <MoneyInput
              key={field.id}
              form={form}
              label={field.label}
              name={field.id}
              placeholder="R$ 0,00"
            />
          ) : (
            <FormField
              key={field.id}
              control={form.control}
              defaultValue={field.defaultValue}
              name={field.id}
              render={({ field: controlledField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Input
                      {...controlledField}
                      type={field.type}
                      onChange={(e) => {
                        if (field.type === "number") {
                          controlledField.onChange(parseFloat(e.target.value));
                        } else {
                          controlledField.onChange(e.target.value);
                        }
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          )
        )}
        <div className="flex justify-center pt-3">
          <Button disabled={loading} type="submit" className="w-full">
            {loading ? buttonTexts.loading : buttonTexts.default}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LForm;
