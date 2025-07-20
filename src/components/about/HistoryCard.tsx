"use client";

import * as motion from "motion/react-client";
import type { HistoryType } from "@/constants/historyData";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";

interface CardProps {
  data: HistoryType;
  index?: number;
}

const ModernHistoryCard = ({ data, index = 0 }: CardProps) => {
  const isEven = data.id % 2 === 0;

  return (
    <motion.div
      className="relative w-full max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div
        className={`flex ${
          isEven ? "lg:flex-row-reverse" : "lg:flex-row"
        } flex-col items-center justify-between w-full gap-8 lg:gap-16 py-8`}
      >
        <motion.div
          className={`flex flex-col items-start justify-start w-full lg:w-1/2 ${
            isEven ? "lg:pl-16" : "lg:pr-16"
          }`}
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 group hover:scale-[1.02] w-full">
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#162456] to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Calendar size={16} />
              {data.year}
            </motion.div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#162456] mb-4 leading-tight group-hover:text-blue-600 transition-colors duration-300">
              {data.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify mb-6">
              {data.description}
            </p>
            <div className="flex items-center gap-2 text-[#162456] font-medium text-sm group-hover:gap-3 transition-all duration-300">
              <Clock size={16} />
              <span>Marco histórico</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
          viewport={{ once: true }}
        >
          <div className="relative group">
            <div className="relative h-[300px] sm:h-[400px] lg:h-[420px] w-full overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500">
              <Image
                src={data.image || "/placeholder.svg?height=420&width=600"}
                alt={`Imagem histórica de ${data.year} - ${data.title}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <p className="text-sm font-medium bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                  {data.title} - {data.year}
                </p>
              </div>
            </div>
            <div className="absolute -inset-2 bg-gradient-to-br from-[#162456]/20 to-blue-500/20 rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ModernHistoryCard;
