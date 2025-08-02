import Image from "next/image"
import { cn } from "@/lib/utils"

interface TimelineMediaCardProps {
  monthYear: string
  imageSrc: string
  imageAlt: string
  className?: string
}

export function TimelineMediaCard({ monthYear, imageSrc, imageAlt, className }: TimelineMediaCardProps) {
  return (
    <div className={cn("flex flex-col items-center w-full", className)}>
      {" "}
      {/* Adicionado max-w-xl aqui */}
      {/* Pílula de Data */}
      <div className="px-4 py-2 rounded-full text-white text-sm font-semibold shadow-md bg-gradient-to-r from-timeline-line-start to-timeline-line-end mb-4">
        {monthYear}
      </div>
      {/* Imagem Retangular */}
      <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden shadow-md">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  )
}
