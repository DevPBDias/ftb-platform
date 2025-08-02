import { Textarea } from "@/components/ui/textarea";
import { FormFieldWrapper } from "./form-field-wrapper";
import { useFormContext } from "react-hook-form";
import type { FieldValues, Path } from "react-hook-form";

interface TextareaFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
}

export function TextareaField<TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
}: TextareaFieldProps<TFieldValues>) {
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
      <Textarea
        id={name}
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
