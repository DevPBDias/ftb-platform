"use client";

import { useAppConfig } from "@/hooks/useConfig";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const ConfigTest = () => {
  const { config, loading, error, isInscricaoEnabled, refreshConfig } = useAppConfig();

  return (
    <Card className="border-2 border-blue-300 bg-blue-50">
      <CardHeader>
        <CardTitle className="text-sm text-blue-800">Teste - Contexto Recriado</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs">Loading:</span>
          <Badge variant={loading ? "default" : "secondary"}>
            {loading ? "Sim" : "Não"}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs">Error:</span>
          <Badge variant={error ? "destructive" : "secondary"}>
            {error ? "Sim" : "Não"}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs">isInscricaoEnabled:</span>
          <Badge variant={isInscricaoEnabled ? "default" : "secondary"}>
            {isInscricaoEnabled ? "Sim" : "Não"}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs">Config Object:</span>
          <span className="text-xs font-mono max-w-[200px] truncate">
            {config ? JSON.stringify(config) : "null"}
          </span>
        </div>
        
        <Button 
          onClick={refreshConfig} 
          size="sm" 
          variant="outline"
          className="w-full mt-2"
        >
          Atualizar Configurações
        </Button>
        
        {error && (
          <div className="text-xs text-red-600 bg-red-100 p-2 rounded">
            Erro: {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 