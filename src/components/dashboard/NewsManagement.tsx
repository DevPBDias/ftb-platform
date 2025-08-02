"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Newspaper, Trophy, Edit, Trash2, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useNews } from "@/hooks/useNews";
import { useCompetitions } from "@/hooks/useCompetitions";
import { NoticiasResponse } from "@/types/news.types";
import { CompeticaoData } from "@/types/new-competition";
import { NewsFormModal } from "@/components/news-champ-form/NewsFormModal";
import { format } from "date-fns";

interface NewsManagementProps {
  activeTab: string;
}

export default function NewsManagement({ activeTab }: NewsManagementProps) {
  const { 
    noticias, 
    loading: noticiasLoading, 
    error: noticiasError,
    createNoticia,
    updateNoticia,
    deleteNoticia
  } = useNews();

  const { 
    competicoes, 
    loading: competicoesLoading, 
    error: competicoesError,
    createCompeticao,
    updateCompeticao,
    deleteCompeticao
  } = useCompetitions();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NoticiasResponse | CompeticaoData | null>(null);
  const [itemToDelete, setItemToDelete] = useState<NoticiasResponse | CompeticaoData | null>(null);

  const loading = activeTab === "noticias" ? noticiasLoading : competicoesLoading;
  const error = activeTab === "noticias" ? noticiasError : competicoesError;
  const items = activeTab === "noticias" ? noticias : competicoes;

  const handleFormSubmit = async (data: {
    type: "noticia" | "competicao";
    titulo: string;
    descricao: string;
    datas: Date[];
    local: string;
    image: string;
  }) => {
    try {
      // Converter Date objects para strings YYYY-MM-DD
      const formattedDates = data.datas.map((date) =>
        format(date, "yyyy-MM-dd")
      );

      const itemData = {
        titulo: data.titulo,
        descricao: data.descricao,
        datas: formattedDates,
        local: data.local,
        image: data.image || undefined
      };

      if (editingItem) {
        if (activeTab === "noticias") {
          await updateNoticia(editingItem.id!, itemData);
          toast.success("Notícia atualizada com sucesso!");
        } else {
          await updateCompeticao(editingItem.id!, itemData);
          toast.success("Competição atualizada com sucesso!");
        }
      } else {
        if (activeTab === "noticias") {
          await createNoticia(itemData);
          toast.success("Notícia criada com sucesso!");
        } else {
          await createCompeticao(itemData);
          toast.success("Competição criada com sucesso!");
        }
      }
    } catch (error) {
      throw error; // Re-throw para que o componente de formulário possa tratar
    }
  };

  const handleEdit = (item: NoticiasResponse | CompeticaoData) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (item: NoticiasResponse | CompeticaoData) => {
    setItemToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete?.id) return;

    try {
      if (activeTab === "noticias") {
        await deleteNoticia(itemToDelete.id);
        toast.success("Notícia excluída com sucesso!");
      } else {
        await deleteCompeticao(itemToDelete.id);
        toast.success("Competição excluída com sucesso!");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao excluir item");
    } finally {
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleCreate = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Carregando {activeTab === "noticias" ? "notícias" : "competições"}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg mt-10">
        Erro: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com botão de criar */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">
            {activeTab === "noticias" ? "Notícias" : "Competições"}
          </h3>
          <p className="text-sm text-gray-600">
            {items.length} {activeTab === "noticias" ? "notícia" : "competição"}{items.length !== 1 ? 's' : ''} encontrado{items.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar {activeTab === "noticias" ? "Notícia" : "Competição"}
        </Button>
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  {activeTab === "noticias" ? (
                    <Newspaper className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Trophy className="h-5 w-5 text-yellow-600" />
                  )}
                  {item.titulo}
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClick(item)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600 line-clamp-3">
                {item.descricao}
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Local: {item.local}</span>
                </div>
                {item.datas && item.datas.length > 0 && (
                  <div className="text-xs text-gray-500">
                    <span>Datas: {item.datas.join(", ")}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estado vazio */}
      {items.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            {activeTab === "noticias" ? (
              <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            ) : (
              <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            )}
            <h3 className="text-lg font-semibold mb-2">
              Nenhum {activeTab === "noticias" ? "notícia" : "competição"} encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              Comece adicionando o primeiro item.
            </p>
            <Button onClick={handleCreate} className="flex items-center gap-2 mx-auto">
              <Plus className="h-4 w-4" />
              Adicionar Primeiro Item
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Modal de criação/edição usando o novo formulário */}
      <NewsFormModal
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingItem={editingItem}
        activeTab={activeTab as "noticias" | "competicoes"}
        onSubmit={handleFormSubmit}
      />

      {/* Modal de confirmação de exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Confirmar Exclusão
            </DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o item{" "}
              <span className="font-semibold text-gray-900">
                {itemToDelete?.titulo}
              </span>
              ? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancelDelete}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
            >
              Excluir Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 