import { members } from "@/constants/professionalCard";
import ProfessionalCard from "./ProfessionalCard";

const Mentions = () => {
  return (
    <div className="flex flex-col items-start justify-center w-full px-60 my-24 gap-6">
      <h3 className="text-4xl font-bold">Menções honrosas</h3>
      <section className="grid grid-cols-3 items-center justify-center w-full gap-8">
        {members.map((member, index) => (
          <ProfessionalCard key={index} data={member} />
        ))}
      </section>
    </div>
  );
};

export default Mentions;
