"use client";
import { MemberFederation } from "@/constants/professionalCard";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CardProps {
  data: MemberFederation;
}

const MobileProfessionalCard = ({ data }: CardProps) => {
  const [showText, setShowText] = useState(true);

  return (
    <div className="h-[550px] w-full relative rounded-2xl overflow-hidden">
      <picture>
        <Image
          src={data.image}
          alt="Professional Card Image"
          className="w-full h-full object-cover rounded-lg"
        />
      </picture>
      <div
        className={`absolute top-0 left-0 w-full h-full ${
          showText ? "opacity-0" : "opacity-100"
        } z-10  flex flex-col items-start justify-start gap-6 p-8 bg-blue-950/90 text-white`}
      >
        <h3 className="text-2xl font-bold">{data.name}</h3>
        <div className="flex flex-col items-start justify-start gap-2">
          <p className="text-base font-medium">- {data.jobFuntion}</p>
          {data.secondaryJobFunction && (
            <p className="text-base font-medium">
              - {data.secondaryJobFunction}
            </p>
          )}
        </div>
        <p className="text-sm font-normal">{data.history}</p>
      </div>
      <button
        className={`${
          !showText ? "opacity-0" : "opacity-100"
        } bg-blue-950/90 rounded-lg absolute bottom-4 right-4 z-10 px-4 py-2 text-white`}
        type="button"
        onClick={() => setShowText(!showText)}
      >
        Saiba mais
      </button>
      <X
        className={`rounded-lg absolute top-4 right-4 border border-white z-30 ${
          showText ? "opacity-0" : "opacity-100"
        } `}
        size={24}
        color="white"
        onClick={() => setShowText(!showText)}
      />
    </div>
  );
};

export default MobileProfessionalCard;
