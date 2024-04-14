"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
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
import { Label } from "@/components/ui/label";
import MoneyInput from "@/components/ui/money-input";
import { Switch } from "@/components/ui/switch";

import { LUpload } from "..";

export type FormField = {
  label: string;
  id: string;
  type: string;
  defaultValue: string | number;
  isCurrency?: boolean;
  isUpload?: boolean;
  isSwitch?: boolean;
  schema?: z.ZodType<any, any, any>;
};

type LFormProps<Type> = {
  fields: FormField[];
  buttonTexts: { default: string; loading: string };
  onSubmit: (data: Type) => void;
  loading?: boolean;
  initialValue?: Type;
};

function LForm<Type>({
  fields,
  buttonTexts,
  onSubmit,
  loading,
  initialValue = {} as Type,
}: LFormProps<Type>) {
  const schema = z.object(
    fields.reduce((acc, field) => {
      if (field.schema) {
        acc[field.id] = field.schema;
      }
      return acc;
    }, {} as { [key: string]: z.ZodType<any, any, any> })
  );

  const defaultValues = fields.reduce((values, field) => {
    values[field.id] =
      (initialValue as Record<string, any>)[field.id] || field.defaultValue;
    values[field.id] = field.isCurrency ? +values[field.id] : values[field.id];
    return values;
  }, {} as Record<string, any>);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data: FieldValues) =>
          onSubmit(data as Type)
        )}
        className="space-y-3"
      >
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
              //defaultValue={field.defaultValue}
              name={field.id}
              render={({ field: controlledField }) => (
                <FormItem>
                  {!field.isSwitch && <FormLabel>{field.label}</FormLabel>}
                  <FormControl>
                    {field.isSwitch ? (
                      <div className="flex items-center space-x-2">
                        <Switch
                          {...controlledField}
                          checked={controlledField.value}
                          onCheckedChange={controlledField.onChange}
                        />
                        <FormLabel htmlFor={controlledField.name}>
                          {field.label}
                        </FormLabel>
                      </div>
                    ) : field.isUpload ? (
                      <LUpload
                        {...controlledField}
                        onChange={(e) => {
                          controlledField.onChange(e.target.value);
                        }}
                      />
                    ) : (
                      <Input
                        {...controlledField}
                        type={field.type}
                        onChange={(e) => {
                          if (field.type === "number") {
                            controlledField.onChange(
                              parseFloat(e.target.value)
                            );
                          } else {
                            controlledField.onChange(e.target.value);
                          }
                        }}
                      />
                    )}
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
}

export default LForm;
