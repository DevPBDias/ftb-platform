"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonTable } from "./person-table";
import { useTeamFormContext } from "@/context/team-form-context";

export const SummaryCard = React.memo(function SummaryCard() {
  const {
    teamName,
    teamCategory,
    people,
    allPeople,
    editingPersonId,
    editingPersonRole,
    editName,
    setEditName,
    editDocument,
    setEditDocument,
    startEditing,
    saveEditing,
    cancelEditing,
    handleDelete,
    handleSubmitRelation,
  } = useTeamFormContext();

  const handleFullSubmission = () => {
    handleSubmitRelation({
      teamName,
      teamCategory,
      people,
    });
  };

  return (
    <Card className="h-fit rounded-xl shadow-lg border-none">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-gray-800">
          Relação da Equipe
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-base">
        {teamName && (
          <div className="flex items-baseline gap-2">
            <p className="font-semibold text-gray-700">Nome da Equipe:</p>
            <p className="text-gray-900 font-bold">{teamName}</p>
          </div>
        )}

        {teamCategory && (
          <div className="flex items-baseline gap-2">
            <p className="font-semibold text-gray-700">Categoria:</p>
            <p className="text-gray-900 font-bold">{teamCategory}</p>
          </div>
        )}

        <PersonTable
          title="Membros da Equipe"
          data={allPeople}
          editingPersonId={editingPersonId}
          editingPersonRole={editingPersonRole}
          editName={editName}
          setEditName={setEditName}
          editDocument={editDocument}
          setEditDocument={setEditDocument}
          startEditing={startEditing}
          saveEditing={saveEditing}
          cancelEditing={cancelEditing}
          handleDelete={handleDelete}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button
            onClick={handleFullSubmission}
            variant="ftb"
            className="rounded-lg px-6 py-2"
          >
            Enviar relação
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});
