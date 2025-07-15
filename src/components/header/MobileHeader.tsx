"use client";
import * as motion from "motion/react-client";
import { INavLinks, navLinks } from "@/constants/navLinks";
import { ISocialMedia, socialMedia } from "@/constants/socialMediaLinks";
import { AlignRight, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.div
      className="lg:hidden w-full"
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      {isOpen ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-6 right-6 z-40 p-2 bg-white rounded-full"
        >
          <AlignRight size={18} color="#162456" />
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-6 right-4 z-40 p-2 bg-white rounded-full"
        >
          <X size={18} color="#162456" />
        </button>
      )}
      <section
        className={` ${
          isOpen ? "hidden" : "flex"
        } absolute top-0 left-0 z-30 w-full flex flex-col items-center justify-center  gap-20 px-4 py-4 bg-blue-950 h-3/4`}
      >
        <div className="flex flex-row items-center justify-center">
          {socialMedia.map((item: ISocialMedia) => (
            <Link
              key={item.id}
              href={item.link}
              target={item.name === "Login" ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="p-2 hover:scale-110 cursor-pointer transition duration-200"
            >
              <item.icon color="white" size={24} />
            </Link>
          ))}
        </div>
        <nav className="flex flex-col items-center justify-center gap-8 ">
          {navLinks.map((item: INavLinks) => (
            <Link
              key={item.name}
              href={item.link}
              className="text-white text-lg font-medium hover:text-yellow-500 transition duration-300"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </section>
    </motion.div>
  );
};

export default MobileHeader;
