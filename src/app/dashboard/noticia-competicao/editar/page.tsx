"use client";

import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useNewsCompetitionsContext,
  NewsCompetitionsProvider,
  ItemData, // Importe ItemData diretamente do contexto
} from "@/context/news-competition-context";
import { FilterSidebar } from "@/components/edit-news-competition/filter-sidebar";
import { ItemCard } from "@/components/edit-news-competition/item-card";
import { EditItemModal } from "@/components/edit-news-competition/edit-form";
import { DeleteItemModal } from "@/components/edit-news-competition/delete-item-modal";

function NewsCompetitionsPageContent() {
  const { items, loading, error, filters, updateItem, deleteItem } =
    useNewsCompetitionsContext();

  const [editingItem, setEditingItem] = useState<ItemData | null>(null);
  const [deletingItem, setDeletingItem] = useState<ItemData | null>(null);

  const handleEdit = (item: ItemData) => {
    setEditingItem(item);
  };

  const handleDelete = (item: ItemData) => {
    setDeletingItem(item);
  };

  const getTitle = () => {
    switch (filters.type) {
      case "noticia":
        return "Notícias";
      case "competicao":
        return "Competições";
      case "ambos":
      default:
        return "Notícias e Competições";
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1">
        <aside className="w-64 border-r bg-background p-4 hidden md:block">
          <FilterSidebar />
        </aside>
        <div className="flex-1 p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-6">{getTitle()}</h1>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-[250px] w-full rounded-lg" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500 text-lg mt-10">
              {error}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center text-muted-foreground text-lg mt-10">
              Nenhum item encontrado.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item: ItemData) => (
                <ItemCard
                  key={item.id} // id agora é obrigatório por tipo
                  item={item}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <EditItemModal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        item={editingItem}
        onSave={updateItem}
      />

      <DeleteItemModal
        isOpen={!!deletingItem}
        onClose={() => setDeletingItem(null)}
        item={deletingItem}
        onConfirm={deleteItem}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <NewsCompetitionsProvider>
      <NewsCompetitionsPageContent />
    </NewsCompetitionsProvider>
  );
}
