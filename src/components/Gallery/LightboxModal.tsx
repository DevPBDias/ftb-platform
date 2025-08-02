import * as motion from "motion/react-client";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";

import { StaticImageData } from "next/image";

interface GalleryImage {
  src: string | StaticImageData;
  alt: string;
  title: string;
  description: string;
  category?: string;
}

interface LightboxModalProps {
  isOpen: boolean;
  selectedImage: number | null;
  images: GalleryImage[];
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}

export function LightboxModal({ 
  isOpen, 
  selectedImage, 
  images, 
  onClose, 
  onNavigate 
}: LightboxModalProps) {
  if (!isOpen || selectedImage === null) return null;

  const currentImage = images[selectedImage];

  const handleDownload = () => {
    if (typeof currentImage.src === 'string') {
      const link = document.createElement('a');
      link.href = currentImage.src;
      link.download = currentImage.title;
      link.click();
    } else {
      // Para StaticImageData, podemos tentar converter para blob
      fetch(currentImage.src.src)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = currentImage.title;
          link.click();
          window.URL.revokeObjectURL(url);
        });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentImage.title,
          text: currentImage.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      // Fallback para copiar URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="relative max-w-6xl max-h-[90vh] w-full">
        {/* Close Button */}
        <button
          className="absolute -top-12 right-0 p-2 text-white hover:text-yellow-400 transition-colors duration-300 z-10"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Navigation Buttons */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors duration-300 z-10"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate("prev");
          }}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors duration-300 z-10"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate("next");
          }}
        >
          <ChevronRight size={24} />
        </button>

        {/* Image */}
        <motion.div
          className="relative w-full h-[70vh] rounded-2xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={currentImage.src || "/placeholder.svg"}
            alt={currentImage.alt}
            fill
            className="object-contain"
            sizes="90vw"
          />
        </motion.div>

        {/* Image Info */}
        <motion.div
          className="mt-6 text-center text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {currentImage.category && (
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm rounded-full px-4 py-2 mb-3">
              <span className="text-yellow-400 text-sm font-medium">
                {currentImage.category}
              </span>
            </div>
          )}
          <h3 className="text-2xl font-bold mb-2">{currentImage.title}</h3>
          <p className="text-white/80 mb-4">{currentImage.description}</p>
          
        </motion.div>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
          {selectedImage + 1} / {images.length}
        </div>
      </div>
    </motion.div>
  );
} 