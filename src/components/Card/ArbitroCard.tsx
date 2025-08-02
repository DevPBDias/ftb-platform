"use client";

import { motion } from "motion/react";
import { User, Award, Calendar, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArbitroFetchResponse } from "@/types/referee.types";
import userPhoto from "@/assets/error-image.png";

interface ArbitroCardProps {
  arbitro: ArbitroFetchResponse;
  onEdit?: (arbitro: ArbitroFetchResponse) => void;
  onDelete?: (arbitro: ArbitroFetchResponse) => void;
  showActions?: boolean;
  className?: string;
}

export function ArbitroCard({ 
  arbitro, 
  onEdit, 
  onDelete, 
  showActions = false,
  className = "" 
}: ArbitroCardProps) {
  return (
    <motion.div
      className={`relative group w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Image
        src={arbitro.photo || userPhoto}
        alt={`Árbitro ${arbitro.name}`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
      />
      
      {/* Overlay com informações no hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-3 md:p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h4 className="text-sm md:text-base font-bold truncate">
          {arbitro.name}
        </h4>
        <p className="text-xs md:text-sm font-normal mt-1">
          {arbitro.experience} - {arbitro.years}{" "}
          {arbitro.years > 1 ? "anos" : "ano"}
        </p>
        
        {/* Botões de ação no hover */}
        {showActions && onEdit && onDelete && (
          <div className="flex gap-2 mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(arbitro);
              }}
              className="h-8 w-8 p-0 bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(arbitro);
              }}
              className="h-8 w-8 p-0 bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      {/* Nome sempre visível na parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center py-2 px-1 md:px-2 text-xs md:text-sm font-semibold group-hover:opacity-0 transition-opacity duration-300">
        {arbitro.name}
      </div>
    </motion.div>
  );
} 