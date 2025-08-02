import { useState, useEffect } from "react";
import { TeamData } from "@/types/teams";

export function useClubes() {
  const [clubes, setClubes] = useState<TeamData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar todos os clubes
  const fetchClubes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch("/api/clubes");
      if (!response.ok) {
        throw new Error("Falha ao buscar clubes");
      }
      
      const data = await response.json();
      setClubes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  // Criar novo clube
  const createClube = async (clubeData: Omit<TeamData, "id">) => {
    try {
      const response = await fetch("/api/clubes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clubeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao criar clube");
      }

      const result = await response.json();
      await fetchClubes(); // Recarregar lista
      return result;
    } catch (err) {
      throw err;
    }
  };

  // Atualizar clube
  const updateClube = async (id: string, clubeData: Partial<TeamData>) => {
    try {
      const response = await fetch(`/api/clubes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clubeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao atualizar clube");
      }

      await fetchClubes(); // Recarregar lista
    } catch (err) {
      throw err;
    }
  };

  // Deletar clube
  const deleteClube = async (id: string) => {
    try {
      const response = await fetch(`/api/clubes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao deletar clube");
      }

      await fetchClubes(); // Recarregar lista
    } catch (err) {
      throw err;
    }
  };

  // Buscar clube específico
  const getClubeById = async (id: string): Promise<TeamData | null> => {
    try {
      const response = await fetch(`/api/clubes/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error("Falha ao buscar clube");
      }
      
      return await response.json();
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchClubes();
  }, []);

  return {
    clubes,
    loading,
    error,
    createClube,
    updateClube,
    deleteClube,
    getClubeById,
    refetch: fetchClubes,
  };
} 