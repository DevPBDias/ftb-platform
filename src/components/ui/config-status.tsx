"use client";

import { useAppConfig } from "@/hooks/useConfig";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export const ConfigStatus = () => {
  const { isInscricaoEnabled, loading, error } = useAppConfig();

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Carregando configurações...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2">
        <XCircle className="h-4 w-4 text-red-500" />
        <span className="text-sm text-red-500">Erro ao carregar configurações</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <CheckCircle className="h-4 w-4 text-green-500" />
      <span className="text-sm">Configurações carregadas</span>
      <Badge variant={isInscricaoEnabled ? "default" : "secondary"}>
        Inscrições: {isInscricaoEnabled ? "Ativas" : "Inativas"}
      </Badge>
    </div>
  );
}; 