"use client";

import { useParams, useRouter } from "next/navigation";
import LoadingThreeDotsJumping from "@/components/loading/LoadingBalls";
import { useFetchById } from "@/hooks/useFecthById";
import { CompeticaoData } from "@/types/new-competition";
import { ArticleLayout } from "@/components/ui/ArticleLayout";
import ModernNavbar from "@/components/Hero/Navbar";

export default function CompeticaoDetailPage() {
  const route = useRouter();
  const params = useParams();
  const competicaoId = params.id as string;
  const {
    data: competicao,
    loading,
    error,
  } = useFetchById<CompeticaoData>("competicoes", competicaoId);

  if (loading) return <LoadingThreeDotsJumping />;
  if (error) return <p className="text-red-500">Erro: {error}</p>;
  if (!competicao) return <p>Competição não encontrada.</p>;

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <ModernNavbar />
    <ArticleLayout
      article={{
        titulo: competicao.titulo,
        descricao: competicao.descricao,
        datas: competicao.datas,
        local: competicao.local,
        image: typeof competicao.image === 'string' ? competicao.image : undefined,
      }}
      backButtonText="Voltar para as competições"
      onBack={() => route.back()}
    />
    </main>
  );
}
