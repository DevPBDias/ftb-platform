"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import { useTeamFormContext } from "@/context/team-form-context";
import type { Person } from "@/types/person.types"; // Import Person interface

export const FormSection = React.memo(function FormSection() {
  const {
    currentTeamInput,
    setCurrentTeamInput,
    handleAddTeam,
    teamCategory,
    setTeamCategory,
    championshipName,
    setChampionshipName,
    currentPersonNameInput,
    setCurrentPersonNameInput,
    currentPersonDocumentInput,
    setCurrentPersonDocumentInput,
    currentPersonRoleInput,
    setCurrentPersonRoleInput,
    handleAddPerson,
  } = useTeamFormContext();

  const categories = [
    "Sub-10",
    "Sub-12",
    "Sub-14",
    "Sub-16",
    "Sub-18",
    "Adulto",
    "Veterano",
  ];

  const championships = [
    "Campeonato Tocantinense",
    "JETS",
    "Taça 13",
    "Eliminatórias 3x3 - JEBS",
    "Eliminatórias 5x5 - JEBS",
    "Eliminatórias 3x3 - JUBS",
    "Eliminatórias 5x5 - JUBS",
  ];

  const personRoles = ["coach", "assistant", "player"] as Person["role"][];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Inscreva o seu time aqui
      </h1>

      <div className="space-y-2">
        <label
          htmlFor="championship-name"
          className="text-lg font-medium text-gray-700"
        >
          Nome do Torneio
        </label>
        <Select
          onValueChange={(value) => setChampionshipName(value)}
          value={championshipName}
        >
          <SelectTrigger
            id="championship-name"
            className="w-full rounded-lg px-4 py-2 mt-2 border border-gray-300 focus:ring-2 focus:ring-gradient-orange-start focus:border-transparent transition-all duration-200"
          >
            <SelectValue placeholder="Selecione o torneio" />
          </SelectTrigger>
          <SelectContent>
            {championships.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Equipe e Categoria por Idade na mesma linha */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
        {/* Equipe */}
        <div className="space-y-2 w-full lg:w-2/3">
          <label
            htmlFor="team-name"
            className="text-lg font-medium text-gray-700"
          >
            Nome da equipe
          </label>
          <div className="flex gap-3 mt-2">
            <Input
              id="team-name"
              placeholder="Nome da equipe"
              value={currentTeamInput}
              onChange={(e) => setCurrentTeamInput(e.target.value)}
              className="flex-1 rounded-lg px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-gradient-orange-start focus:border-transparent transition-all duration-200"
            />
            <Button
              onClick={() => handleAddTeam()}
              variant="ftb"
              className="rounded-lg px-6 py-2 text-white"
            >
              Adicionar
            </Button>
          </div>
        </div>

        {/* Categoria por Idade */}
        <div className="space-y-2 w-full lg:w-1/3">
          <label
            htmlFor="team-category"
            className="text-lg font-medium text-gray-700"
          >
            Categoria por Idade
          </label>
          <Select
            onValueChange={(value) => setTeamCategory(value)}
            value={teamCategory}
          >
            <SelectTrigger
              id="team-category"
              className="w-full rounded-lg px-4 py-2 mt-2 border border-gray-300 focus:ring-2 focus:ring-gradient-orange-start focus:border-transparent transition-all duration-200"
            >
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Formulário Unificado de Pessoas */}
      <section className="space-y-2 w-full flex flex-col justify-center items-start">
        <label
          htmlFor="person-name"
          className="text-lg font-medium text-gray-700"
        >
          Adicionar Membro da Equipe
        </label>
        <div className="w-full flex flex-col items-center justify-start gap-4">
          <div className="w-full flex flex-col lg:flex-row items-center justify-start gap-4">
            <Input
              id="person-name"
              placeholder="Nome da pessoa"
              value={currentPersonNameInput}
              onChange={(e) => setCurrentPersonNameInput(e.target.value)}
              className="w-full lg:w-3/6 rounded-lg px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-gradient-orange-start focus:border-transparent transition-all duration-200"
            />
            <Input
              id="person-document"
              placeholder="Número do RG"
              value={currentPersonDocumentInput}
              onChange={(e) => setCurrentPersonDocumentInput(e.target.value)}
              className="w-full lg:w-2/6 rounded-lg px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-gradient-orange-start focus:border-transparent transition-all duration-200"
            />
            <div className="flex flex-col gap-2 w-full lg:w-1/6">
              <Select
                onValueChange={(value: Person["role"]) =>
                  setCurrentPersonRoleInput(value)
                }
                value={currentPersonRoleInput}
              >
                <SelectTrigger
                  id="person-role"
                  className="w-full rounded-lg px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-gradient-orange-start focus:border-transparent transition-all duration-200"
                >
                  <SelectValue placeholder="Função" />
                </SelectTrigger>
                <SelectContent>
                  {personRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role === "coach"
                        ? "Técnico"
                        : role === "assistant"
                        ? "Assistente"
                        : "Jogador"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full flex items-center gap-4 mt-4">
            <Button
              onClick={() => handleAddPerson()}
              variant="ftb"
              className="flex items-center gap-2 rounded-lg px-6 py-2"
            >
              Adicionar <UserPlus className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Obs: Adicione um membro por vez
            </span>
          </div>
        </div>
      </section>
    </div>
  );
});
