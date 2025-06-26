"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { registerSchema } from "@/schemas/login-schema";

type RegisterFormData = {
  username: string;
  email: string;
  passwordValues: {
    password: string;
    confirmPassword: string;
  };
};

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Crie sua conta</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Preencha os campos abaixo para criar uma conta.
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="email">Nome</Label>
          <Input
            type="text"
            id="username"
            {...register("username")}
            className={`${errors.username ? "border-red-500" : ""}`}
          />
          <p className="text-red-500 text-xs">{errors.username?.message}</p>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">E-mail</Label>
          <Input
            placeholder="m@example.com"
            type="email"
            id="email"
            {...register("email")}
            className={`${errors.email ? "border-red-500" : ""}`}
          />
          <p className="text-red-500 text-xs">{errors.email?.message}</p>
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
          </div>
          <div className="relative w-full">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              {...register("passwordValues.password")}
              className={`${
                errors.passwordValues?.password ? "border-red-500" : ""
              }`}
            />
            {showPassword ? (
              <Eye
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <EyeOff
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          <p className="text-red-500 text-xs">
            {errors.passwordValues?.password?.message}
          </p>
        </div>
        <div className="grid gap-3">
          <div className="flex items-center mt-3">
            <Label htmlFor="confirmPassword">Confirmar senha</Label>
          </div>
          <div className="relative w-full">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              {...register("passwordValues.confirmPassword")}
              className={`${
                errors.passwordValues?.confirmPassword ? "border-red-500" : ""
              }`}
            />
            {showConfirmPassword ? (
              <Eye
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            ) : (
              <EyeOff
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            )}
          </div>
          <p className="text-red-500 text-xs">
            {errors.passwordValues?.confirmPassword?.message}
            {errors.passwordValues?.message}
          </p>
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-black mt-3"
        >
          Registrar
        </Button>
      </div>
      <div className="text-center text-sm">
        Já possui uma conta?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Acesse aqui.
        </Link>
      </div>
    </form>
  );
}
