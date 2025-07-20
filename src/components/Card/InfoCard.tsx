"use client";

import * as motion from "motion/react-client";
import { PlusCircle, Calendar, MapPin, Clock } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/formatterDate";
import { InfoCardProps } from "@/types/cards.types";

const ModernInfoCard = ({
  data,
  type = "noticias",
  index = 0,
}: InfoCardProps) => {
  const formattedDate = formatDate(data.datas?.[0]) || "Data a definir";
  const imageUrl =
    !data.image || data.image === ""
      ? "/placeholder.svg?height=250&width=400&text=Imagem+Padrão"
      : data.image;

  const isCompetition = type === "competicoes";

  return (
    <motion.section
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200/50 hover:border-slate-300/50 flex flex-col h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
        <Image
          src={(imageUrl as string | StaticImageData) || "/placeholder.svg"}
          alt={data.titulo}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-4 left-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg backdrop-blur-sm ${
              isCompetition
                ? "bg-gradient-to-r from-green-500/90 to-emerald-600/90"
                : "bg-gradient-to-r from-[#162456]/90 to-blue-600/90"
            }`}
          >
            {isCompetition ? <Calendar size={12} /> : <Clock size={12} />}
            {isCompetition ? "Competição" : "Notícia"}
          </span>
        </div>

        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white bg-black/50 backdrop-blur-sm">
            <Calendar size={12} />
            {formattedDate}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6 flex flex-col flex-1">
        <div className="flex-1 space-y-3">
          <h3 className="font-bold text-lg sm:text-xl text-[#162456] leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {data.titulo}
          </h3>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3">
            {data.descricao}
          </p>

          {data.local && (
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <MapPin size={16} className="flex-shrink-0" />
              <span className="truncate">{data.local}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4">
          <Link
            href={`/${type}/${data.id}`}
            className={`group/btn relative inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r ${
              type === "noticias"
                ? "from-[#162456] to-blue-600 hover:from-blue-600 hover:to-[#162456]"
                : "from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500"
            } text-white font-medium text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

            <PlusCircle
              size={18}
              className="relative z-10 transition-transform duration-300 group-hover/btn:rotate-90"
            />
            <span className="relative z-10 hidden sm:inline">Saiba mais</span>
            <span className="relative z-10 sm:hidden">Ver</span>
          </Link>

          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              {isCompetition ? "Evento" : "Publicado"}
            </p>
            <p className="text-sm font-medium text-slate-600">
              {data.datas?.length > 1
                ? `+${data.datas.length - 1} datas`
                : formattedDate}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#162456]/5 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.section>
  );
};

export default ModernInfoCard;
