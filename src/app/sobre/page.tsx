"use client";
import { FormSection } from "@/components/team-register/form-section";
import { SummaryCard } from "@/components/team-register/summary-card";
import { LoadingOverlay } from "@/components/loading/loading-overlay";
import ModernNavbar from "@/components/Hero/Navbar";
import {
  TeamFormProvider,
  useTeamFormContext,
} from "@/context/team-form-context";
import { SuccessModal } from "@/components/team-register/sucess-modal";

export default function TeamRegistrationForm() {
  return (
    <TeamFormProvider>
      <TeamRegistrationFormContent />
    </TeamFormProvider>
  );
}

// This component will consume the context
function TeamRegistrationFormContent() {
  const { isLoading, showSuccessModal, setShowSuccessModal } =
    useTeamFormContext();

  return (
    <div className="min-h-screen bg-white">
      <ModernNavbar />

      <main className="container mx-auto p-6 md:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FormSection /> {/* No props needed here */}
        <SummaryCard /> {/* No props needed here */}
      </main>

      {isLoading && <LoadingOverlay />}

      <SuccessModal isOpen={showSuccessModal} onClose={setShowSuccessModal} />
    </div>
  );
}
