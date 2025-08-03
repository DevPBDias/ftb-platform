"use client";

import { useAppConfig } from "@/hooks/useConfig";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ConfigDebug = () => {
  const { config, loading, error, isInscricaoEnabled } = useAppConfig();

  return (
    <Card className="border-2 border-dashed border-gray-300">
      <CardHeader>
        <CardTitle className="text-sm">Debug - Configurações</CardTitle>
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
          <span className="text-xs font-mono">
            {config ? JSON.stringify(config) : "null"}
          </span>
        </div>
        
        {error && (
          <div className="text-xs text-red-600">
            Erro: {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 