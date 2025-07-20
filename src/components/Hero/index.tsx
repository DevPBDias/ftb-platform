import Image from "next/image";
import React from "react";
import heroImg from "@/assets/hero_img.png";
import AnimatedHeroSection from "./ContentHero";
import ScoreBoard from "./ScoreBoard";
import ModernNavbar from "./Navbar";

const HeroSection = () => {
  return (
    <section className="relative w-full h-dvh flex flex-col  items-start lg:items-center justify-start lg:justify-center border-red">
      <picture className="w-full h-full">
        <Image
          src={heroImg}
          alt="Image of a player holding a basketball in the middle of a park"
          fill
          className="object-cover -z-10"
        />
      </picture>
      <ModernNavbar />
      <AnimatedHeroSection />
      <ScoreBoard />
    </section>
  );
};

export default HeroSection;
