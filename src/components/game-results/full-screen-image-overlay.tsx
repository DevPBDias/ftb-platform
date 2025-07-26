"use client";

import Image from "next/image";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FullScreenImageOverlayProps {
  imageUrl: string;
  onClose: () => void;
}

export function FullScreenImageOverlay({
  imageUrl,
  onClose,
}: FullScreenImageOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose} // Fecha ao clicar fora da imagem
      role="dialog"
      aria-modal="true"
      aria-label="Visualização em tela cheia da imagem do jogo"
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white/20 z-50"
        onClick={onClose}
        aria-label="Fechar"
      >
        <XIcon className="h-6 w-6" />
      </Button>
      <div
        className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()} // Impede que o clique na imagem feche o overlay
      >
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt="Imagem do jogo em tela cheia"
          layout="fill" // Preenche o contêiner
          objectFit="contain" // Garante que a imagem se ajuste sem cortar
          className="rounded-lg shadow-lg"
          priority // Prioriza o carregamento da imagem
        />
      </div>
    </div>
  );
}
