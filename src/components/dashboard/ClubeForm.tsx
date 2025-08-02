import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TeamData } from "@/types/teams";

interface ClubeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Partial<TeamData>) => Promise<void>;
  editingClube: TeamData | null;
}

export function ClubeForm({ isOpen, onClose, onSubmit, editingClube }: ClubeFormProps) {
  const [formData, setFormData] = useState({
    teamName: "",
    logo: "",
    image: "",
    description: "",
    founded: "",
    location: "",
    contact: "",
    stats: {
      players: 0,
      victories: 0,
      founded: 0
    },
    championships: [] as Array<{
      id: number;
      name: string;
      years?: number[];
      quantity: number;
      category: string;
    }>,
    admins: [] as Array<{
      name: string;
      role: string;
      image?: string;
    }>
  });

  useEffect(() => {
    if (editingClube) {
      setFormData({
        teamName: editingClube.teamName || "",
        logo: editingClube.logo || "",
        image: editingClube.image || "",
        description: editingClube.description || "",
        founded: typeof editingClube.founded === 'string' ? editingClube.founded : editingClube.founded?.toString() || "",
        location: editingClube.location || "",
        contact: editingClube.contact || "",
        stats: {
          players: editingClube.stats?.players || 0,
          victories: editingClube.stats?.victories || 0,
          founded: editingClube.stats?.founded || 0
        },
        championships: editingClube.championships || [],
        admins: editingClube.admins || []
      });
    } else {
      resetForm();
    }
  }, [editingClube]);

  const resetForm = () => {
    setFormData({
      teamName: "",
      logo: "",
      image: "",
      description: "",
      founded: "",
      location: "",
      contact: "",
      stats: {
        players: 0,
        victories: 0,
        founded: 0
      },
      championships: [],
      admins: []
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingClube ? "Editar Clube" : "Adicionar Novo Clube"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="teamName">Nome do Clube *</Label>
              <Input
                id="teamName"
                value={formData.teamName}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                placeholder="Nome do clube"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="founded">Ano de Fundação</Label>
              <Input
                id="founded"
                value={formData.founded}
                onChange={(e) => setFormData({ ...formData, founded: e.target.value })}
                placeholder="Ex: 2020"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Localização</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Cidade, Estado"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contato</Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="Instagram, telefone, etc."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="logo">URL do Logo</Label>
              <Input
                id="logo"
                type="url"
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                placeholder="https://exemplo.com/logo.jpg"
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descrição do clube..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="players">Número de Jogadores</Label>
              <Input
                id="players"
                type="number"
                value={formData.stats.players}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  stats: { ...formData.stats, players: parseInt(e.target.value) || 0 }
                })}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="victories">Vitórias</Label>
              <Input
                id="victories"
                type="number"
                value={formData.stats.victories}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  stats: { ...formData.stats, victories: parseInt(e.target.value) || 0 }
                })}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="foundedYear">Ano de Fundação (Stats)</Label>
              <Input
                id="foundedYear"
                type="number"
                value={formData.stats.founded}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  stats: { ...formData.stats, founded: parseInt(e.target.value) || 0 }
                })}
                placeholder="2020"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {editingClube ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 