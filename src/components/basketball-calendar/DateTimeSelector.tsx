"use client";

import { Calendar, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormField as CustomFormField } from "./FormField";
import { FormItem, FormMessage, FormField } from "@/components/ui/form";
import type { Control } from "react-hook-form";
import { GameFormData } from "@/schemas/basketball-calendar.schema";

interface DateTimeSelectorProps {
  control: Control<GameFormData>;
  dateError?: string;
  timeError?: string;
}

export function DateTimeSelector({
  control,
  dateError,
  timeError,
}: DateTimeSelectorProps) {
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FormField
        control={control}
        name="date"
        render={({ field }) => (
          <FormItem>
            <CustomFormField label="Data" error={dateError} required>
              <Input
                id="date"
                type="date"
                {...field}
                min={todayString}
                className={`py-2 w-fit mt-1 border-2 transition-colors ${
                  dateError
                    ? "border-red-300 hover:border-red-400"
                    : "border-slate-200 hover:border-blue-900"
                }`}
              />
            </CustomFormField>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="time"
        render={({ field }) => (
          <FormItem>
            <CustomFormField label="Horário" error={timeError} required>
              <Input
                id="time"
                type="time"
                {...field}
                className={`py-2 w-fit mt-1 border-2 transition-colors ${
                  timeError
                    ? "border-red-300 hover:border-red-400"
                    : "border-slate-200 hover:border-blue-900"
                }`}
              />
            </CustomFormField>
          </FormItem>
        )}
      />
    </div>
  );
}
