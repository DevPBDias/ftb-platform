import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus } from "lucide-react";

interface EmptyStateProps {
  searchTerm: string;
  onCreate: () => void;
}

export function EmptyState({ searchTerm, onCreate }: EmptyStateProps) {
  return (
    <Card className="text-center py-12">
      <CardContent>
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">
          {searchTerm ? "Nenhum clube encontrado" : "Nenhum clube cadastrado"}
        </h3>
        <p className="text-gray-600 mb-4">
          {searchTerm ? "Tente ajustar os termos de busca." : "Comece adicionando o primeiro clube."}
        </p>
        {!searchTerm && (
          <Button onClick={onCreate} className="flex items-center gap-2 mx-auto">
            <Plus className="h-4 w-4" />
            Adicionar Primeiro Clube
          </Button>
        )}
      </CardContent>
    </Card>
  );
} 