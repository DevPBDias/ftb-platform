"use client";

import * as motion from "motion/react-client";
import ProfessionalCard from "./ProfessionalCard";
import EmptyState from "./EmptyState";
import { useMembers } from "@/hooks/useMembers";

const CardBoard = () => {
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
      <ProfessionalCard key={member.id || index} data={member} />
    ));
  };

  return (
    <motion.div
      className="absolute -bottom-3/6 left-0 w-full flex flex-col items-start justify-center p-9 gap-9 rounded-lg px-[5%] 2xl:px-[10%]"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        delay: 1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <section className="hidden lg:grid grid-cols-3 items-center justify-center w-full gap-8">
        {renderContent()}
      </section>
    </motion.div>
  );
};

export default CardBoard;
