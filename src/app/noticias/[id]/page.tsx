"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Hero/Navbar";
import bg_news from "@/assets/bg-about2.png";
import Link from "next/link";
import * as motion from "motion/react-client";
import { Instagram } from "lucide-react";
import { formatDate } from "@/utils/formatterDate";
import LoadingThreeDotsJumping from "@/components/loading/LoadingBalls";
import { useFetchById } from "@/hooks/useFecthById";
import { NoticiaData } from "@/types/news.types";

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
  if (!noticia) return <p>Árbitro não encontrado.</p>;

  return (
    <main className="flex flex-col items-center justify-center w-full">
      <section className="relative w-full lg:h-[100dvh] flex flex-col items-center justify-center">
        <picture className="w-full h-full ">
          <Image
            src={noticia?.image ?? bg_news}
            alt="Image of a player holding a basketball in the middle of a park"
            className="w-full h-full object-cover"
            priority
            fill
          />
        </picture>
        <Navbar />
        <motion.div
          className="absolute top-0 left-0 flex flex-col items-center justify-center px-4 2xl:px-[20%] text-white gap-10 mt-4 py-8 w-full"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: [0, 0.71, 0.2, 1.01] }}
        >
          <div className="flex flex-col items-start justify-start gap-4 w-full p-4 lg:p-8 bg-blue-950/80 rounded-lg mt-28">
            <h3 className="font-bold text-xl lg:text-3xl">{noticia?.titulo}</h3>
            <div className="flex flex-col items-start justify-between gap-4 w-full">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                <span className="text-sm lg:text-base font-medium">
                  Local: {noticia?.local}
                </span>
                <span className="hidden lg:flex text-base font-medium">-</span>
                <span className="text-sm lg:text-base font-normal">
                  Organizador: Federação Tocantinense de Basketball
                </span>
              </div>
            </div>
            {noticia?.datas && noticia.datas.length > 0 && (
              <div className="flex items-center gap-4">
                <span className="text-sm lg:text-base font-medium">
                  Datas: {noticia.datas.map(formatDate).join(", ")}
                </span>
              </div>
            )}
            <p className="text-base lg:text-lg mt-8">{noticia?.descricao}</p>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 w-full mt-8">
              <Link
                href={`https://www.instagram.com/basquetetocantins/`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full lg:w-80 flex items-center justify-center gap-2 bg-yellow-500 rounded-lg py-3 px-4 hover:bg-yellow-600 hover:scale-105 transition-all duration-300 ease-in-out shadow-lg"
              >
                <Instagram size={18} color="black" />
                <p className="font-bold text-sm lg:text-lg text-black">
                  Siga-nos no Instagram
                </p>
              </Link>
              <button
                onClick={() => route.back()}
                className="flex w-full lg:w-80 items-center justify-center gap-2 bg-transparent rounded-lg border border-white py-3 px-4 hover:scale-105 transition-all duration-300 ease-in-out shadow-lg"
              >
                <p className="font-bold text-sm lg:text-lg text-white">
                  Voltar para as noticias
                </p>
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
