"use client";
import { FormSection } from "@/components/team-register/form-section";
import { SummaryCard } from "@/components/team-register/summary-card";
import { SuccessModal } from "@/components/team-register/sucess-modal";
import {
  TeamFormProvider,
  useTeamFormContext,
} from "@/context/team-form-context";
import ModernNavbar from "@/components/Hero/Navbar";
import LoadingTransparent from "@/components/loading/loading-overlay";

export default function TeamRegistrationForm() {
  return (
    <TeamFormProvider>
      <TeamRegistrationFormContent />
    </TeamFormProvider>
  );
}

function TeamRegistrationFormContent() {
  const { isLoading, showSuccessModal, setShowSuccessModal } =
    useTeamFormContext();

  return (
    <main className="">
      <ModernNavbar />

      <main className="container mx-auto p-6 md:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FormSection />
        <SummaryCard />
      </main>

      {isLoading && <LoadingTransparent />}

      <SuccessModal isOpen={showSuccessModal} onClose={setShowSuccessModal} />
    </main>
  );
}
