"use client";

import type { MemberFederation } from "@/types/cards.types";
import { X, Info, ChevronRight, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CardProps {
  data: MemberFederation;
}

const ModernProfessionalCard = ({ data }: CardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Função para lidar com erro de imagem
  const handleImageError = () => {
    setImageError(true);
  };

  // Função para renderizar imagem ou placeholder
  const renderImage = () => {
    if (imageError || !data.image) {
      return (
        <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
          <User className="w-16 h-16 text-slate-400" />
        </div>
      );
    }

    return (
      <Image
        src={data.image}
        alt={`Professional photo of ${data.name}`}
        fill
        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 40vw"
        priority
        onError={handleImageError}
      />
    );
  };

  return (
    <div className="group relative h-[500px] lg:h-[550px] w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-xl sm:shadow-2xl transition-all duration-500 hover:shadow-2xl sm:hover:shadow-3xl hover:scale-[1.01]">
      <div className="relative h-full w-full">
        {renderImage()}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
        <div className="flex items-end justify-between">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight mb-2 drop-shadow-lg line-clamp-2">
              {data.name}
            </h3>
            <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
              {Array.isArray(data.jobFunction) ? (
                data.jobFunction.map((job, index) => (
                  <span
                    key={index}
                    className={`inline-block bg-white/20 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 text-xs font-medium border border-white/30 line-clamp-1 ${
                      index === 0 ? "" : "hidden sm:inline-block"
                    }`}
                  >
                    {job}
                  </span>
                ))
              ) : (
                <span className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 text-xs font-medium border border-white/30 line-clamp-1">
                  {data.jobFunction}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
          showDetails ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`h-full w-full bg-gradient-to-br from-[#162456]/95 via-[#162456]/90 to-[#162456]/95 backdrop-blur-md transform transition-transform duration-700 ease-in-out ${
            showDetails ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col justify-between p-4 sm:p-6 text-white">
            <div className="flex-1">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-3 leading-tight">
                  {data.name}
                </h3>
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  {Array.isArray(data.jobFunction) ? (
                    data.jobFunction.map((job, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-blue-300 flex-shrink-0" />
                        <p className="text-slate-200 font-medium text-base leading-relaxed">
                          {job}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-blue-300 flex-shrink-0" />
                      <p className="text-slate-200 font-medium text-base leading-relaxed">
                        {data.jobFunction}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <p className="text-slate-100 leading-relaxed text-balance text-sm">
                  {data.history}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowDetails(false)}
              className="self-end mt-4 flex items-center gap-2 bg-white/10 hover:bg-white/20 active:bg-white/25 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 sm:py-3 text-white font-medium transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation min-h-[44px]"
              aria-label="Fechar detalhes"
            >
              <X size={16} color="white" />
              <span className="text-sm">Fechar</span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-2">
        <button
          onClick={() => setShowDetails(true)}
          className={`group/btn flex items-center gap-1.5 sm:gap-2 bg-white/10 hover:bg-white/20 active:bg-white/25 backdrop-blur-md border border-white/30 rounded-full px-3 sm:px-4 py-2 text-white font-medium transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation min-h-[40px] sm:min-h-[44px] ${
            showDetails ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          aria-label="Ver mais detalhes"
        >
          <Info size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm hidden xs:inline">
            Saiba mais
          </span>
          <span className="text-xs sm:text-sm xs:hidden">Mais</span>
          <ChevronRight
            size={12}
            className="sm:w-[14px] sm:h-[14px] transition-transform duration-300 group-hover/btn:translate-x-0.5"
          />
        </button>
      </div>
      <div className="absolute top-0 left-0 h-24 w-24 sm:h-32 sm:w-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-x-12 sm:-translate-x-16 -translate-y-12 sm:-translate-y-16 blur-xl" />
      <div className="absolute bottom-0 right-0 h-16 w-16 sm:h-24 sm:w-24 bg-gradient-to-tl from-[#162456]/30 to-transparent rounded-full translate-x-8 sm:translate-x-12 translate-y-8 sm:translate-y-12 blur-lg" />
    </div>
  );
};

export default ModernProfessionalCard;
