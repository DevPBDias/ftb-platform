"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Calendar, Image as ImageIcon, AlertTriangle } from "lucide-react";
import { HistoryType } from "@/constants/historyData";
import { toast } from "sonner";

export default function HistoryManagement() {
  const [histories, setHistories] = useState<HistoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [historyToDelete, setHistoryToDelete] = useState<HistoryType | null>(null);
  const [editingHistory, setEditingHistory] = useState<HistoryType | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    event: "",
    description: "",
    image: ""
  });

  // Buscar histórias
  const fetchHistories = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/history");
      if (response.ok) {
        const data = await response.json();
        setHistories(data);
      } else {
        toast.error("Erro ao buscar histórias");
      }
    } catch (error) {
      toast.error("Erro ao buscar histórias");
    } finally {
      setLoading(false);
    }
  };

  // Criar/Editar história
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingHistory 
        ? `/api/history/${editingHistory.id}` 
        : "/api/history";
      
      const method = editingHistory ? "PUT" : "POST";
      
      const payload = {
        ...formData,
        year: parseInt(formData.year),
        event: formData.event || undefined
      };
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(
          editingHistory 
            ? "História atualizada com sucesso!" 
            : "História criada com sucesso!"
        );
        setIsDialogOpen(false);
        resetForm();
        fetchHistories();
      } else {
        const error = await response.json();
        toast.error(error.message || "Erro ao salvar história");
      }
    } catch (error) {
      toast.error("Erro ao salvar história");
    }
  };

  // Abrir modal de confirmação de exclusão
  const handleDeleteClick = (history: HistoryType) => {
    setHistoryToDelete(history);
    setIsDeleteDialogOpen(true);
  };

  // Confirmar exclusão
  const handleConfirmDelete = async () => {
    if (!historyToDelete?.id) return;

    try {
      const response = await fetch(`/api/history/${historyToDelete.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("História excluída com sucesso!");
        fetchHistories();
      } else {
        toast.error("Erro ao excluir história");
      }
    } catch (error) {
      toast.error("Erro ao excluir história");
    } finally {
      setIsDeleteDialogOpen(false);
      setHistoryToDelete(null);
    }
  };

  // Cancelar exclusão
  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setHistoryToDelete(null);
  };

  // Editar história
  const handleEdit = (history: HistoryType) => {
    setEditingHistory(history);
    setFormData({
      title: history.title || "",
      year: history.year.toString(),
      event: history.event || "",
      description: history.description,
      image: typeof history.image === 'string' ? history.image : history.image.src
    });
    setIsDialogOpen(true);
  };

  // Resetar formulário
  const resetForm = () => {
    setFormData({
      title: "",
      year: "",
      event: "",
      description: "",
      image: ""
    });
    setEditingHistory(null);
  };

  // Abrir modal para criar nova história
  const handleCreate = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  useEffect(() => {
    fetchHistories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Lista de Histórias</h3>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar História
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {histories.map((history) => (
          <Card key={history.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  {history.title || `História ${history.year}`}
                </CardTitle>
                <Badge variant="outline">{history.year}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {history.event && (
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Evento:</strong> {history.event}
                </p>
              )}
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {history.description}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(history)}
                  className="flex-1"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteClick(history)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de criação/edição */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingHistory ? "Editar História" : "Adicionar Nova História"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Título da história"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Ano</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="Ano do evento"
                min="1900"
                max="2030"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="event">Evento (opcional)</Label>
              <Input
                id="event"
                value={formData.event}
                onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                placeholder="Nome do evento"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva a história"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL da Imagem</Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {editingHistory ? "Atualizar" : "Criar"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de confirmação de exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Confirmar Exclusão
            </DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir a história{" "}
              <span className="font-semibold text-gray-900">
                {historyToDelete?.title || `de ${historyToDelete?.year}`}
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
              Excluir História
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 