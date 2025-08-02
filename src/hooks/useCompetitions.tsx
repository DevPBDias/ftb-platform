"use client";

import { useState, useEffect } from "react";
import { CompeticaoData } from "@/types/new-competition";

export function useCompetitions() {
  const [competicoes, setCompeticoes] = useState<CompeticaoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompeticoes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/competicoes");
      
      if (!response.ok) {
        throw new Error("Erro ao buscar competições");
      }
      
      const data = await response.json();
      setCompeticoes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const createCompeticao = async (competicaoData: Omit<CompeticaoData, "id">) => {
    try {
      const response = await fetch("/api/competicoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(competicaoData),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar competição");
      }

      const result = await response.json();
      await fetchCompeticoes(); // Recarregar dados
      return result;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Erro ao criar competição");
    }
  };

  const updateCompeticao = async (id: string, competicaoData: Partial<CompeticaoData>) => {
    try {
      const response = await fetch(`/api/competicoes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(competicaoData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar competição");
      }

      await fetchCompeticoes(); // Recarregar dados
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Erro ao atualizar competição");
    }
  };

  const deleteCompeticao = async (id: string) => {
    try {
      const response = await fetch(`/api/competicoes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir competição");
      }

      await fetchCompeticoes(); // Recarregar dados
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Erro ao excluir competição");
    }
  };

  useEffect(() => {
    fetchCompeticoes();
  }, []);

  return {
    competicoes,
    loading,
    error,
    fetchCompeticoes,
    createCompeticao,
    updateCompeticao,
    deleteCompeticao,
  };
} 