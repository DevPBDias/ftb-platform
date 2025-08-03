"use client";

import { useState, useCallback, useMemo } from "react";

export interface Person {
  id: string;
  name: string;
  document: string;
  role: "player" | "coach" | "assistant"; // Added role property
}

export function useTeamForm() {
  const [teamName, setTeamName] = useState("");
  const [teamCategory, setTeamCategory] = useState("");
  const [championshipName, setChampionshipName] = useState("");
  // Consolidated state for all people (coach, assistants, players)
  const [people, setPeople] = useState<Person[]>([]);

  const [currentTeamInput, setCurrentTeamInput] = useState("");
  // Unified input states for adding any person
  const [currentPersonNameInput, setCurrentPersonNameInput] = useState("");
  const [currentPersonDocumentInput, setCurrentPersonDocumentInput] =
    useState("");
  const [currentPersonRoleInput, setCurrentPersonRoleInput] = useState<
    Person["role"] | ""
  >("");

  // State for generalized editing
  const [editingPersonId, setEditingPersonId] = useState<string | null>(null);
  const [editingPersonRole, setEditingPersonRole] = useState<
    Person["role"] | null
  >(null);
  const [editName, setEditName] = useState("");
  const [editDocument, setEditDocument] = useState("");

  const generateId = useCallback(
    () => Math.random().toString(36).substring(2, 11),
    []
  );

  const handleAddTeam = useCallback(() => {
    console.log("handleAddTeam chamado. currentTeamInput:", currentTeamInput); // Debug log
    if (currentTeamInput.trim()) {
      setTeamName(currentTeamInput.trim());
      setCurrentTeamInput("");
      console.log(
        "Time adicionado:",
        currentTeamInput.trim(),
        "Novo teamName:",
        teamName
      ); // Debug log
    }
  }, [currentTeamInput, teamName]);

  // Unified function to add any person (coach, assistant, player)
  const handleAddPerson = useCallback(() => {
    console.log(
      "handleAddPerson chamado. Name:",
      currentPersonNameInput,
      "Document:",
      currentPersonDocumentInput,
      "Role:",
      currentPersonRoleInput
    ); // Debug log
    if (currentPersonNameInput.trim() && currentPersonRoleInput) {
      const newPerson: Person = {
        id: generateId(),
        name: currentPersonNameInput.trim(),
        document: currentPersonDocumentInput.trim() || "Não Informado",
        role: currentPersonRoleInput,
      };
      setPeople((prev) => {
        const updatedPeople = [...prev, newPerson];
        console.log(
          "Pessoa adicionada:",
          newPerson,
          "Todas as pessoas:",
          updatedPeople
        ); // Debug log
        return updatedPeople;
      });
      setCurrentPersonNameInput("");
      setCurrentPersonDocumentInput("");
      setCurrentPersonRoleInput("");
    }
  }, [
    currentPersonNameInput,
    currentPersonDocumentInput,
    currentPersonRoleInput,
    generateId,
  ]);

  // Generalized delete function
  const handleDelete = useCallback((id: string, role: Person["role"]) => {
    setPeople((prev) => prev.filter((person) => person.id !== id));
    console.log(`Deletado: ${role} com ID ${id}`); // Log for debugging
  }, []);

  // Generalized start editing function
  const startEditing = useCallback((person: Person) => {
    setEditName(person.name);
    setEditDocument(person.document);
    setEditingPersonId(person.id);
    setEditingPersonRole(person.role);
    console.log(`Iniciando edição de: ${person.role} - ${person.name}`); // Log for debugging
  }, []);

  // Generalized save editing function
  const saveEditing = useCallback(() => {
    if (!editingPersonId || !editingPersonRole) return;

    const updatedPerson = {
      id: editingPersonId,
      name: editName,
      document: editDocument,
      role: editingPersonRole,
    };

    setPeople((prev) =>
      prev.map((p) => (p.id === editingPersonId ? updatedPerson : p))
    );

    setEditingPersonId(null);
    setEditingPersonRole(null);
    setEditName("");
    setEditDocument("");
    console.log(`Salvando edição de: ${editingPersonRole} - ${editName}`); // Log for debugging
  }, [editingPersonId, editingPersonRole, editName, editDocument]);

  // Generalized cancel editing function
  const cancelEditing = useCallback(() => {
    setEditingPersonId(null);
    setEditingPersonRole(null);
    setEditName("");
    setEditDocument("");
    console.log("Edição cancelada."); // Log for debugging
  }, []);

  // Combined and sorted list of all people for the unified table
  const allPeople = useMemo(() => {
    const roleOrder: Record<Person["role"], number> = {
      coach: 1,
      assistant: 2,
      player: 3,
    };
    const sortedPeople = [...people].sort(
      (a, b) => roleOrder[a.role] - roleOrder[b.role]
    );
    console.log("allPeople atualizado e ordenado:", sortedPeople); // Debug log
    return sortedPeople;
  }, [people]);

  return {
    teamName,
    setTeamName,
    teamCategory,
    setTeamCategory,
    championshipName,
    setChampionshipName,
    people, // Expose the consolidated people array
    currentTeamInput,
    setCurrentTeamInput,
    // Unified person input states
    currentPersonNameInput,
    setCurrentPersonNameInput,
    currentPersonDocumentInput,
    setCurrentPersonDocumentInput,
    currentPersonRoleInput,
    setCurrentPersonRoleInput,
    // Generalized editing states and functions
    allPeople, // New combined and sorted list
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
    // Exposed functions
    handleAddTeam,
    handleAddPerson, // Unified add function
  };
}
