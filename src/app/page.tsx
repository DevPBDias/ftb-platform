import ContainerNewsEvents from "@/components/Container";
import Footer from "@/components/Footer";
import PhotosGallery from "@/components/Gallery";
import HeroSection from "@/components/Hero";
import GameList from "@/components/ui/slider-games-list";
import UsePresenceData from "@/components/ui/slider-scoreboard";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full overflow-hidden">
      <HeroSection />
      <GameList />
      <UsePresenceData />
      <ContainerNewsEvents
        className="mt-8 lg:mt-64"
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
