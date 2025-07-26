"use client";

import { Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FormField } from "./FormField";
import { type Control, Controller } from "react-hook-form";
import { GameFormData } from "@/schemas/basketball-calendar.schema";
import { TIME_SLOTS } from "@/constants/calendarValues";

interface TimeSelectorProps {
  control: Control<GameFormData>;
  error?: string;
  value: string;
}

export function TimeSelector({ control, error, value }: TimeSelectorProps) {
  return (
    <FormField
      label="Horário do Jogo"
      error={error}
      required
      className="space-y-4"
    >
      <Controller
        name="time"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <span className="text-sm font-medium text-slate-600">
                Horários Comuns
              </span>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className={`h-12 mt-1 w-full border-2 transition-colors ${
                    error
                      ? "border-red-300 hover:border-red-400"
                      : "border-slate-200 hover:border-blue-900"
                  }`}
                >
                  <SelectValue placeholder="Selecione o horário" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  <div className="px-2 py-1 text-xs font-bold text-amber-600 bg-amber-50 rounded">
                    ☀️ Manhã
                  </div>
                  {TIME_SLOTS.morning.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}

                  <div className="px-2 py-1 text-xs font-bold text-orange-600 bg-orange-50 rounded">
                    🌅 Tarde
                  </div>
                  {TIME_SLOTS.afternoon.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}

                  <div className="px-2 py-1 text-xs font-bold text-purple-600 bg-purple-50 rounded">
                    🌙 Noite
                  </div>
                  {TIME_SLOTS.evening.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 space-y-2">
              <span className="text-sm font-medium text-slate-600">
                Horário Personalizado
              </span>
              <Input
                type="time"
                value={field.value}
                onChange={field.onChange}
                className={`py-2 w-full mt-1 text-center border-2 transition-colors ${
                  error
                    ? "border-red-300 hover:border-red-400"
                    : "border-slate-200 hover:border-blue-900"
                }`}
                placeholder="HH:MM"
              />
            </div>
          </div>
        )}
      />
    </FormField>
  );
}
