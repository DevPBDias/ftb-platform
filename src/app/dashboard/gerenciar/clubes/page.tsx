"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useClubes } from "@/hooks/useClubes";
import { TeamData } from "@/types/teams";
import { ClubeCard } from "@/components/dashboard/ClubeCard";
import { ClubeForm } from "@/components/dashboard/ClubeForm";
import { DeleteConfirmationDialog } from "@/components/dashboard/DeleteConfirmationDialog";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { ClubesHeader } from "@/components/dashboard/ClubesHeader";

export default function EquipesManagement() {
  const { 
    clubes, 
    loading, 
    error,
    createClube,
    updateClube,
    deleteClube
  } = useClubes();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingClube, setEditingClube] = useState<TeamData | null>(null);
  const [clubeToDelete, setClubeToDelete] = useState<TeamData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar clubes baseado na busca
  const filteredClubes = clubes.filter(clube =>
    clube.teamName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (formData: Partial<TeamData>) => {
    try {
      if (editingClube) {
        await updateClube(editingClube.id!, formData);
        toast.success("Clube atualizado com sucesso!");
      } else {
        await createClube(formData);
        toast.success("Clube criado com sucesso!");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao salvar clube");
    }
  };

  const handleEdit = (clube: TeamData) => {
    setEditingClube(clube);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (clube: TeamData) => {
    setClubeToDelete(clube);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!clubeToDelete?.id) return;

    try {
      await deleteClube(clubeToDelete.id);
      toast.success("Clube excluído com sucesso!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao excluir clube");
    } finally {
      setIsDeleteDialogOpen(false);
      setClubeToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setClubeToDelete(null);
  };

  const handleCreate = () => {
    setEditingClube(null);
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Carregando clubes...</p>
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
    <div className="container mx-auto p-6">
      <ClubesHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreate={handleCreate}
        filteredCount={filteredClubes.length}
      />

      {/* Grid de cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
        {filteredClubes.map((clube) => (
          <ClubeCard
            key={clube.id}
            clube={clube}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      {/* Estado vazio */}
      {filteredClubes.length === 0 && (
        <EmptyState
          searchTerm={searchTerm}
          onCreate={handleCreate}
        />
      )}

      {/* Modal de criação/edição */}
      <ClubeForm
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        editingClube={editingClube}
      />

      {/* Modal de confirmação de exclusão */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        clubeToDelete={clubeToDelete}
      />
    </div>
  );
} 