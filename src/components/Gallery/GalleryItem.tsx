import * as motion from "motion/react-client";
import Image from "next/image";
import { Expand } from "lucide-react";

import { StaticImageData } from "next/image";

interface GalleryImage {
  src: string | StaticImageData;
  alt: string;
  title: string;
  description: string;
  category?: string;
}

interface GalleryItemProps {
  image: GalleryImage;
  index: number;
  className?: string;
  onImageClick: (index: number) => void;
  delay?: number;
}

export function GalleryItem({ 
  image, 
  index, 
  className = "", 
  onImageClick, 
  delay = 0 
}: GalleryItemProps) {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      onClick={() => onImageClick(index)}
      whileHover={{ y: -8 }}
    >
      <Image
        src={image.src || "/placeholder.svg"}
        alt={image.alt}
        fill
        className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
        {image.category && (
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm rounded-full px-3 py-1 mb-2">
            <span className="text-yellow-400 text-sm font-medium">
              {image.category}
            </span>
          </div>
        )}
        <h3 className="font-bold text-lg mb-1">{image.title}</h3>
        <p className="text-sm text-white/80">{image.description}</p>
      </div>
      
      {/* Expand Icon */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="p-2 bg-black/30 backdrop-blur-sm rounded-full">
          <Expand size={16} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
} 