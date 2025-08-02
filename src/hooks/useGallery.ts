import { useState, useEffect } from "react";

export function useGallery(images: any[]) {
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
        selectedImage === 0 ? images.length - 1 : selectedImage - 1
      );
    } else {
      setSelectedImage(
        selectedImage === images.length - 1 ? 0 : selectedImage + 1
      );
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImage === null) return;

      switch (event.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          navigateImage("prev");
          break;
        case "ArrowRight":
          navigateImage("next");
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return {
    selectedImage,
    openLightbox,
    closeLightbox,
    navigateImage,
  };
} 