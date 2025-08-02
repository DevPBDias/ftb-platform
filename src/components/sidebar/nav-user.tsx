"use client";

import { LogOut, LogIn } from "lucide-react"; // Importe LogIn para o botão de login
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useState } from "react"; // useState para o estado de logoutLoading
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase-client";
import { useAuthUser } from "@/hooks/useAuthUser"; // Seu custom hook
import LoadingTransparent from "../loading/loading-overlay";

export function NavUser() {
  const router = useRouter(); // Hook 1: useRouter
  const [logoutLoading, setLogoutLoading] = useState(false); // Hook 2: useState
  const { user, loading } = useAuthUser(); // Hook 3: useAuthUser (que internamente usa useState e useEffect)

  // A lógica de hooks deve vir ANTES de qualquer return condicional.
  // Ou seja, todos os 'useSomething()' precisam ser chamados aqui em cima.

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await signOut(auth);
      router.push("/");
      // Redireciona para a home ou página de login
    } catch (error) {
      console.error("Erro ao deslogar:", error);
      // Opcional: Mostrar uma notificação para o usuário sobre o erro
    } finally {
      setLogoutLoading(false);
    }
  };

  // 1. Estado de Carregamento Inicial do Usuário
  if (loading) return <LoadingTransparent />;

  // 2. Estado Sem Usuário Logado
  if (!user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="hover:bg-transparent"
            onClick={() => router.push("/login")} // Exemplo de rota de login
          >
            <div className="flex items-center space-x-2">
              <LogIn size={18} /> {/* Ícone de login */}
              <span>Fazer Login</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  // 3. Estado Com Usuário Logado (Renderização Principal)
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-transparent"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">
              {user.name ? user.name.charAt(0).toUpperCase() : "CN"}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
          <div
            onClick={handleLogout}
            className={`size-8 border border-gray-300 flex items-center justify-center rounded-lg cursor-pointer
                        ${
                          logoutLoading
                            ? "bg-gray-200 cursor-not-allowed"
                            : "hover:bg-gray-300"
                        }`}
          >
            {logoutLoading ? (
              // Spinner simples com Tailwind para o estado de logout
              <svg
                className="animate-spin h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <LogOut size={18} />
            )}
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
