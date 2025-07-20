"use client";

import * as motion from "motion/react-client";
import Image from "next/image";
import { useState } from "react";
import {
  Camera,
  Expand,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
} from "lucide-react";
import { galleryImages } from "@/constants/galleryData";

const ModernPhotosGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return;

    if (direction === "prev") {
      setSelectedImage(
        selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1
      );
    } else {
      setSelectedImage(
        selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1
      );
    }
  };

  return (
    <>
      <section className="w-full py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
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
                Momentos Especiais
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#162456] mb-4">
              Galeria de{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Fotos
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Reviva os melhores momentos do basquete tocantinense através de
              nossa coleção de imagens
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6 auto-rows-[200px] lg:auto-rows-[250px]">
            {/* Image 1 - Small */}
            <motion.div
              className="md:col-span-2 lg:col-span-2 lg:row-span-1 group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              onClick={() => openLightbox(0)}
              whileHover={{ y: -8 }}
            >
              <Image
                src={galleryImages[0].src || "/placeholder.svg"}
                alt={galleryImages[0].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <h3 className="font-bold text-lg mb-1">
                  {galleryImages[0].title}
                </h3>
                <p className="text-sm text-white/80">
                  {galleryImages[0].description}
                </p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <Expand size={16} className="text-white" />
                </div>
              </div>
            </motion.div>

            {/* Image 2 - Small */}
            <motion.div
              className="md:col-span-2 lg:col-span-2 lg:row-span-1 group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              onClick={() => openLightbox(1)}
              whileHover={{ y: -8 }}
            >
              <Image
                src={galleryImages[1].src || "/placeholder.svg"}
                alt={galleryImages[1].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <h3 className="font-bold text-lg mb-1">
                  {galleryImages[1].title}
                </h3>
                <p className="text-sm text-white/80">
                  {galleryImages[1].description}
                </p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <Expand size={16} className="text-white" />
                </div>
              </div>
            </motion.div>

            {/* Image 3 - Large (Hero) */}
            <motion.div
              className="md:col-span-4 lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              onClick={() => openLightbox(2)}
              whileHover={{ y: -8 }}
            >
              <Image
                src={galleryImages[2].src || "/placeholder.svg"}
                alt={galleryImages[2].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <div className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
                  <span className="text-yellow-400 text-sm font-medium">
                    {galleryImages[2].category}
                  </span>
                </div>
                <h3 className="font-bold text-2xl mb-2">
                  {galleryImages[2].title}
                </h3>
                <p className="text-white/90">{galleryImages[2].description}</p>
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                  <Expand size={20} className="text-white" />
                </div>
              </div>
            </motion.div>

            {/* Image 4 - Medium */}
            <motion.div
              className="md:col-span-2 lg:col-span-2 lg:row-span-1 group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              onClick={() => openLightbox(3)}
              whileHover={{ y: -8 }}
            >
              <Image
                src={galleryImages[3].src || "/placeholder.svg"}
                alt={galleryImages[3].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <h3 className="font-bold text-lg mb-1">
                  {galleryImages[3].title}
                </h3>
                <p className="text-sm text-white/80">
                  {galleryImages[3].description}
                </p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <Expand size={16} className="text-white" />
                </div>
              </div>
            </motion.div>

            {/* Image 5 - Medium */}
            <motion.div
              className="md:col-span-2 lg:col-span-2 lg:row-span-1 group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              onClick={() => openLightbox(4)}
              whileHover={{ y: -8 }}
            >
              <Image
                src={galleryImages[4].src || "/placeholder.svg"}
                alt={galleryImages[4].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <h3 className="font-bold text-lg mb-1">
                  {galleryImages[4].title}
                </h3>
                <p className="text-sm text-white/80">
                  {galleryImages[4].description}
                </p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <Expand size={16} className="text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            {/* Close Button */}
            <button
              className="absolute -top-12 right-0 p-2 text-white hover:text-yellow-400 transition-colors duration-300"
              onClick={closeLightbox}
            >
              <X size={24} />
            </button>

            {/* Image */}
            <motion.div
              className="relative w-full h-[70vh] rounded-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={galleryImages[selectedImage].src || "/placeholder.svg"}
                alt={galleryImages[selectedImage].alt}
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
              <div className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm rounded-full px-4 py-2 mb-3">
                <span className="text-yellow-400 text-sm font-medium">
                  {galleryImages[selectedImage].category}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {galleryImages[selectedImage].title}
              </h3>
              <p className="text-white/80 mb-4">
                {galleryImages[selectedImage].description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ModernPhotosGallery;
