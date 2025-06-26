import ContainerNewsEvents from "@/components/Container";
import Footer from "@/components/Footer";
import PhotosGallery from "@/components/Gallery";
import HeroSection from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full">
      <HeroSection />
      <ContainerNewsEvents
        className="mt-64"
        btnName="Notícias"
        title="Últimas notícias"
        type="noticia"
      />
      <ContainerNewsEvents
        btnName="Eventos"
        title="Próximos eventos"
        type="evento"
      />
      <PhotosGallery />
      <Footer />
    </main>
  );
}
