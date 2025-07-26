import { z } from "zod";

export const gameFormSchema = z
  .object({
    gender: z.string().min(1, "Selecione um gênero"),
    category: z.string().min(1, "Selecione uma categoria"),
    championshipId: z.string().min(1, "Selecione um campeonato"),
    date: z
      .string()
      .min(1, "Selecione uma data")
      .refine((date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      }, "A data não pode ser no passado"),
    time: z
      .string()
      .min(1, "Selecione um horário")
      .regex(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Formato de horário inválido"
      ),
    homeTeamId: z.string().min(1, "Selecione o time da casa"),
    awayTeamId: z.string().min(1, "Selecione o time visitante"),
  })
  .refine((data) => data.homeTeamId !== data.awayTeamId, {
    message: "Os times da casa e visitante devem ser diferentes",
    path: ["awayTeamId"],
  });

export type GameFormData = z.infer<typeof gameFormSchema>;
