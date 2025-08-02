"use client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import type { SelectMultipleEventHandler } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface MultiDatePickerProps {
  selectedDates: Date[] | undefined;
  onSelectDates: (dates: Date[] | undefined) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

export function MultiDatePicker({
  selectedDates,
  onSelectDates,
  disabled,
  className,
  placeholder = "Selecione as datas",
}: MultiDatePickerProps) {
  const handleSelect: SelectMultipleEventHandler = (dates) => {
    onSelectDates(dates);
  };

  // Garantir que selectedDates seja um array válido
  const validDates = selectedDates?.filter(date => date instanceof Date && !isNaN(date.getTime())) || [];

  const displayDates =
    validDates.length > 0
      ? validDates.length === 1
        ? format(validDates[0], "dd/MM/yyyy", { locale: ptBR })
        : `${validDates.length} data${validDates.length > 1 ? 's' : ''} selecionada${validDates.length > 1 ? 's' : ''}`
      : placeholder;

  return (
    <div className="space-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDates && "text-muted-foreground",
              className
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {displayDates}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="flex flex-row flex-wrap max-w-[300px] p-0"
          align="start"
        >
          <Calendar
            mode="multiple"
            selected={validDates}
            onSelect={handleSelect}
            initialFocus
            locale={ptBR}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
      
      {/* Badges das datas selecionadas abaixo do campo */}
      {validDates.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {validDates.map((date, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {format(date, "dd/MM/yyyy", { locale: ptBR })}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
