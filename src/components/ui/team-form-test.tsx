"use client";

import { useTeamFormContext } from "@/context/team-form-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const TeamFormTest = () => {
  const {
    teamName,
    teamCategory,
    championshipName,
    people,
    allPeople,
    isLoading,
    showSuccessModal,
  } = useTeamFormContext();

  return (
    <Card className="border-2 border-green-300 bg-green-50">
      <CardHeader>
        <CardTitle className="text-sm text-green-800">Teste - Formulário de Equipe</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs">Nome da Equipe:</span>
          <Badge variant={teamName ? "default" : "secondary"}>
            {teamName || "Não definido"}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs">Torneio:</span>
          <Badge variant={championshipName ? "default" : "secondary"}>
            {championshipName || "Não selecionado"}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs">Categoria:</span>
          <Badge variant={teamCategory ? "default" : "secondary"}>
            {teamCategory || "Não selecionada"}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs">Total de Pessoas:</span>
          <Badge variant="outline">
            {allPeople.length}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs">Loading:</span>
          <Badge variant={isLoading ? "default" : "secondary"}>
            {isLoading ? "Sim" : "Não"}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs">Modal de Sucesso:</span>
          <Badge variant={showSuccessModal ? "default" : "secondary"}>
            {showSuccessModal ? "Aberto" : "Fechado"}
          </Badge>
        </div>
        
        {allPeople.length > 0 && (
          <div className="mt-2">
            <span className="text-xs font-semibold">Pessoas adicionadas:</span>
            <div className="text-xs space-y-1 mt-1">
              {allPeople.map((person) => (
                <div key={person.id} className="flex justify-between">
                  <span>{person.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {person.role}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 