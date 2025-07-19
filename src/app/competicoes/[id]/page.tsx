"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import Navbar from "@/components/Hero/Navbar";
import bg_tournaments from "@/assets/kids_playing.png";
import MobileHeader from "@/components/header/MobileHeader";
import Link from "next/link";
import * as motion from "motion/react-client";
import { Instagram } from "lucide-react";
import { formatDate } from "@/utils/formatterDate";
import LoadingThreeDotsJumping from "@/app/loading";

interface CompeticaoData {
  id?: string;
  titulo: string;
  descricao: string;
  datas: string[];
  local: string;
  image?: string | StaticImageData | undefined;
}

export default function CompeticaoDetailPage() {
  const route = useRouter();
  const params = useParams(); // Obtém os parâmetros da URL
  const competicaoId = params.id as string; // O ID do competicao da URL
  const [competicao, setCompeticao] = useState<CompeticaoData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCompeticoes() {
      try {
        const response = await fetch("/api/competicoes");
        const data: CompeticaoData[] = await response.json();
        const competicaoData = data.find((team) => team.id === competicaoId);
        if (!competicaoData) {
          throw new Error("competicao não encontrado");
        }
        setCompeticao(competicaoData);
      } catch (e) {
        console.error("Erro ao buscar competicoes:", e);
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchCompeticoes();
  }, [competicaoId]);

  if (loading) {
    return <LoadingThreeDotsJumping />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-100 text-red-700">
        <p className="text-xl">Erro ao carregar competicoes: {error}</p>
      </div>
    );
  }

  if (!competicao) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-700 p-4">
        <p className="text-xl">competicao não encontrado.</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center w-full ">
      <section className="relative w-full lg:h-[100dvh] flex flex-col items-center justify-center">
        <section className="lg:hidden flex flex-col items-center justify-center w-full h-24 2xl:h-32"></section>
        <picture className="w-full h-full ">
          <Image
            src={competicao?.image ?? bg_tournaments}
            alt="Image of a player holding a basketball in the middle of a park"
            className="w-full h-full object-cover"
            priority
            fill
          />
        </picture>
        <Navbar />
        <MobileHeader />
        <motion.div
          className="absolute top-0 left-0 flex flex-col items-center justify-center px-4 2xl:px-[20%] text-white gap-10 mt-4 py-8 w-full"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: [0, 0.71, 0.2, 1.01] }}
        >
          <div className="flex flex-col items-start justify-start gap-4 w-full p-8 bg-blue-950/80 rounded-lg mt-28">
            <h3 className="font-bold text-3xl">{competicao?.titulo}</h3>
            <div className="flex flex-col items-start justify-between gap-4 w-full">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                <span className="text-sm lg:text-base font-medium">
                  Local: {competicao?.local}
                </span>
                <span className="hidden lg:text-base font-medium">-</span>
                <span className="text-sm lg:text-base font-normal">
                  Organizador: Federação Tocantinense de Basketball
                </span>
              </div>
            </div>
            {competicao?.datas && competicao.datas.length > 0 && (
              <div className="flex items-center gap-4">
                <span className="text-sm lg:text-base font-medium">
                  Datas: {competicao.datas.map(formatDate).join(", ")}
                </span>
              </div>
            )}
            <p className="text-base lg:text-lg mt-8">{competicao?.descricao}</p>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 w-full mt-8">
              <Link
                href={`https://www.instagram.com/ftb_tocantins/`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full lg:w-80 flex items-center gap-2 bg-yellow-500 rounded-lg py-3 px-4 hover:bg-yellow-600 hover:scale-105 transition-all duration-300 ease-in-out shadow-lg"
              >
                <Instagram size={18} color="black" />
                <p className="font-bold text-sm lg:text-lg text-black">
                  Siga-nos no Instagram
                </p>
              </Link>
              <button
                onClick={() => route.back()}
                className="w-full lg:w-80 flex items-center gap-2 bg-transparent rounded-lg border border-white py-3 px-4 hover:scale-105 transition-all duration-300 ease-in-out shadow-lg"
              >
                <p className="font-bold text-sm lg:text-lg text-white">
                  Voltar para as competições
                </p>
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
