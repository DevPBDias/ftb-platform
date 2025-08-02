import type * as React from "react";
import { Input } from "@/components/ui/input";
import { FormFieldWrapper } from "./form-field-wrapper";
import { useFormContext } from "react-hook-form";
import type { FieldValues, Path } from "react-hook-form";

interface TextInputFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  disabled?: boolean;
}

export function TextInputField<TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
}: TextInputFieldProps<TFieldValues>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFieldValues>();
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <FormFieldWrapper
      htmlFor={name}
      label={label}
      required={required}
      errorMessage={errorMessage}
      isInvalid={!!errorMessage}
    >
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
        disabled={disabled}
        aria-invalid={!!errorMessage}
        aria-errormessage={errorMessage ? `${name}-error` : undefined}
        {...register(name)}
      />
    </FormFieldWrapper>
  );
}
