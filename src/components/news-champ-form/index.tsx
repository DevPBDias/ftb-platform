"use client";

import * as React from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { z } from "zod";
import { format } from "date-fns";
import { useForm, FormProvider } from "react-hook-form"; // Importar FormProvider
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contentSchema,
  formInputSchema,
} from "@/schemas/news-champioship-forms.schema";
import { TypeRadioGroup } from "./type-radio-group";
import { TextareaField } from "./textarea-field";
import { TextInputField } from "./text-input-field";
import { MultiDateField } from "./multi-date-field";

// Importar os novos componentes de campo

// Definir o tipo para os dados do formulário com base no schema
type FormData = z.infer<typeof formInputSchema>;

export function ContentForm({ className }: React.ComponentProps<typeof Card>) {
  const methods = useForm<FormData>({
    resolver: zodResolver(formInputSchema),
    defaultValues: {
      type: "noticia",
      titulo: "",
      descricao: "",
      datas: [],
      local: "",
      image: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods;

  // Estado para mensagens de sucesso/erro da API
  const [apiMessage, setApiMessage] = React.useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset(); // Resetar o formulário após sucesso
      setApiMessage({ type: "success", text: "Conteúdo criado com sucesso!" });
      // Limpar a mensagem após alguns segundos
      const timer = setTimeout(() => setApiMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: FormData) => {
    setApiMessage(null); // Limpar mensagens anteriores
    try {
      // 1. Extrair o tipo e os dados do conteúdo
      const { type, ...contentData } = data;

      // 2. Converter Date objects para strings YYYY-MM-DD para validação e envio
      const formattedDates = contentData.datas.map((date) =>
        format(date, "yyyy-MM-dd")
      );

      // 3. Validar os dados do conteúdo contra o contentSchema
      const validatedContent = contentSchema.parse({
        ...contentData,
        datas: formattedDates,
      });

      const apiEndpoint = `/api/${type}s`; // e.g., /api/noticias or /api/competicoes

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedContent),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao enviar conteúdo.");
      }

      // A mensagem de sucesso será definida pelo useEffect após isSubmitSuccessful
    } catch (error) {
      setApiMessage({
        type: "error",
        text: (error as Error).message || "Ocorreu um erro inesperado.",
      });
    }
  };

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <CardTitle>Criar Notícia ou Competição</CardTitle>
        <CardDescription>
          Preencha os detalhes para criar uma nova notícia ou competição.
        </CardDescription>
      </CardHeader>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-6">
            {apiMessage && (
              <p
                className={cn("flex items-center gap-2 text-sm", {
                  "text-muted-foreground": apiMessage.type === "success",
                  "text-destructive": apiMessage.type === "error",
                })}
              >
                {apiMessage.type === "success" && <Check className="size-4" />}
                {apiMessage.text}
              </p>
            )}

            <TypeRadioGroup
              name="type"
              label="Tipo"
              required
              options={[
                { value: "noticia", label: "Notícia" },
                { value: "competicao", label: "Competição" },
              ]}
              disabled={isSubmitting}
            />

            <TextInputField
              name="titulo"
              label="Título"
              placeholder="Título da Notícia/Competição"
              required
              disabled={isSubmitting}
            />

            <TextareaField
              name="descricao"
              label="Descrição"
              placeholder="Descreva a notícia ou competição..."
              required
              disabled={isSubmitting}
            />

            <MultiDateField
              name="datas"
              label="Datas"
              required
              disabled={isSubmitting}
            />

            <TextInputField
              name="local"
              label="Local"
              placeholder="Ex: Ginásio Municipal, Online"
              required
              disabled={isSubmitting}
            />

            <TextInputField
              name="image"
              label="URL da Imagem (Opcional)"
              placeholder="https://exemplo.com/imagem.jpg"
              type="url"
              disabled={isSubmitting}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" size="sm" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar Conteúdo"}
            </Button>
          </CardFooter>
        </form>
      </FormProvider>
    </Card>
  );
}
