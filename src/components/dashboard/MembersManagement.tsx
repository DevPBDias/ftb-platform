"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, User, Award, AlertTriangle } from "lucide-react";
import { MemberFederation } from "@/types/cards.types";
import { toast } from "sonner";

export default function MembersManagement() {
  const [members, setMembers] = useState<MemberFederation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<MemberFederation | null>(null);
  const [editingMember, setEditingMember] = useState<MemberFederation | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    jobFunction: "",
    history: "",
    image: "",
    category: "member" as "member" | "mention"
  });

  // Buscar membros
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/members");
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
      } else {
        toast.error("Erro ao buscar membros");
      }
    } catch (error) {
      toast.error("Erro ao buscar membros");
    } finally {
      setLoading(false);
    }
  };

  // Criar/Editar membro
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingMember 
        ? `/api/members/${editingMember.id}` 
        : "/api/members";
      
      const method = editingMember ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(
          editingMember 
            ? "Membro atualizado com sucesso!" 
            : "Membro criado com sucesso!"
        );
        setIsDialogOpen(false);
        resetForm();
        fetchMembers();
      } else {
        const error = await response.json();
        toast.error(error.message || "Erro ao salvar membro");
      }
    } catch (error) {
      toast.error("Erro ao salvar membro");
    }
  };

  // Abrir modal de confirmação de exclusão
  const handleDeleteClick = (member: MemberFederation) => {
    setMemberToDelete(member);
    setIsDeleteDialogOpen(true);
  };

  // Confirmar exclusão
  const handleConfirmDelete = async () => {
    if (!memberToDelete?.id) return;

    try {
      const response = await fetch(`/api/members/${memberToDelete.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Membro excluído com sucesso!");
        fetchMembers();
      } else {
        toast.error("Erro ao excluir membro");
      }
    } catch (error) {
      toast.error("Erro ao excluir membro");
    } finally {
      setIsDeleteDialogOpen(false);
      setMemberToDelete(null);
    }
  };

  // Cancelar exclusão
  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setMemberToDelete(null);
  };

  // Editar membro
  const handleEdit = (member: MemberFederation) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      jobFunction: Array.isArray(member.jobFunction) 
        ? member.jobFunction.join(", ") 
        : member.jobFunction,
      history: member.history,
      image: typeof member.image === 'string' ? member.image : member.image?.src || "",
      category: member.category || "member"
    });
    setIsDialogOpen(true);
  };

  // Resetar formulário
  const resetForm = () => {
    setFormData({
      name: "",
      jobFunction: "",
      history: "",
      image: "",
      category: "member"
    });
    setEditingMember(null);
  };

  // Abrir dialog para criar novo
  const handleCreate = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  useEffect(() => {
    fetchMembers();
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
        <h3 className="text-lg font-semibold">Lista de Membros e Menções</h3>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Membro
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <Card key={member.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  {member.category === "mention" ? (
                    <Award className="h-4 w-4 text-yellow-600" />
                  ) : (
                    <User className="h-4 w-4 text-blue-600" />
                  )}
                  {member.name}
                </CardTitle>
                <Badge variant={member.category === "mention" ? "secondary" : "default"}>
                  {member.category === "mention" ? "Menção Honrosa" : "Membro"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Função:</strong> {member.jobFunction}
              </p>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {member.history}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(member)}
                  className="flex-1"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteClick(member)}
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
              {editingMember ? "Editar Membro" : "Adicionar Novo Membro"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nome completo"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobFunction">Função</Label>
              <Input
                id="jobFunction"
                value={formData.jobFunction}
                onChange={(e) => setFormData({ ...formData, jobFunction: e.target.value })}
                placeholder="Cargo ou função na federação"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="history">Histórico</Label>
              <Textarea
                id="history"
                value={formData.history}
                onChange={(e) => setFormData({ ...formData, history: e.target.value })}
                placeholder="Descreva o histórico e contribuições"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value as "member" | "mention" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Membro</SelectItem>
                  <SelectItem value="mention">Menção Honrosa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL da Foto</Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
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
                {editingMember ? "Atualizar" : "Criar"}
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
              Tem certeza que deseja excluir{" "}
              <span className="font-semibold text-gray-900">
                {memberToDelete?.name}
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
              Excluir Membro
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 