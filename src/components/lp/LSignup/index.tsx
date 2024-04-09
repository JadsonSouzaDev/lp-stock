"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, use, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Logo, LogoText } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const signupSchema = z.object({
  name: z.string().min(3, "Digite um nome com no mínimo 3 caracteres"),
  email: z.string().email("Digite um e-mail válido"),
  phone: z.string().min(11, "Digite um número com no mínimo 11 caracteres"),
  password: z.string().min(8, "Digite uma senha com no mínimo 8 caracteres"),
});

export type SignupData = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

const LSignup: FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupData> = async (data) => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/login");
        toast({
          variant: "success",
          title: "Sucesso!",
          description: "Cadastro realizado com sucesso",
        });
      } else {
        const error = await response.json();

        toast({
          variant: "alert",
          title: "Ops!",
          description: error.message,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro!",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full border-none shadow-none">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader className="p-0 md:p-6">
          <CardTitle className="flex flex-col items-center text-amber-800">
            <Logo className="w-20 -mb-5 h-20" />
            <LogoText className="w-24 h-24" />
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 -mt-5 px-0 py-6 md:px-6">
          <div className="grid gap-2 min-w-full md:min-w-96">
            <Label className="text-muted-foreground" htmlFor="name">
              Nome completo
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Digite seu nome completo"
              {...register("name", { required: true })}
              error={errors.name?.message?.toString()}
            />
          </div>
          <div className="grid gap-2 min-w-full md:min-w-96">
            <Label className="text-muted-foreground" htmlFor="email">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              {...register("email", { required: true })}
              error={errors.email?.message?.toString()}
            />
          </div>
          <div className="grid gap-2 min-w-full md:min-w-96">
            <Label className="text-muted-foreground" htmlFor="phone">
              Whatsapp ou celular (apenas numeros)
            </Label>
            <Input
              id="phone"
              type="number"
              placeholder="Digite seu whatsapp ou celular"
              {...register("phone", { required: true })}
              error={errors.phone?.message?.toString()}
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-muted-foreground" htmlFor="password">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              {...register("password", { required: true })}
              error={errors.password?.message?.toString()}
            />
          </div>
        </CardContent>
        <CardFooter className="pb-6">
          <Button
            disabled={loading}
            className="w-full bg-amber-800 hover:bg-amber-700"
            type="submit"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
export default LSignup;
