"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { userSchema } from "@/schemas/login-schema";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase-client";

type UserFormData = {
  email: string;
  password: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { handleSubmit } = useForm({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: UserFormData) => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      const docRef = doc(db, "allowUsers", user.email!);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setError("Usuário não autorizado. Entre em contato com o suporte.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (err: any) {
      console.error("Erro ao fazer login:", err);
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setError("E-mail ou senha inválidos.");
      } else if (err.code === "auth/invalid-email") {
        setError("Formato de e-mail inválido.");
      } else {
        setError("Ocorreu um erro ao tentar fazer login. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "allowUsers", user.email!);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await auth.signOut();
        setError(
          "Usuário não autorizado via Google. Entre em contato com o suporte."
        );
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (err: any) {
      console.error("Erro ao fazer login com Google:", err);
      setError(
        "Ocorreu um erro ao tentar fazer login com Google. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Entre na sua conta</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Acesse sua conta para gerenciar os recursos do site.
        </p>
      </div>
      <div className="grid gap-6">
        <Button
          variant="outline"
          className="w-full cursor-pointer"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="mr-2 h-4 w-4"
          >
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Entrar com Google
        </Button>
        <p className="text-red-500 text-xs">{error}</p>
      </div>
    </form>
  );
}
