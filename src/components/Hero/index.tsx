import Image from "next/image";
import React from "react";
import heroImg from "@/assets/hero_img.png";
import AnimatedHeroSection from "./ContentHero";
import Navbar from "./Navbar";
import ScoreBoard from "./ScoreBoard";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center">
      <picture className="w-full h-full">
        <Image
          src={heroImg}
          alt="Image of a player holding a basketball in the middle of a park"
          className="w-full h-full object-cover"
        />
      </picture>
      <Navbar />
      <AnimatedHeroSection />
      <ScoreBoard />
    </section>
  );
};

export default HeroSection;
