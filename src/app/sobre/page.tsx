"use client";

import AboutHeroSection from "@/components/about/AboutHeroSection";
import HistorySection from "@/components/about/HistorySection";
import Mentions from "@/components/about/Mentions";
import MobileCardBoard from "@/components/about/MobileCardBoard";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full">
      <AboutHeroSection />
      <MobileCardBoard />
      <HistorySection />
      <Mentions />
      <Footer />
    </main>
  );
};

export default About;
