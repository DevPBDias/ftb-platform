"use client";

import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormValues } from "@/schemas/game-register.schema";

interface CategoryLocationTypeSectionProps {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
}

export function CategoryLocationTypeSection({
  control,
  register,
  errors,
}: CategoryLocationTypeSectionProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="category">Categoria</Label>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sub14">Sub-14</SelectItem>
                  <SelectItem value="sub16">Sub-16</SelectItem>
                  <SelectItem value="sub18">Sub-18</SelectItem>
                  <SelectItem value="adulto">Adulto</SelectItem>
                  <SelectItem value="feminino">Feminino</SelectItem>
                  <SelectItem value="masculino">Masculino</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Local</Label>
          <Input
            id="location"
            placeholder="Ex: Ginásio Municipal"
            {...register("location")}
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="gameType">Tipo de Jogo</Label>
        <Controller
          control={control}
          name="gameType"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger id="gameType">
                <SelectValue placeholder="Selecione o tipo de jogo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="faseDeGrupos">Fase de Grupos</SelectItem>
                <SelectItem value="quartasDeFinal">Quartas de Final</SelectItem>
                <SelectItem value="semifinal">Semifinal</SelectItem>
                <SelectItem value="final">Final</SelectItem>
                <SelectItem value="amistoso">Amistoso</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.gameType && (
          <p className="text-red-500 text-sm">{errors.gameType.message}</p>
        )}
      </div>
    </>
  );
}
