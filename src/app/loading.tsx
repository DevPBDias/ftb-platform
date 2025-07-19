"use client";

import { motion, type Variants } from "motion/react";
import Image from "next/image";
import basketballIcon from "@/assets/bola-basquete.png";

function LoadingThreeDotsJumping() {
  const ballVariants: Variants = {
    jump: {
      y: -40,
      transition: {
        duration: 0.8,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      animate="jump"
      transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
      className="fixed inset-0 flex flex-col justify-center items-center gap-4 pointer-events-none z-50 bg-blue-950"
    >
      <div className="flex flex-row items-center justify-center gap-3">
        <motion.div variants={ballVariants} className="will-change-transform">
          <Image
            src={basketballIcon}
            alt="Basketball"
            width={32}
            height={32}
            className="drop-shadow-lg"
          />
        </motion.div>
        <motion.div variants={ballVariants} className="will-change-transform">
          <Image
            src={basketballIcon}
            alt="Basketball"
            width={32}
            height={32}
            className="drop-shadow-lg"
          />
        </motion.div>
        <motion.div variants={ballVariants} className="will-change-transform">
          <Image
            src={basketballIcon}
            alt="Basketball"
            width={32}
            height={32}
            className="drop-shadow-lg"
          />
        </motion.div>
      </div>
      <p className="text-white text-base lg:text-2xl font-bold uppercase">
        Carregando...
      </p>
    </motion.div>
  );
}

export default LoadingThreeDotsJumping;
