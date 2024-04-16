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
import MoneyInput from "@/components/ui/money-input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { LUpload } from "..";

export type FormField = {
  label: string;
  id: string;
  type: string;
  defaultValue: string | number | boolean;
  isCurrency?: boolean;
  isUpload?: boolean;
  isSwitch?: boolean;
  isLongText?: boolean;
  schema?: z.ZodType<any, any, any>;
  className?: string;
};

type LFormProps<Type> = {
  fields: FormField[];
  buttonTexts: { default: string; loading: string };
  onSubmit: (data: Type) => void;
  loading?: boolean;
  initialValue?: Type;
  gridCols?: number;
};

function LForm<Type>({
  fields,
  buttonTexts,
  onSubmit,
  loading,
  initialValue = {} as Type,
  gridCols = 1,
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
        className={`gap-3 grid grid-flow-row grid-cols-${gridCols} w-full justify-center items-start`}
      >
        {fields.map((field) =>
          field.isCurrency ? (
            <div key={field.id} className={field.className}>
              <MoneyInput
                form={form}
                label={field.label}
                name={field.id}
                placeholder="R$ 0,00"
              />
            </div>
          ) : (
            <FormField
              key={field.id}
              control={form.control}
              //defaultValue={field.defaultValue}
              name={field.id}
              render={({ field: controlledField }) => (
                <FormItem className={field.className}>
                  {!field.isSwitch && <FormLabel>{field.label}</FormLabel>}
                  <FormControl>
                    {field.isSwitch ? (
                      <div className="flex flex-col">
                        <FormLabel
                          htmlFor={controlledField.name}
                          className="mb-6"
                        >
                          {field.label}
                        </FormLabel>
                        <Switch
                          {...controlledField}
                          checked={controlledField.value}
                          onCheckedChange={controlledField.onChange}
                        />
                      </div>
                    ) : field.isUpload ? (
                      <LUpload
                        {...controlledField}
                        onChange={(e) => {
                          controlledField.onChange(e.target.value);
                        }}
                      />
                    ) : field.isLongText ? (
                      <Textarea
                        {...controlledField}
                        onChange={(e) => {
                          controlledField.onChange(e.target.value);
                        }}
                        className="w-full h-32 p-2 border border-gray-300 rounded-md"
                      />
                    ) : (
                      <Input
                        {...controlledField}
                        type={field.type}
                        onChange={(e) => {
                          e.preventDefault();
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
        <div className={`flex justify-center pt-3 col-span-${gridCols}`}>
          <Button disabled={loading} type="submit" className="w-full">
            {loading ? buttonTexts.loading : buttonTexts.default}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default LForm;
