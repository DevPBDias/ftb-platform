"use client";

import ModernProfessionalCard from "./ProfessionalCard";
import EmptyState from "./EmptyState";
import { useMembers } from "@/hooks/useMembers";

const Mentions = () => {
  const { mentions, loading, error } = useMembers();

  const renderContent = () => {
    if (loading) {
      return (
        <EmptyState
          title="Carregando menções..."
          message="Aguarde enquanto buscamos as menções honrosas."
          type="loading"
        />
      );
    }

    if (error) {
      return (
        <EmptyState
          title="Erro ao carregar menções"
          message={`Não foi possível carregar as menções: ${error}`}
          type="error"
        />
      );
    }

    if (mentions.length === 0) {
      return (
        <EmptyState
          title="Nenhuma menção honrosa encontrada"
          message="Ainda não há menções honrosas cadastradas."
          type="empty"
        />
      );
    }

    return (
      <>
        <section className="hidden lg:grid grid-cols-3 items-center justify-center w-full gap-8">
          {mentions.map((member, index) => (
            <ModernProfessionalCard key={member.id || index} data={member} />
          ))}
        </section>
        <section className="lg:hidden grid grid-cols-1 md:grid-cols-2 items-center justify-center w-full gap-8">
          {mentions.map((member, index) => (
            <ModernProfessionalCard key={member.id || index} data={member} />
          ))}
        </section>
      </>
    );
  };

  return (
    <div className="flex flex-col items-start justify-center w-full px-[5%] 2xl:px-[10%] my-24 gap-6">
      <h3 className="text-4xl font-bold">Menções honrosas</h3>
      {renderContent()}
    </div>
  );
};

export default Mentions;
