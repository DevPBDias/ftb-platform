import ContainerNewsEvents from "@/components/Container";
import Footer from "@/components/Footer";
import MobileHeader from "@/components/header/MobileHeader";
import Navbar from "@/components/Hero/Navbar";

const TournamentsPage = () => {
  return (
    <main className="relative flex flex-col items-center justify-center w-full overflow-hidden">
      <section className="flex flex-col items-center justify-center w-full bg-blue-950 h-24 2xl:h-32"></section>
      <Navbar />
      <MobileHeader />
      <section className="flex flex-col items-start justify-start w-full mt-12">
        <h2 className="text-3xl font-bold p-4 2xl:px-[10%] w-full ">
          Competições de Basquete
        </h2>
        <ContainerNewsEvents
          className="w-full "
          btnName="Notícias"
          title="Últimas notícias"
          type="competicoes"
          turnOffBtn={true}
          turnOffTitle={true}
        />
      </section>
      <Footer />
    </main>
  );
};

export default TournamentsPage;
