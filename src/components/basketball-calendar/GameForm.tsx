"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { DateTimeSelector } from "./DateTimeSelector";
import { TimeSelector } from "./TimeSelector";
import { TeamSelector } from "./TeamSelector";
import { FormField as CustomFormField } from "./FormField";
import type { UseFormReturn } from "react-hook-form";
import { CalendarTeam } from "@/types/teams";
import { GameFormData } from "@/schemas/basketball-calendar.schema";
import { GENDERS, CATEGORIES } from "@/constants/calendarValues";

interface GameFormProps {
  form: UseFormReturn<GameFormData>;
  onSubmit: (data: GameFormData) => void;
  getTeamById: (teamId: string) => CalendarTeam | undefined;
}

export function GameForm({ form, onSubmit, getTeamById }: GameFormProps) {
  const {
    formState: { errors, isSubmitting },
    watch,
  } = form;
  const watchedValues = watch();

  return (
    <Card className="h-fit shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-[#162456] to-blue-600 text-white rounded-t-lg p-4 sm:p-6">
        <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
          <div className="p-2 bg-white/20 rounded-full">
            <Plus className="h-6 w-6" />
          </div>
          Adicionar Novo Jogo
        </CardTitle>
        <CardDescription className="text-orange-100 text-sm sm:text-base">
          Preencha os dados do jogo para adicionar ao calendário
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 flex flex-col w-full justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormField
                      label="Gênero"
                      error={errors.gender?.message}
                      required
                    >
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={`h-12 w-full border-2 transition-colors ${
                              errors.gender
                                ? "border-red-300 hover:border-red-400"
                                : "border-slate-200 hover:border-blue-900"
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
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormField
                      label="Categoria"
                      error={errors.category?.message}
                      required
                    >
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={`h-12 w-full border-2 transition-colors ${
                              errors.category
                                ? "border-red-300 hover:border-red-400"
                                : "border-slate-200 hover:border-blue-900"
                            }`}
                          >
                            <SelectValue placeholder="Selecione a categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CATEGORIES.map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
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

            <Separator className="bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

            <DateTimeSelector
              control={form.control}
              dateError={errors.date?.message}
              timeError={errors.time?.message}
            />

            <Separator className="bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

            <TeamSelector
              control={form.control}
              homeTeamError={errors.homeTeamId?.message}
              awayTeamError={errors.awayTeamId?.message}
              homeTeamId={watchedValues.homeTeamId}
              awayTeamId={watchedValues.awayTeamId}
              getTeamById={getTeamById}
            />

            {errors.root && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 font-medium flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  {errors.root.message}
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 text-lg font-bold bg-gradient-to-r from-[#162456] to-blue-600 hover:from-blue-600 hover:to-[#162456] shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="mr-3 h-5 w-5" />
              {isSubmitting ? "Adicionando..." : "Adicionar jogo"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
