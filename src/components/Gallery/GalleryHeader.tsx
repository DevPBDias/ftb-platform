import * as motion from "motion/react-client";
import { Camera } from "lucide-react";

interface GalleryHeaderProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export function GalleryHeader({ 
  title = "Galeria de Fotos",
  subtitle = "Momentos Especiais",
  description = "Reviva os melhores momentos do basquete tocantinense através de nossa coleção de imagens"
}: GalleryHeaderProps) {
  return (
    <motion.div
      className="text-center mb-12 lg:mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#162456]/10 to-blue-500/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
        <Camera size={20} className="text-[#162456]" />
        <span className="text-[#162456] font-medium">
          {subtitle}
        </span>
      </div>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#162456] mb-4">
        {title}
      </h2>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto">
        {description}
      </p>
    </motion.div>
  );
} 