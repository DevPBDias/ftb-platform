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
import { CHAMPIONSHIPS_DATABASE } from "@/constants/calendarValues";
import { GameFormData } from "@/schemas/basketball-calendar.schema";

interface ChampionshipSelectorProps {
  control: Control<GameFormData>;
  error?: string;
}

export function ChampionshipSelector({
  control,
  error,
}: ChampionshipSelectorProps) {
  return (
    <FormField
      control={control}
      name="championshipId"
      render={({ field }) => (
        <FormItem>
          <CustomFormField label="Campeonato" error={error} required>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger
                  className={`h-12 border-2 transition-colors ${
                    error
                      ? "border-red-300 hover:border-red-400"
                      : "border-slate-200 hover:border-amber-300"
                  }`}
                >
                  <SelectValue placeholder="Selecione o campeonato" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {CHAMPIONSHIPS_DATABASE.map((championship) => (
                  <SelectItem key={championship.id} value={championship.id}>
                    {championship.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CustomFormField>
        </FormItem>
      )}
    />
  );
}
