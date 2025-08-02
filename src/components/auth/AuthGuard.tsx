"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/useAuthUser"; // Seu custom hook de autenticação
import { toast } from "sonner";
import LoadingTransparent from "../loading/loading-overlay";

interface AuthGuardProps {
  children: React.ReactNode;
  // Opcional: Adicione um prop para roles/permissões se for necessário
  // requiredRole?: 'admin' | 'editor';
}

export function AuthGuard({ children /*, requiredRole */ }: AuthGuardProps) {
  const router = useRouter();
  const { user, loading } = useAuthUser();

  useEffect(() => {
    // Só age quando o carregamento inicial termina
    if (!loading) {
      if (!user) {
        // Usuário não logado
        toast.error("Você precisa estar logado para acessar esta página.", {
          duration: 2000,
        });
        router.replace("/login"); // Redireciona para a página de login
      }
      // Opcional: Lógica de permissão
      /*
      else if (requiredRole && user.role !== requiredRole) {
        toast.error('Você não tem permissão para acessar esta página.', { duration: 4000 });
        router.replace('/dashboard'); // Redireciona para uma página que o usuário tem acesso
      }
      */
    }
  }, [user, loading, router /*, requiredRole */]); // Dependências do useEffect

  if (loading) {
    // Renderiza um estado de carregamento enquanto verifica a autenticação
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoadingTransparent />
      </div>
    );
  }

  // Se o usuário está logado (e tem permissão, se aplicável), renderiza o conteúdo
  if (user /* && (!requiredRole || user.role === requiredRole) */) {
    return <>{children}</>;
  }

  // Se não está carregando, não tem usuário e já tentou redirecionar,
  // ou não tem permissão, apenas não renderiza o children (ou pode renderizar uma mensagem)
  return null;
}
