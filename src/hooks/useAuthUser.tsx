// hooks/useAuthUser.ts
"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase-client";

// Define a interface para o formato de usuário que seu componente espera
export interface UserData {
  name: string;
  email: string;
  avatar: string;
}

interface AuthHookState {
  user: UserData | null;
  loading: boolean;
}

export function useAuthUser(): AuthHookState {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Este listener é chamado uma vez no início e depois em cada mudança de estado.
    // É essencial para gerenciar o estado de autenticação de forma reativa.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setLoading(false); // Uma vez que a verificação inicial terminou, definimos loading como false
    });

    // A função de retorno de useEffect limpa o listener quando o componente é desmontado,
    // prevenindo vazamentos de memória e comportamentos inesperados.
    return () => unsubscribe();
  }, []); // O array de dependências vazio garante que o efeito só rode uma vez na montagem.

  // Mapeia o objeto FirebaseUser para o UserData que o componente NavUser espera.
  // Garante que 'avatar' seja sempre string e fornece fallbacks.
  const mappedUser: UserData | null = firebaseUser
    ? {
        name: firebaseUser.displayName || "Usuário Não Definido", // Fallback mais descritivo
        email: firebaseUser.email || "email.nao.disponivel@exemplo.com", // Fallback
        avatar: firebaseUser.photoURL || "/images/default-avatar.png", // Imagem padrão
      }
    : null;

  return { user: mappedUser, loading };
}
