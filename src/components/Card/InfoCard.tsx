import { PlusCircle } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import imageExample from "@/assets/kids_playing.png";
import { formatDate } from "@/utils/formatterDate";

interface InfoCardProps {
  data: {
    id?: string;
    titulo: string;
    descricao: string;
    datas: string[];
    local: string;
    image?: string | StaticImageData;
  };
  type?: "noticias" | "competicoes";
}

const InfoCard = ({ data, type }: InfoCardProps) => {
  const formattedDate = formatDate(data.datas?.[0]) || "Data a definir";
  const imageUrl =
    !data.image || data.image === ""
      ? typeof imageExample === "string"
        ? imageExample
        : imageExample.src
      : data.image;

  return (
    <section className="flex flex-col items-start justify-start gap-4 w-full rounded-lg border-2 border-[#010030] p-4">
      <picture className="w-full h-76">
        <Image
          src={imageUrl as string | StaticImageData}
          alt={data.titulo}
          width={400}
          height={250}
          className="w-full h-full object-cover rounded-lg"
        />
      </picture>
      <div className="flex flex-col items-start justify-between gap-3 w-full h-full">
        <h3 className="font-medium text-lg w-4/5">{data.titulo}</h3>
        <p className="text-sm w-4/5 line-clamp-2 text-left">{data.descricao}</p>
        <div className="flex items-center justify-between w-full">
          <Link
            href={`/${type}/${data.id}`}
            className="flex items-center gap-2 border-2 border-[#010030] rounded-lg p-2 w-1/2 justify-center hover:bg-blue-200 hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <PlusCircle size={18} color="#010030" />
            <p className="text-base font-medium">Informações</p>
          </Link>
          <span className="text-sm font-medium">{formattedDate}</span>
        </div>
      </div>
    </section>
  );
};

export default InfoCard;
