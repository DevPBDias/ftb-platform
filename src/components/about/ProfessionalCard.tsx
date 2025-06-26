import { MemberFederation } from "@/constants/professionalCard";
import Image from "next/image";

interface CardProps {
  data: MemberFederation;
}

const ProfessionalCard = ({ data }: CardProps) => {
  return (
    <div className="h-[550px] w-full relative rounded-2xl overflow-hidden">
      <picture>
        <Image
          src={data.image}
          alt="Professional Card Image"
          className="w-full h-full object-cover rounded-lg"
        />
      </picture>
      <div className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 flex flex-col items-start justify-start gap-6 p-8 bg-blue-950/90 text-white">
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
    </div>
  );
};

export default ProfessionalCard;
