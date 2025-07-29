"use client";

import type React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  error,
  required = false,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label
        className={cn(
          "text-sm font-semibold text-slate-700",
          error && "text-red-600"
        )}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
      {error && (
        <p className="text-sm text-red-600 font-medium flex items-center gap-1">
          <span className="text-red-500">⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
}
