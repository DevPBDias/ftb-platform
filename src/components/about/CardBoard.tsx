import { members } from "@/constants/professionalCard";
import * as motion from "motion/react-client";
import ProfessionalCard from "./ProfessionalCard";

const CardBoard = () => {
  return (
    <motion.div
      className="absolute -bottom-3/6 left-0 w-full flex flex-col items-start justify-center p-9 gap-9 rounded-lg px-48"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        delay: 1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <section className="grid grid-cols-3 items-center justify-center w-full gap-8">
        {members.map((member, index) => (
          <ProfessionalCard key={index} data={member} />
        ))}
      </section>
    </motion.div>
  );
};

export default CardBoard;
