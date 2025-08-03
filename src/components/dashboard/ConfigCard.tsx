"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToggleLeft, Loader2 } from "lucide-react";
import { useAppConfig } from "@/hooks/useConfig";
import { useState } from "react";

export const ConfigCard = () => {
  const { isInscricaoEnabled, loading, error, refreshConfig } = useAppConfig();
  const [updating, setUpdating] = useState(false);

  const toggleInscricao = async () => {
    try {
      setUpdating(true);
      
      const response = await fetch("/api/configuration", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inscricao: !isInscricaoEnabled,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar configuração");
      }

      // Atualizar o contexto
      await refreshConfig();
    } catch (error) {
      console.error("Erro ao atualizar configuração:", error);
      alert("Erro ao atualizar configuração");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-gray-600" />
            Configurações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Carregando...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <ToggleLeft className="h-5 w-5 text-red-600" />
            Configurações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-600">Erro ao carregar</p>
          <Button 
            onClick={refreshConfig} 
            variant="outline" 
            size="sm" 
            className="mt-2"
          >
            Tentar novamente
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <ToggleLeft className="h-5 w-5 text-indigo-600" />
          Configurações
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Inscrições</span>
          <Badge variant={isInscricaoEnabled ? "default" : "secondary"}>
            {isInscricaoEnabled ? "Ativas" : "Inativas"}
          </Badge>
        </div>
        
        <Button
          onClick={toggleInscricao}
          disabled={updating}
          variant="outline"
          size="sm"
          className="w-full"
        >
          {updating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Atualizando...
            </>
          ) : (
            `${isInscricaoEnabled ? "Desativar" : "Ativar"} Inscrições`
          )}
        </Button>
        
        <p className="text-xs text-gray-500">
          {isInscricaoEnabled 
            ? "O botão de inscrições está visível no site" 
            : "O botão de inscrições está oculto no site"
          }
        </p>
      </CardContent>
    </Card>
  );
}; 