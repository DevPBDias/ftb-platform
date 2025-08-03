"use client";

import { useConfig } from "@/context/config-context";

export const useAppConfig = () => {
  const { config, loading, error, refreshConfig } = useConfig();

  const isInscricaoEnabled = config?.inscricao ?? false;

  return {
    config,
    loading,
    error,
    refreshConfig,
    isInscricaoEnabled,
  };
}; 