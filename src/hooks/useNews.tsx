"use client";

import { useState, useEffect } from "react";
import { NoticiasResponse } from "@/types/news.types";

export function useNews() {
  const [noticias, setNoticias] = useState<NoticiasResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNoticias = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/noticias");
      
      if (!response.ok) {
        throw new Error("Erro ao buscar notícias");
      }
      
      const data = await response.json();
      setNoticias(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const createNoticia = async (noticiaData: Omit<NoticiasResponse, "id">) => {
    try {
      const response = await fetch("/api/noticias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noticiaData),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar notícia");
      }

      const result = await response.json();
      await fetchNoticias(); // Recarregar dados
      return result;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Erro ao criar notícia");
    }
  };

  const updateNoticia = async (id: string, noticiaData: Partial<NoticiasResponse>) => {
    try {
      const response = await fetch(`/api/noticias/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noticiaData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar notícia");
      }

      await fetchNoticias(); // Recarregar dados
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Erro ao atualizar notícia");
    }
  };

  const deleteNoticia = async (id: string) => {
    try {
      const response = await fetch(`/api/noticias/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir notícia");
      }

      await fetchNoticias(); // Recarregar dados
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Erro ao excluir notícia");
    }
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  return {
    noticias,
    loading,
    error,
    fetchNoticias,
    createNoticia,
    updateNoticia,
    deleteNoticia,
  };
} 