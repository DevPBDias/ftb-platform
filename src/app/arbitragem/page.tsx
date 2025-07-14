"use client";

import * as motion from "motion/react-client";
import Navbar from "@/components/Hero/Navbar";
import bg_referee from "@/assets/bg-referee.png";

import { refereeData } from "@/constants/refereeData";
import Image from "next/image";
import React from "react";

const RefereePage = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full">
      <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center">
        <picture className="w-full h-full">
          <Image
            src={bg_referee}
            alt="Image of a player holding a basketball in the middle of a park"
            className="w-full h-full object-cover"
          />
        </picture>
        <Navbar />
        <motion.div
          className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center px-3 md:px-6 2xl:px-48 gap-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            delay: 1,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <div className="flex flex-col items-center justify-center w-full h-full gap-18 ">
            <h1 className="text-white text-3xl md:text-4xl xl:text-6xl font-bold w-full lg:w-2/3 text-center mt-32">
              Quem Faz as Regras Valerem Dentro de Quadra
            </h1>
            <div className="flex flex-wrap flex-row gap-2 2xl:gap-4 items-center justify-center">
              {refereeData.map((item, index) => (
                <picture
                  key={index}
                  className="relative w-[108px] h-[108px] md:w-40 md:h-40 2xl:w-52 2xl:h-52 rounded-lg hover:scale-105 transition-transform duration-300"
                >
                  <Image
                    src={item.image}
                    alt={`Team logo ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute z-10 bottom-0 left-0 px-3 py-2 w-full bg-blue-950/90 flex flex-col items-start justify-center text-white rounded-b-lg">
                    <h4 className="text-xs font-bold md:text-base  lg:text-lg">
                      {item.name}
                    </h4>
                    <p className="hidden lg:flex text-sm font-normal">
                      {item.jobFunction} - {item.experience} anos
                    </p>
                  </div>
                </picture>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default RefereePage;
