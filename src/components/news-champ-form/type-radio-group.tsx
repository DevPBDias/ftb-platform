"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormFieldWrapper } from "./form-field-wrapper";
import { useFormContext, Controller } from "react-hook-form";
import type { FieldValues, Path } from "react-hook-form";
import { Label } from "@/components/ui/label";

interface TypeRadioGroupProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
  disabled?: boolean;
}

export function TypeRadioGroup<TFieldValues extends FieldValues>({
  name,
  label,
  options,
  required = false,
  disabled = false,
}: TypeRadioGroupProps<TFieldValues>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>();
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <FormFieldWrapper
      label={label}
      required={required}
      errorMessage={errorMessage}
      isInvalid={!!errorMessage}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value as string}
            className="flex space-x-4"
            disabled={disabled}
            aria-invalid={!!errorMessage}
            aria-errormessage={errorMessage ? `${name}-error` : undefined}
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${name}-${option.value}`}
                />
                <Label htmlFor={`${name}-${option.value}`}>
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      />
    </FormFieldWrapper>
  );
}
