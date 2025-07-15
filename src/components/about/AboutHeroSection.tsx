import Image from "next/image";
import React from "react";
import heroImg from "@/assets/bg-about2.png";
import Navbar from "../Hero/Navbar";
import AnimatedAboutSection from "./ContentAbout";
import CardBoard from "./CardBoard";
import MobileHeader from "../header/MobileHeader";

const AboutHeroSection = () => {
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
      <MobileHeader />
      <AnimatedAboutSection />
      <CardBoard />
    </section>
  );
};

export default AboutHeroSection;
