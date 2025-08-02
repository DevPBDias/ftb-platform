import { useState, useEffect } from "react";
import { MemberFederation } from "@/types/cards.types";

export function useMembers() {
  const [members, setMembers] = useState<MemberFederation[]>([]);
  const [mentions, setMentions] = useState<MemberFederation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("/api/members");
        if (!response.ok) {
          throw new Error("Erro ao buscar membros");
        }
        
        const data: MemberFederation[] = await response.json();
        
        // Separar membros e menções honrosas
        const membersData = data.filter(item => item.category === "member");
        const mentionsData = data.filter(item => item.category === "mention");
        
        setMembers(membersData);
        setMentions(mentionsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        console.error("Erro ao buscar membros:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return { members, mentions, loading, error };
} 