"use client";

import { Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Control, Controller } from "react-hook-form";
import { GameFormData } from "@/schemas/basketball-calendar.schema";
import { FormField } from "./FormField";

interface DateSelectorProps {
  control: Control<GameFormData>;
  error?: string;
  value: string;
}

export function DateSelector({ control, error, value }: DateSelectorProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getValidDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    return Array.from({ length: 31 }, (_, i) => i + 1).filter((day) => {
      const testDate = new Date(currentYear, currentMonth, day);
      const isValidDay = testDate.getMonth() === currentMonth;
      const isPastDay =
        testDate <
        new Date(today.getFullYear(), today.getMonth(), today.getDate());
      return isValidDay && !isPastDay;
    });
  };

  return (
    <FormField
      label="Data do Jogo"
      error={error}
      required
      className="space-y-4 mt-8"
    >
      <div className="grid lg:grid-cols-3 gap-4">
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <>
              <div className="space-y-2">
                <span className="text-sm font-medium text-slate-600">Dia</span>
                <Select
                  value={
                    field.value
                      ? new Date(field.value).getDate().toString()
                      : ""
                  }
                  onValueChange={(day) => {
                    const today = new Date();
                    const currentMonth = today.getMonth();
                    const currentYear = today.getFullYear();
                    const selectedDate = new Date(
                      currentYear,
                      currentMonth,
                      Number.parseInt(day)
                    );
                    field.onChange(selectedDate.toISOString().split("T")[0]);
                  }}
                >
                  <SelectTrigger
                    className={`h-12 w-full border-2 transition-colors ${
                      error
                        ? "border-red-300 hover:border-red-400"
                        : "border-slate-200 hover:border-blue-900"
                    }`}
                  >
                    <SelectValue placeholder="Dia" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {getValidDays().map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium text-slate-600">Mês</span>
                <Select
                  value={
                    field.value
                      ? new Date(field.value).getMonth().toString()
                      : new Date().getMonth().toString()
                  }
                  onValueChange={(month) => {
                    const today = new Date();
                    const currentYear = today.getFullYear();
                    const currentDay = field.value
                      ? new Date(field.value).getDate()
                      : today.getDate();
                    const selectedDate = new Date(
                      currentYear,
                      Number.parseInt(month),
                      currentDay
                    );
                    field.onChange(selectedDate.toISOString().split("T")[0]);
                  }}
                >
                  <SelectTrigger
                    className={`h-12 w-full border-2 transition-colors ${
                      error
                        ? "border-red-300 hover:border-red-400"
                        : "border-slate-200 hover:border-blue-900"
                    }`}
                  >
                    <SelectValue placeholder="Mês" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={new Date().getMonth().toString()}>
                      {new Date().toLocaleDateString("pt-BR", {
                        month: "long",
                      })}{" "}
                      (atual)
                    </SelectItem>
                    <SelectItem value={(new Date().getMonth() + 1).toString()}>
                      {new Date(
                        new Date().getFullYear(),
                        new Date().getMonth() + 1
                      ).toLocaleDateString("pt-BR", {
                        month: "long",
                      })}{" "}
                      (próximo)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium text-slate-600">Ano</span>
                <p className="flex items-center justify-center px-4 py-1.5 border-2 border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg text-sm font-medium text-slate-700">
                  {new Date().getFullYear()}
                </p>
              </div>
            </>
          )}
        />
      </div>
    </FormField>
  );
}
