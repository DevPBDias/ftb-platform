import Image from "next/image";
import React from "react";
import heroImg from "@/assets/bg-about2.png";
import Navbar from "../Hero/Navbar";
import AnimatedAboutSection from "./ContentAbout";
import CardBoard from "./CardBoard";

const AboutHeroSection = () => {
  return (
    <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center">
      <picture className="w-full h-full">
        <Image
          src={heroImg}
          alt="Image of a player holding a basketball in the middle of a park"
          fill
          className="object-cover -z-10"
        />
      </picture>
      <Navbar />
      <AnimatedAboutSection />
      <CardBoard />
    </section>
  );
};

export default AboutHeroSection;
