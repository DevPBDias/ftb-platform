"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { FormField as CustomFormField } from "./FormField";
import type { Control } from "react-hook-form";
import { GameFormData } from "@/schemas/basketball-calendar.schema";
import { CATEGORIES, GENDERS } from "@/constants/calendarValues";

interface GameDetailsSelectorProps {
  control: Control<GameFormData>;
  genderError?: string;
  categoryError?: string;
}

export function GameDetailsSelector({
  control,
  genderError,
  categoryError,
}: GameDetailsSelectorProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FormField
        control={control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <CustomFormField label="Gênero" error={genderError} required>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={`h-12 border-2 transition-colors ${
                      genderError
                        ? "border-red-300 hover:border-red-400"
                        : "border-slate-200 hover:border-orange-300"
                    }`}
                  >
                    <SelectValue placeholder="Selecione o gênero" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {GENDERS.map((gender) => (
                    <SelectItem key={gender.value} value={gender.value}>
                      {gender.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CustomFormField>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <CustomFormField label="Categoria" error={categoryError} required>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={`h-12 border-2 transition-colors ${
                      categoryError
                        ? "border-red-300 hover:border-red-400"
                        : "border-slate-200 hover:border-orange-300"
                    }`}
                  >
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CustomFormField>
          </FormItem>
        )}
      />
    </div>
  );
}
