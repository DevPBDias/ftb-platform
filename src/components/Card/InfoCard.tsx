import { CardData } from "@/constants/news-events";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardDataProps {
  data: CardData;
}

const InfoCard = ({ data }: CardDataProps) => {
  return (
    <section className="flex flex-col items-start justify-start gap-4 w-full rounded-lg border-2 border-[#010030] p-4">
      <picture className="w-full h-76">
        <Image
          src={data.imageUrl}
          alt={data.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </picture>
      <div className="flex flex-col items-start justify-start gap-6 w-full">
        <div className="flex flex-row items-center justify-between w-full">
          <h3 className="font-medium text-xl">{data.title}</h3>
          <span className="text-sm font-medium">{data.date}</span>
        </div>
        <p className="text-base">{data.description}</p>
        <Link
          href={`/noticias/${data.id}`}
          className="flex items-center gap-2 border-2 border-[#010030] rounded-lg p-2 w-1/2 justify-center hover:bg-blue-200 hover:scale-105 transition-all duration-300 ease-in-out"
        >
          <PlusCircle size={20} color="#010030" />
          <p>Informações</p>
        </Link>
      </div>
    </section>
  );
};

export default InfoCard;
