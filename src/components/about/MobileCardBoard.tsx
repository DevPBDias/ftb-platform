import { members } from "@/constants/professionalCard";
import MobileProfessionalCard from "./MobileProfessionalCard";

const MobileCardBoard = () => {
  return (
    <section className="lg:hidden grid grid-cols-1 md:grid-cols-2 items-center justify-center w-full px-4 gap-6 mt-8">
      {members.map((member, index) => (
        <MobileProfessionalCard key={index} data={member} />
      ))}
    </section>
  );
};

export default MobileCardBoard;
