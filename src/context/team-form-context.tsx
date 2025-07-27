"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useTeamForm, type Person } from "@/hooks/use-team-form";
import { useSubmissionStatus } from "@/hooks/use-submission-status";

interface TeamFormContextType {
  teamName: string;
  setTeamName: (value: string) => void;
  teamCategory: string;
  setTeamCategory: (value: string) => void;
  people: Person[];
  currentTeamInput: string;
  setCurrentTeamInput: (value: string) => void;
  currentPersonNameInput: string;
  setCurrentPersonNameInput: (value: string) => void;
  currentPersonDocumentInput: string;
  setCurrentPersonDocumentInput: (value: string) => void;
  currentPersonRoleInput: Person["role"] | "";
  setCurrentPersonRoleInput: (value: Person["role"] | "") => void;
  allPeople: Person[];
  editingPersonId: string | null;
  editingPersonRole: Person["role"] | null;
  editName: string;
  setEditName: (value: string) => void;
  editDocument: string;
  setEditDocument: (value: string) => void;
  handleAddTeam: () => void;
  handleAddPerson: () => void; // Unified add function
  handleDelete: (id: string, role: Person["role"]) => void; // Generalized delete
  startEditing: (person: Person) => void; // Generalized start editing
  saveEditing: () => void; // Generalized save editing
  cancelEditing: () => void; // Generalized cancel editing
  isLoading: boolean;
  showSuccessModal: boolean;
  handleSubmitRelation: (data: {
    teamName: string;
    teamCategory: string;
    people: Person[];
  }) => void; // Updated submission data
  setShowSuccessModal: (value: boolean) => void;
}

// Create the context with a default undefined value
const TeamFormContext = createContext<TeamFormContextType | undefined>(
  undefined
);

export function useTeamFormContext() {
  const context = useContext(TeamFormContext);
  if (context === undefined) {
    throw new Error(
      "useTeamFormContext must be used within a TeamFormProvider"
    );
  }
  return context;
}

interface TeamFormProviderProps {
  children: ReactNode;
}

export function TeamFormProvider({ children }: TeamFormProviderProps) {
  const teamForm = useTeamForm();
  const submissionStatus = useSubmissionStatus();

  const value = {
    ...teamForm,
    ...submissionStatus,
  };

  return (
    <TeamFormContext.Provider value={value}>
      {children}
    </TeamFormContext.Provider>
  );
}
