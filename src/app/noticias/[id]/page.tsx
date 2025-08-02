"use client";

import { useParams, useRouter } from "next/navigation";
import LoadingThreeDotsJumping from "@/components/loading/LoadingBalls";
import { useFetchById } from "@/hooks/useFecthById";
import { NoticiaData } from "@/types/news.types";
import { ArticleLayout } from "@/components/ui/ArticleLayout";
import ModernNavbar from "@/components/Hero/Navbar";

export default function NoticiasDetailPage() {
  const route = useRouter();
  const params = useParams();
  const noticiaId = params.id as string;
  const {
    data: noticia,
    loading,
    error,
  } = useFetchById<NoticiaData>("noticias", noticiaId);

  if (loading) return <LoadingThreeDotsJumping />;
  if (error) return <p className="text-red-500">Erro: {error}</p>;
  if (!noticia) return <p>Notícia não encontrada.</p>;

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <ModernNavbar />
    <ArticleLayout
      article={{
        titulo: noticia.titulo,
        descricao: noticia.descricao,
        datas: noticia.datas,
        local: noticia.local,
        image: typeof noticia.image === 'string' ? noticia.image : undefined,
      }}
      backButtonText="Voltar para as notícias"
      onBack={() => route.back()}
      />
      </main>
  );
}
