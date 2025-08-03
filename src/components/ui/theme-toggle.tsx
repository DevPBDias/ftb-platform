"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useThemeToggle } from "@/hooks/useThemeToggle";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "secondary" | "outline" | "ghost";
}

export const ThemeToggle = ({ 
  className = "", 
  size = "md", 
  variant = "secondary" 
}: ThemeToggleProps) => {
  const { theme, toggleTheme, isLight } = useThemeToggle();

  const sizeClasses = {
    sm: "size-6",
    md: "size-8", 
    lg: "size-10"
  };

  return (
    <Button
      onClick={toggleTheme}
      variant={variant}
      size="icon"
      className={`${sizeClasses[size]} cursor-pointer ${className}`}
      title={isLight ? "Mudar para tema escuro" : "Mudar para tema claro"}
    >
      {isLight ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </Button>
  );
}; 