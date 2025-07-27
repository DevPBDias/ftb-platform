// src/hooks/useFetchById.ts (exemplo)
"use client";

import { useEffect, useState } from "react";

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetchById<T>(
  collectionName: string,
  id: string
): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Esta é a linha crítica. O endpoint da API deve estar correto!
        // Por exemplo, se você quer buscar um clube, o endpoint deve ser /api/clubes/[id]
        const response = await fetch(`/api/${collectionName}/${id}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `Erro ao buscar ${collectionName}.`
          );
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      // Só busca se o ID for válido
      fetchData();
    }
  }, [collectionName, id]);

  return { data, loading, error };
}
