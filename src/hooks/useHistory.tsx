import { useState, useEffect } from "react";
import { HistoryType } from "@/constants/historyData";

export function useHistory() {
  const [histories, setHistories] = useState<HistoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("/api/history");
        if (!response.ok) {
          throw new Error("Erro ao buscar histórias");
        }
        
        const data: HistoryType[] = await response.json();
        setHistories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        console.error("Erro ao buscar histórias:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistories();
  }, []);

  return { histories, loading, error };
} 