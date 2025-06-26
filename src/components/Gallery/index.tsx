import Image from "next/image";
import gallery1 from "@/assets/3x3.png";
import gallery2 from "@/assets/basket_plays.png";
import gallery3 from "@/assets/woman_player.png";
import gallery4 from "@/assets/kids_playing.png";

const PhotosGallery = () => {
  return (
    <section className="flex flex-col items-start justify-start gap-4 w-full p-4 px-48 mb-16">
      <header className="flex flex-row items-center justify-between w-full">
        <h2 className="text-3xl font-bold">Galeria de fotos</h2>
      </header>
      <div className="grid grid-cols-3 grid-rows-2 gap-4 w-full h-[650px]">
        <picture className="col-start-1 col-end-2 row-start-1 row-end-2 ounded-lg">
          <Image
            src={gallery1}
            alt="Galeria 1"
            className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </picture>
        <div className="col-start-2 col-end-3 row-start-1 row-end-3  rounded-lg">
          <Image
            src={gallery2}
            alt="Galeria 2"
            className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="col-start-3 col-end-4 row-start-1 row-end-3 rounded-lg">
          <Image
            src={gallery3}
            alt="Galeria 3"
            className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="col-start-1 col-end-2 row-start-2 row-end-3 0 rounded-lg">
          <Image
            src={gallery4}
            alt="Galeria4"
            className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
};

export default PhotosGallery;
