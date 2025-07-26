"use client";

import { useState, useCallback } from "react";
import type { Person } from "./use-team-form"; // Import Person interface

interface SubmissionData {
  teamName: string;
  teamCategory: string;
  people: Person[]; // Changed to a single 'people' array
}

export function useSubmissionStatus() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmitRelation = useCallback((data: SubmissionData) => {
    setIsLoading(true); // Show loading screen
    // Simulate API call
    setTimeout(() => {
      console.log("Dados do time enviados:", data);
      setIsLoading(false); // Hide loading screen
      setShowSuccessModal(true); // Show success modal
    }, 2000); // Simulate a 2-second network request
  }, []);

  return {
    isLoading,
    showSuccessModal,
    handleSubmitRelation,
    setShowSuccessModal,
  };
}
