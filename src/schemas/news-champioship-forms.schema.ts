import { z } from "zod";

export const contentSchema = z.object({
  titulo: z
    .string()
    .min(5, { message: "Título must be at least 5 characters." })
    .max(255, { message: "Título must be at most 255 characters." }),
  descricao: z
    .string()
    .min(10, { message: "Descrição must be at least 10 characters." })
    .max(2000, { message: "Descrição must be at most 2000 characters." }),
  // 'datas' agora é um array de strings no formato YYYY-MM-DD
  datas: z
    .array(
      z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Data inválida. Use o formato YYYY-MM-DD.",
      })
    )
    .min(1, { message: "Pelo menos uma data é obrigatória." }),
  local: z
    .string()
    .min(3, { message: "Local must be at least 3 characters." })
    .max(255, { message: "Local must be at most 255 characters." }),
  image: z
    .string()
    .url({ message: "Invalid image URL." })
    .optional()
    .or(z.literal("")), // Allow empty string for optional
});

export const formTypeSchema = z.enum(["noticia", "competicao"], {
  errorMap: () => ({
    message: "Please select a type (Notícia or Competição).",
  }),
});

// Para o input do formulário (react-hook-form), 'datas' será um array de Date objects
export const formInputSchema = z.object({
  type: formTypeSchema,
  titulo: contentSchema.shape.titulo,
  descricao: contentSchema.shape.descricao,
  datas: z
    .array(z.date())
    .min(1, { message: "Pelo menos uma data é obrigatória." }), // Agora espera Date objects
  local: contentSchema.shape.local,
  image: contentSchema.shape.image,
});
