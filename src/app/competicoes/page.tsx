import ContainerNewsEvents from "@/components/Container";
import Footer from "@/components/Footer";
import Navbar from "@/components/Hero/Navbar";

const TournamentsPage = () => {
  return (
    <main className="relative flex flex-col items-center justify-center w-full overflow-hidden">
      <Navbar />
      <section className="flex flex-col items-start justify-start w-full mt-32">
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
