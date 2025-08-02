"use client";

import type React from "react";
import {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { toast } from "sonner"; // Importar toast do sonner
import { StaticImageData } from "next/image"; // Importar StaticImageData

// Definindo os tipos ItemType e ItemData
export type ItemType = "noticia" | "competicao" | "ambos";

// Interface base para os dados, comum entre NoticiaData e CompeticaoData
interface BaseItemData {
  id: string; // ID agora é obrigatório para itens no contexto
  titulo: string;
  descricao: string;
  datas: string[]; // Ex: ["2023-10-26", "2023-10-27"]
  local: string;
  image?: string | StaticImageData; // Alterado para incluir StaticImageData
}

// Interfaces específicas
export interface NoticiaData extends BaseItemData {
  // Adicione propriedades específicas de Noticia se houver
}

export interface CompeticaoData extends BaseItemData {
  // Adicione propriedades específicas de Competicao se houver
}

// ItemData será a união de NoticiaData e CompeticaoData, com um campo 'type' para diferenciação
export type ItemData =
  | (NoticiaData & { type: "noticia" })
  | (CompeticaoData & { type: "competicao" });

// --- Funções de API (helpers) ---

// Função para buscar itens da API (sem filtros de busca ou data)
async function fetchItems(type: ItemType): Promise<ItemData[]> {
  let noticias: NoticiaData[] = [];
  let competicoes: CompeticaoData[] = [];

  // Não há queryParams para search ou date, apenas para o tipo se necessário na API
  const queryParams = new URLSearchParams();

  try {
    if (type === "noticia" || type === "ambos") {
      const res = await fetch(`/api/noticias?${queryParams.toString()}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      noticias = await res.json();
    }

    if (type === "competicao" || type === "ambos") {
      const res = await fetch(`/api/competicoes?${queryParams.toString()}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      competicoes = await res.json();
    }

    let combinedItems: ItemData[] = [];
    if (type === "noticia") {
      combinedItems = noticias.map((item) => ({ ...item, type: "noticia" }));
    } else if (type === "competicao") {
      combinedItems = competicoes.map((item) => ({
        ...item,
        type: "competicao",
      }));
    } else {
      // "ambos"
      // Explicitamente tipar o 'type' para garantir que o TypeScript o reconheça como literal
      const typedNoticias: (NoticiaData & { type: "noticia" })[] = noticias.map(
        (item) => ({
          ...item,
          type: "noticia",
        })
      );
      const typedCompeticoes: (CompeticaoData & { type: "competicao" })[] =
        competicoes.map((item) => ({
          ...item,
          type: "competicao",
        }));
      combinedItems = [...typedNoticias, ...typedCompeticoes];
      // Ordenar por data (mais recente primeiro) se for "ambos"
      combinedItems.sort((a, b) => {
        const dateA =
          a.datas && a.datas.length > 0 ? new Date(a.datas[0]) : new Date(0);
        const dateB =
          b.datas && b.datas.length > 0 ? new Date(b.datas[0]) : new Date(0);
        return dateB.getTime() - dateA.getTime();
      });
    }

    return combinedItems;
  } catch (error) {
    console.error("Erro ao buscar itens:", error);
    throw new Error("Falha ao carregar itens.");
  }
}

// Função para atualizar um item via API
async function apiUpdateItem(
  id: string,
  type: ItemType,
  data: Partial<NoticiaData | CompeticaoData>
): Promise<void> {
  const url =
    type === "noticia" ? `/api/noticias/${id}` : `/api/competicoes/${id}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  }
}

// Função para deletar um item via API
async function apiDeleteItem(id: string, type: ItemType): Promise<void> {
  const url =
    type === "noticia" ? `/api/noticias/${id}` : `/api/competicoes/${id}`;
  const res = await fetch(url, {
    method: "DELETE",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  }
}

// --- Context Type Definition ---
interface NewsCompetitionsContextType {
  filters: {
    type: ItemType;
    // 'search' e 'date' foram removidos
  };
  items: ItemData[];
  loading: boolean;
  error: string | null;
  setTypeFilter: (type: ItemType) => void;
  // 'setSearchFilter' e 'setDateFilter' foram removidos
  clearFilters: () => void;
  updateItem: (
    id: string,
    type: ItemType,
    data: Partial<NoticiaData | CompeticaoData>
  ) => Promise<void>;
  deleteItem: (id: string, type: ItemType) => Promise<void>;
  refetchItems: () => Promise<void>;
}

const NewsCompetitionsContext = createContext<
  NewsCompetitionsContextType | undefined
>(undefined);

interface NewsCompetitionsProviderProps {
  children: React.ReactNode;
}

export function NewsCompetitionsProvider({
  children,
}: NewsCompetitionsProviderProps) {
  // Filter states
  const [filters, setFilters] = useState<{
    type: ItemType;
    // 'search' e 'date' foram removidos
  }>({
    type: "ambos",
  });

  // Data states
  const [items, setItems] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter actions
  const setTypeFilter = useCallback((type: ItemType) => {
    setFilters((prev) => ({ ...prev, type })); // Apenas atualiza o tipo
  }, []);

  // 'setSearchFilter' e 'setDateFilter' foram removidos

  const clearFilters = useCallback(() => {
    setFilters({
      type: "ambos",
    });
  }, []);

  // Data fetching and actions
  const loadItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Chamada a fetchItems sem os parâmetros de busca e data
      const fetchedItems = await fetchItems(filters.type);
      setItems(fetchedItems);
    } catch (err) {
      console.error("Failed to fetch items:", err);
      setError("Falha ao carregar itens. Tente novamente mais tarde.");
      toast.error("Falha ao carregar itens.");
    } finally {
      setLoading(false);
    }
  }, [filters]); // Depende apenas do filtro de tipo

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const updateItem = useCallback(
    async (
      id: string,
      type: ItemType,
      data: Partial<NoticiaData | CompeticaoData>
    ) => {
      try {
        await apiUpdateItem(id, type, data);
        toast.success("Item atualizado com sucesso!");
        await loadItems(); // Refetch all items to ensure consistency
      } catch (err: any) {
        console.error("Failed to update item:", err);
        toast.error(err.message || "Erro ao atualizar item.");
        throw new Error("Erro ao atualizar item.");
      }
    },
    [loadItems]
  );

  const deleteItem = useCallback(
    async (id: string, type: ItemType) => {
      try {
        await apiDeleteItem(id, type);
        toast.success("Item excluído com sucesso!");
        await loadItems(); // Refetch all items
      } catch (err: any) {
        console.error("Failed to delete item:", err);
        toast.error(err.message || "Erro ao excluir item.");
        throw new Error("Erro ao excluir item.");
      }
    },
    [loadItems]
  );

  const contextValue = useMemo(
    () => ({
      filters,
      items,
      loading,
      error,
      setTypeFilter,
      // 'setSearchFilter' e 'setDateFilter' foram removidos
      clearFilters,
      updateItem,
      deleteItem,
      refetchItems: loadItems,
    }),
    [
      filters,
      items,
      loading,
      error,
      setTypeFilter,
      clearFilters,
      updateItem,
      deleteItem,
      loadItems,
    ]
  );

  return (
    <NewsCompetitionsContext.Provider value={contextValue}>
      {children}
    </NewsCompetitionsContext.Provider>
  );
}

export function useNewsCompetitionsContext() {
  const context = useContext(NewsCompetitionsContext);
  if (context === undefined) {
    throw new Error(
      "useNewsCompetitionsContext must be used within a NewsCompetitionsProvider"
    );
  }
  return context;
}
