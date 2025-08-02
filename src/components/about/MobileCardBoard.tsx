"use client";

import ModernProfessionalCard from "./ProfessionalCard";
import EmptyState from "./EmptyState";
import { useMembers } from "@/hooks/useMembers";

const MobileCardBoard = () => {
  const { members, loading, error } = useMembers();

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center p-8 col-span-full">
          <EmptyState
            title="Carregando membros..."
            message="Aguarde enquanto buscamos os membros da federação."
            type="loading"
          />
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center col-span-full">
          <EmptyState
            title="Erro ao carregar membros"
            message={`Não foi possível carregar os membros: ${error}`}
            type="error"
          />
        </div>
      );
    }

    if (members.length === 0) {
      return (
        <div className="text-center col-span-full">
          <EmptyState
            title="Nenhum membro encontrado"
            message="Ainda não há membros cadastrados."
            type="empty"
          />
        </div>
      );
    }

    return members.map((member, index) => (
      <ModernProfessionalCard key={member.id || index} data={member} />
    ));
  };

  return (
    <section className="lg:hidden grid grid-cols-1 md:grid-cols-2 items-center justify-center w-full px-4 gap-6 mt-8">
      {renderContent()}
    </section>
  );
};

export default MobileCardBoard;
