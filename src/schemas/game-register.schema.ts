import { z } from "zod";

export const formSchema = z
  .object({
    date: z.date({
      required_error: "A data da partida é obrigatória.",
      invalid_type_error: "Formato de data inválido.",
    }),
    time: z.string().min(1, "A hora da partida é obrigatória."),
    championshipId: z.string().min(1, "O campeonato é obrigatório."),
    team1Name: z.string().min(1, "O nome do Time 1 é obrigatório."),
    team1Score: z.coerce
      .number()
      .min(0, "A pontuação do Time 1 não pode ser negativa."),
    team2Name: z.string().min(1, "O nome do Time 2 é obrigatório."),
    team2Score: z.coerce
      .number()
      .min(0, "A pontuação do Time 2 não pode ser negativa."),
    category: z.string().min(1, "A categoria é obrigatória."),
    location: z.string().min(1, "O local é obrigatório."),
    gameType: z.string().min(1, "O tipo de jogo é obrigatório."),
    gameImage: z.any().optional(), // Campo de arquivo opcional
  })
  .refine((data) => data.team1Name !== data.team2Name, {
    message: "Os times não podem ser os mesmos.",
    path: ["team2Name"], // O erro será associado ao campo team2Name
  });

export type FormValues = z.infer<typeof formSchema>;
