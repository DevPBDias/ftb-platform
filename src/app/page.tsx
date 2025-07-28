import ContainerNewsEvents from "@/components/Container";
import Footer from "@/components/Footer";
import PhotosGallery from "@/components/Gallery";
import HeroSection from "@/components/Hero";
import GameList from "@/components/ui/slider-games-list";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full overflow-hidden">
      <HeroSection />
      <GameList />
      <ContainerNewsEvents
        className="mt-8 lg:mt-64"
        btnName="Notícias"
        title="Últimas notícias"
        type="noticias"
      />
      <ContainerNewsEvents
        btnName="Competições"
        title="Próximas competições"
        type="competicoes"
      />
      <PhotosGallery />
      <Footer />
    </main>
  );
}
