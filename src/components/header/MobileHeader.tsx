"use client";
import * as motion from "motion/react-client";
import { INavLinks, navLinks } from "@/constants/navLinks";
import { ISocialMedia, socialMedia } from "@/constants/socialMediaLinks";
import { AlignRight, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="lg:hidden"
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        delay: 1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-6 right-6 z-40 p-2 bg-white rounded-full shadow-lg"
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen ? (
          <X size={18} color="#162456" />
        ) : (
          <AlignRight size={18} color="#162456" />
        )}
      </motion.button>
      <motion.section
        className="absolute top-0 right-0 z-30 w-full h-dvh"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <motion.div
          onClick={() => setIsOpen(false)}
          className="absolute top-0 right-0 z-40 w-full h-dvh bg-blue-950/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.nav
          className="absolute top-0 right-0 z-50 w-2/3 h-full flex flex-col items-center justify-center gap-8 bg-blue-950 border-l-2 border-white/30 p-4"
          initial={{ x: "100%" }}
          animate={{ x: isOpen ? 0 : "100%" }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.4,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            className="flex flex-row items-center justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isOpen ? 1 : 0,
              y: isOpen ? 0 : 20,
            }}
            transition={{ delay: isOpen ? 0.2 : 0, duration: 0.3 }}
          >
            {socialMedia.map((item: ISocialMedia, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  scale: isOpen ? 1 : 0.8,
                }}
                transition={{
                  delay: isOpen ? 0.3 + index * 0.1 : 0,
                  duration: 0.2,
                }}
              >
                <Link
                  href={item.link}
                  target={item.name === "Login" ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="p-2 hover:scale-110 cursor-pointer transition duration-200 rounded-full hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon color="white" size={24} />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isOpen ? 1 : 0,
              y: isOpen ? 0 : 20,
            }}
            transition={{ delay: isOpen ? 0.4 : 0, duration: 0.3 }}
          >
            {navLinks.map((item: INavLinks, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  x: isOpen ? 0 : 20,
                }}
                transition={{
                  delay: isOpen ? 0.5 + index * 0.1 : 0,
                  duration: 0.2,
                }}
              >
                <Link
                  href={item.link}
                  className="text-white text-lg font-medium hover:text-yellow-500 transition duration-300 px-4 py-2 rounded-lg hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.nav>
      </motion.section>
    </motion.div>
  );
};

export default MobileHeader;
