import Image from "next/image";
import gallery1 from "@/assets/gallery/campeonatos-2.png";
import gallery2 from "@/assets/gallery/campeonatos-3.png";
import gallery3 from "@/assets/gallery/mvp-2.png";
import gallery4 from "@/assets/gallery/ftb.png";
import gallery5 from "@/assets/gallery/social.png";

const PhotosGallery = () => {
  return (
    <section className="flex flex-col items-start justify-start gap-4 w-full p-4 2xl:px-48 mb-16">
      <header className="flex flex-row items-center justify-between w-full">
        <h2 className="text-3xl font-bold">Galeria de fotos</h2>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 w-full lg:h-[650px]">
        <picture className="lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2 rounded-lg">
          <Image
            src={gallery1}
            alt="Galeria 1"
            className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </picture>
        <div className="lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3 rounded-lg">
          <Image
            src={gallery2}
            alt="Galeria 2"
            className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>

        <div className="md:row-start-1 md:row-end-3 md:col-start-1 md:col-end-2 lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-3 rounded-lg">
          <Image
            src={gallery3}
            alt="Galeria 4"
            className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="md:row-start-2  md:row-end-3 md:col-start-2 md:col-end-3 lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2  rounded-lg">
          <Image
            src={gallery4}
            alt="Galeria 3"
            className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="md:row-start-3 md:row-end-4 md:col-start-2 md:col-end-3 lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3 rounded-lg">
          <Image
            src={gallery5}
            alt="Galeria 5"
            className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
};

export default PhotosGallery;
