import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

interface ClubesHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCreate: () => void;
  filteredCount: number;
}

export function ClubesHeader({ 
  searchTerm, 
  onSearchChange, 
  onCreate, 
  filteredCount 
}: ClubesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
      <div>
        <h3 className="text-lg font-semibold">Gerenciamento de Clubes</h3>
        <p className="text-sm text-gray-600">
          {filteredCount} clube{filteredCount !== 1 ? 's' : ''} encontrado{filteredCount !== 1 ? 's' : ''}
        </p>
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-none">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar clubes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={onCreate} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Clube
        </Button>
      </div>
    </div>
  );
} 