import AboutHeroSection from "@/components/about/AboutHeroSection";
import HistorySection from "@/components/about/HistorySection";
import Mentions from "@/components/about/Mentions";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full">
      <AboutHeroSection />
      <HistorySection />
      <Mentions />
      <Footer />
    </main>
  );
};

export default About;
