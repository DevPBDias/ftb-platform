import type * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  htmlFor?: string;
  label: string;
  required?: boolean;
  errorMessage?: string;
  children: React.ReactNode;
  isInvalid?: boolean;
}

export function FormFieldWrapper({
  htmlFor,
  label,
  required = false,
  errorMessage,
  children,
  isInvalid,
  className,
  ...props
}: FormFieldWrapperProps) {
  return (
    <div
      className={cn("group/field grid gap-2", className)}
      data-invalid={isInvalid}
      {...props}
    >
      <Label
        htmlFor={htmlFor}
        className="group-data-[invalid=true]/field:text-destructive"
      >
        {label} {required && <span aria-hidden="true">*</span>}
      </Label>
      {children}
      {errorMessage && (
        <p id={`${htmlFor}-error`} className="text-destructive text-sm">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
