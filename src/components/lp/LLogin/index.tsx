"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
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

const loginSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

export type LoginData = {
  username: string;
  password: string;
};

const LLogin = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    const result = await signIn("credentials", { redirect: false, ...data });

    if (result?.error) {
    } else {
      const session = await getSession();
      const user = session?.user as { isAdmin?: boolean };
      router.push(user?.isAdmin ? "/admin/dashboard" : "/");
    }
  };

  return (
    <Card className="w-full border-none shadow-none">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle className="flex flex-col items-center text-amber-800">
            <Logo className="w-20 -mb-5 h-20" />
            <LogoText className="w-24 h-24" />
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 -mt-5">
          <div className="grid gap-2 min-w-96">
            <Label className="text-muted-foreground" htmlFor="username">
              E-mail
            </Label>
            <Input
              id="username"
              type="email"
              placeholder="seuemail@email.com"
              {...register("username", { required: true })}
              error={errors.username?.message?.toString()}
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

          <div className="flex gap-1 items-center justify-end">
            <p className="text-sm text-gray-500">Esqueceu sua senha?</p>
            <a href="#" className="text-sm text-amber-800">
              Recupere-a
            </a>
          </div>
        </CardContent>
        <CardFooter className="pb-6">
          <Button className="w-full bg-amber-800" type="submit">
            Entrar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LLogin;
