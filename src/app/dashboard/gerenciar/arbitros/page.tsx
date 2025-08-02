"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, User, ArrowLeft, AlertTriangle } from "lucide-react";
import { ArbitroFetchResponse } from "@/types/referee.types";
import { ArbitroCard } from "@/components/Card/ArbitroCard";
import { toast } from "sonner";
import Link from "next/link";

export default function ArbitrosPage() {
  const [arbitros, setArbitros] = useState<ArbitroFetchResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [arbitroToDelete, setArbitroToDelete] = useState<ArbitroFetchResponse | null>(null);
  const [editingArbitro, setEditingArbitro] = useState<ArbitroFetchResponse | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    years: "",
    photo: ""
  });

  // Buscar árbitros
  const fetchArbitros = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/arbitros");
      if (response.ok) {
        const data = await response.json();
        setArbitros(data);
      } else {
        toast.error("Erro ao buscar árbitros");
      }
    } catch (error) {
      toast.error("Erro ao buscar árbitros");
    } finally {
      setLoading(false);
    }
  };

  // Criar/Editar árbitro
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingArbitro 
        ? `/api/arbitros/${editingArbitro.id}` 
        : "/api/arbitros";
      
      const method = editingArbitro ? "PUT" : "POST";
      
      const payload = {
        ...formData,
        years: parseInt(formData.years),
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
          editingArbitro 
            ? "Árbitro atualizado com sucesso!" 
            : "Árbitro criado com sucesso!"
        );
        setIsDialogOpen(false);
        resetForm();
        fetchArbitros();
      } else {
        const error = await response.json();
        toast.error(error.message || "Erro ao salvar árbitro");
      }
    } catch (error) {
      toast.error("Erro ao salvar árbitro");
    }
  };

  // Abrir modal de confirmação de exclusão
  const handleDeleteClick = (arbitro: ArbitroFetchResponse) => {
    setArbitroToDelete(arbitro);
    setIsDeleteDialogOpen(true);
  };

  // Confirmar exclusão
  const handleConfirmDelete = async () => {
    if (!arbitroToDelete?.id) return;

    try {
      const response = await fetch(`/api/arbitros/${arbitroToDelete.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Árbitro excluído com sucesso!");
        fetchArbitros();
      } else {
        toast.error("Erro ao excluir árbitro");
      }
    } catch (error) {
      toast.error("Erro ao excluir árbitro");
    } finally {
      setIsDeleteDialogOpen(false);
      setArbitroToDelete(null);
    }
  };

  // Cancelar exclusão
  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setArbitroToDelete(null);
  };

  // Editar árbitro
  const handleEdit = (arbitro: ArbitroFetchResponse) => {
    setEditingArbitro(arbitro);
    setFormData({
      name: arbitro.name,
      experience: arbitro.experience,
      years: arbitro.years.toString(),
      photo: arbitro.photo
    });
    setIsDialogOpen(true);
  };

  // Resetar formulário
  const resetForm = () => {
    setFormData({
      name: "",
      experience: "",
      years: "",
      photo: ""
    });
    setEditingArbitro(null);
  };

  // Abrir modal para criar novo árbitro
  const handleCreate = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  useEffect(() => {
    fetchArbitros();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p>Carregando árbitros...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Dashboard
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gerenciamento de Árbitros
        </h1>
        <p className="text-gray-600">
          Gerencie os árbitros da Federação Tocantinense de Basquetebol
        </p>
      </div>

      {/* Header com botão de criar */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">Árbitros Cadastrados</h3>
          <p className="text-sm text-gray-600">
            {arbitros.length} árbitro{arbitros.length !== 1 ? 's' : ''} encontrado{arbitros.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Árbitro
        </Button>
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-6">
        {arbitros.map((arbitro) => (
          <ArbitroCard
            key={arbitro.id}
            arbitro={arbitro}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            showActions={true}
          />
        ))}
      </div>

      {/* Estado vazio */}
      {arbitros.length === 0 && !loading && (
        <Card className="text-center py-12">
          <CardContent>
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum árbitro encontrado</h3>
            <p className="text-gray-600 mb-4">
              Comece adicionando o primeiro árbitro da federação.
            </p>
            <Button onClick={handleCreate} className="flex items-center gap-2 mx-auto">
              <Plus className="h-4 w-4" />
              Adicionar Primeiro Árbitro
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Modal de criação/edição */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingArbitro ? "Editar Árbitro" : "Adicionar Novo Árbitro"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nome completo do árbitro"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experiência</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="Descreva a experiência do árbitro"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="years">Anos de Atuação</Label>
              <Input
                id="years"
                type="number"
                value={formData.years}
                onChange={(e) => setFormData({ ...formData, years: e.target.value })}
                placeholder="Número de anos"
                min="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">URL da Foto</Label>
              <Input
                id="photo"
                type="url"
                value={formData.photo}
                onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                placeholder="https://exemplo.com/foto.jpg"
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
                {editingArbitro ? "Atualizar" : "Criar"}
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
              Tem certeza que deseja excluir o árbitro{" "}
              <span className="font-semibold text-gray-900">
                {arbitroToDelete?.name}
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
              Excluir Árbitro
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 