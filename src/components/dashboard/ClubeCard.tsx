import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Edit, Trash2 } from "lucide-react";
import { TeamData } from "@/types/teams";
import Image from "next/image";

interface ClubeCardProps {
  clube: TeamData;
  onEdit: (clube: TeamData) => void;
  onDelete: (clube: TeamData) => void;
}

export function ClubeCard({ clube, onEdit, onDelete }: ClubeCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            {clube.teamName}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(clube)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(clube)}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {clube.logo && (
          <div className="relative w-16 h-16 mx-auto mb-3">
            <Image
              src={clube.logo}
              alt={`Logo ${clube.teamName}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
        <p className="text-sm text-gray-600 line-clamp-3">
          {clube.description || "Sem descrição"}
        </p>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Local: {clube.location || "Não informado"}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Fundado: {clube.founded || "Não informado"}</span>
          </div>
          {clube.stats && (
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Jogadores: {clube.stats.players || 0}</span>
              <span>Vitórias: {clube.stats.victories || 0}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 