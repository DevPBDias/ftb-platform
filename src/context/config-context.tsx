"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Config } from "@/types/config.types";

interface ConfigContextType {
  config: Config | null;
  loading: boolean;
  error: string | null;
  refreshConfig: () => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfig deve ser usado dentro de um ConfigProvider");
  }
  return context;
};

interface ConfigProviderProps {
  children: React.ReactNode;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<Config | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch("/api/configuration");
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar configurações: ${response.status}`);
      }
      
      const data: Config = await response.json();
      setConfig(data);
    } catch (err) {
      console.error("Erro ao buscar configurações:", err);
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      // Definir configuração padrão em caso de erro
      setConfig({ inscricao: false });
    } finally {
      setLoading(false);
    }
  };

  const refreshConfig = () => {
    fetchConfig();
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, loading, error, refreshConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}; 