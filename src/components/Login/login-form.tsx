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
import { userSchema } from "@/schemas/login-schema";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Entre na sua conta</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Acesse sua conta para usar mais recursos.
        </p>
      </div>
      <div className="grid gap-6">
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
            <Link
              href="/new-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu a senha?
            </Link>
          </div>
          <div className="relative w-full">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              {...register("password")}
              className={`${errors.password ? "border-red-500" : ""}`}
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
          <p className="text-red-500 text-xs">{errors.password?.message}</p>
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          Entrar
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Ou continue com
          </span>
        </div>
        <Button variant="outline" className="w-full cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Entrar com Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Não possui uma conta?{" "}
        <Link href="/register" className="underline underline-offset-4">
          Acesse aqui.
        </Link>
      </div>
    </form>
  );
}
