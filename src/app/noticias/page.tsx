import ContainerNewsEvents from "@/components/Container";
import Footer from "@/components/Footer";
import Navbar from "@/components/Hero/Navbar";

const NewsPage = () => {
  return (
    <main className="relative flex flex-col items-center justify-center w-full overflow-hidden">
      <Navbar />
      <section className="flex flex-col items-start justify-start w-full mt-32">
        <h2 className="text-3xl font-bold p-4 2xl:px-[10%] w-full ">
          Notícias
        </h2>
        <ContainerNewsEvents
          className="w-full "
          btnName="Notícias"
          title="Últimas notícias"
          type="noticias"
          turnOffBtn={true}
          turnOffTitle={true}
        />
      </section>
      <Footer />
    </main>
  );
};

export default NewsPage;
