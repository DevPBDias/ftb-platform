"use client";

import { galleryImages } from "@/constants/galleryData";
import { GalleryHeader } from "./GalleryHeader";
import { GalleryItem } from "./GalleryItem";
import { LightboxModal } from "./LightboxModal";
import { useGallery } from "@/hooks/useGallery";

const ModernPhotosGallery = () => {
  const { selectedImage, openLightbox, closeLightbox, navigateImage } = useGallery(galleryImages);

  return (
    <>
      <section className="w-full py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryHeader />

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6 auto-rows-[200px] lg:auto-rows-[250px]">
            {/* Image 1 - Small */}
            <GalleryItem
              image={galleryImages[0]}
              index={0}
              className="md:col-span-2 lg:col-span-2 lg:row-span-1"
              onImageClick={openLightbox}
              delay={0.1}
            />

            {/* Image 2 - Small */}
            <GalleryItem
              image={galleryImages[1]}
              index={1}
              className="md:col-span-2 lg:col-span-2 lg:row-span-1"
              onImageClick={openLightbox}
              delay={0.2}
            />

            {/* Image 3 - Large (Hero) */}
            <GalleryItem
              image={galleryImages[2]}
              index={2}
              className="md:col-span-4 lg:col-span-2 lg:row-span-2"
              onImageClick={openLightbox}
              delay={0.3}
            />

            {/* Image 4 - Medium */}
            <GalleryItem
              image={galleryImages[3]}
              index={3}
              className="md:col-span-2 lg:col-span-2 lg:row-span-1"
              onImageClick={openLightbox}
              delay={0.4}
            />

            {/* Image 5 - Medium */}
            <GalleryItem
              image={galleryImages[4]}
              index={4}
              className="md:col-span-2 lg:col-span-2 lg:row-span-1"
              onImageClick={openLightbox}
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={selectedImage !== null}
        selectedImage={selectedImage}
        images={galleryImages}
        onClose={closeLightbox}
        onNavigate={navigateImage}
      />
    </>
  );
};

export default ModernPhotosGallery;
