import { HistoryType } from "@/constants/historyData";
import Image from "next/image";
import React from "react";

interface CardProps {
  data: HistoryType;
}

const HistoryCard = ({ data }: CardProps) => {
  return (
    <div
      className={`flex ${
        data.id % 2 === 0 ? "flex-row-reverse" : "flex-row"
      } items-center justify-between w-full gap-16`}
    >
      <div className="flex flex-col items-start justify-start gap-4 w-full">
        <h3 className="text-lg font-semibold">{data.year}</h3>
        <p className="text-gray-700 text-balance">{data.description}</p>
      </div>
      <picture className="w-full h-[420px] overflow-hidden">
        <Image
          src={data.image}
          alt={`Image for the year ${data.year}`}
          className="w-full h-full object-cover rounded-lg"
        />
      </picture>
    </div>
  );
};

export default HistoryCard;
