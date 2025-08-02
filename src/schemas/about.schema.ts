import { z } from "zod";

// Schema para membros/menções honrosas
export const memberSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  jobFunction: z.string().min(1, "Função é obrigatória"),
  history: z.string().min(1, "Histórico é obrigatório"),
  image: z.string().optional(),
  category: z.enum(["member", "mention"]).default("member"),
});

// Schema para histórias
export const historySchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  year: z.number().min(1900, "Ano deve ser maior que 1900"),
  event: z.string().optional(),
  description: z.string().min(1, "Descrição é obrigatória"),
  image: z.string().optional(),
});

// Tipos derivados dos schemas
export type MemberSchemaType = z.infer<typeof memberSchema>;
export type HistorySchemaType = z.infer<typeof historySchema>; 