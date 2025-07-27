"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase-client";
import { collection, addDoc } from "firebase/firestore";
import { format } from "date-fns";
import { DateTimeSection } from "./date-time-section";
import { ChampionshipTeamSection } from "./championship-section";
import { CategoryLocationTypeSection } from "./category-location-type-section";
import { ImageUploadSection } from "./img-upload";
import { SubmissionStatus } from "./submission-status";
import { formSchema, FormValues } from "@/schemas/game-register.schema";

const championships = [
  { id: "camp1", name: "Campeonato Nacional 2024" },
  { id: "camp2", name: "Liga Regional de Verão" },
  { id: "camp3", name: "Torneio Intercolegial" },
];

const teamsByChampionship: Record<string, string[]> = {
  camp1: ["Lakers", "Celtics", "Warriors", "Bulls", "Knicks"],
  camp2: ["Falcons", "Eagles", "Sharks", "Wolves"],
  camp3: ["Colégio A", "Colégio B", "Colégio C", "Colégio D"],
};

export default function GameResultForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      time: "",
      team1Score: 0,
      team2Score: 0,
      category: "",
      location: "",
      gameType: "",
      gameImage: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const selectedChampionship = watch("championshipId");
  const [availableTeams, setAvailableTeams] = useState<string[]>([]);
  const [submissionMessage, setSubmissionMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Efeito para carregar os times quando o campeonato selecionado muda
  useEffect(() => {
    if (selectedChampionship) {
      setAvailableTeams(teamsByChampionship[selectedChampionship] || []);
      setValue("team1Name", "");
      setValue("team2Name", "");
    } else {
      setAvailableTeams([]);
    }
  }, [selectedChampionship, setValue]);

  const onSubmit = async (data: FormValues) => {
    setSubmissionMessage(null);
    const imageUrl: string | null = null;

    try {
      const gameData = {
        date: format(data.date, "yyyy-MM-dd"),
        time: data.time,
        championshipId: data.championshipId,
        team1Name: data.team1Name,
        team1Score: data.team1Score,
        team2Name: data.team2Name,
        team2Score: data.team2Score,
        category: data.category,
        location: data.location,
        gameType: data.gameType,
        imageUrl: imageUrl,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "gameResults"), gameData);
      console.log(
        "Dados do Formulário Validados e Salvos no Firestore:",
        gameData
      );
      setSubmissionMessage({
        type: "success",
        message: "Partida registrada com sucesso!",
      });
      form.reset();
    } catch (error) {
      console.error("Erro ao registrar partida:", error);
      setSubmissionMessage({
        type: "error",
        message: "Erro ao registrar partida. Tente novamente.",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Registrar Resultado da Partida</CardTitle>
        <CardDescription>
          Preencha os detalhes da partida de basquete.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <DateTimeSection control={control} errors={errors} />
          <ChampionshipTeamSection
            control={control}
            register={register}
            errors={errors}
            championships={championships}
            selectedChampionship={selectedChampionship}
            availableTeams={availableTeams}
          />
          <CategoryLocationTypeSection
            control={control}
            register={register}
            errors={errors}
          />
          <ImageUploadSection register={register} errors={errors} />

          <SubmissionStatus message={submissionMessage} />

          <CardFooter className="flex justify-end p-0 pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registrando..." : "Registrar Partida"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
