import { FormFieldWrapper } from "./form-field-wrapper";
import { useFormContext, Controller } from "react-hook-form";
import type { FieldValues, Path } from "react-hook-form";
import { MultiDatePicker } from "../ui/multi-date-picker";

interface MultiDateFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  required?: boolean;
  disabled?: boolean;
}

export function MultiDateField<TFieldValues extends FieldValues>({
  name,
  label,
  required = false,
  disabled = false,
}: MultiDateFieldProps<TFieldValues>) {
  const {
    control,
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
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MultiDatePicker
            selectedDates={field.value as Date[] | undefined}
            onSelectDates={field.onChange}
            disabled={disabled}
            className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
          />
        )}
      />
    </FormFieldWrapper>
  );
}
