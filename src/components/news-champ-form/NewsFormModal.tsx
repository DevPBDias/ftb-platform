"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formInputSchema } from "@/schemas/news-champioship-forms.schema";
import { TypeRadioGroup } from "./type-radio-group";
import { TextareaField } from "./textarea-field";
import { TextInputField } from "./text-input-field";
import { MultiDateField } from "./multi-date-field";
import { toast } from "sonner";
import { NoticiasResponse } from "@/types/news.types";
import { CompeticaoData } from "@/types/new-competition";
import { format } from "date-fns";

type FormData = {
  type: "noticia" | "competicao";
  titulo: string;
  descricao: string;
  datas: Date[];
  local: string;
  image?: string;
};

interface NewsFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingItem?: NoticiasResponse | CompeticaoData | null;
  activeTab: "noticias" | "competicoes";
  onSubmit: (data: FormData) => Promise<void>;
}

export function NewsFormModal({
  open,
  onOpenChange,
  editingItem,
  activeTab,
  onSubmit,
}: NewsFormModalProps) {
  const methods = useForm<FormData>({
    resolver: zodResolver(formInputSchema),
    defaultValues: {
      type: activeTab === "noticias" ? "noticia" : "competicao",
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
    setValue,
    formState: { isSubmitting },
  } = methods;

  // Preencher formulário quando editingItem mudar
  React.useEffect(() => {
    if (editingItem) {
      setValue("titulo", editingItem.titulo);
      setValue("descricao", editingItem.descricao);
      setValue("local", editingItem.local);
      setValue("image", typeof editingItem.image === 'string' ? editingItem.image : "");
      
      // Converter strings de data para Date objects
      const dateObjects = editingItem.datas
        .map(dateStr => {
          // Garantir que a data seja válida
          const date = new Date(dateStr);
          return isNaN(date.getTime()) ? null : date;
        })
        .filter(date => date !== null) as Date[];
      setValue("datas", dateObjects);
    } else {
      // Resetar formulário quando não há item sendo editado
      reset({
        type: activeTab === "noticias" ? "noticia" : "competicao",
        titulo: "",
        descricao: "",
        datas: [],
        local: "",
        image: "",
      });
    }
  }, [editingItem, activeTab, setValue, reset]);

  const handleFormSubmit = async (data: FormData) => {
    try {
      await onSubmit(data);
      onOpenChange(false);
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao salvar item");
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? "Editar Item" : "Adicionar Novo Item"}
          </DialogTitle>
        </DialogHeader>
        
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
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

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : editingItem ? "Atualizar" : "Criar"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
} 