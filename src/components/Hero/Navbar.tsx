"use client";

import * as motion from "motion/react-client";
import { type INavLinks, navLinks } from "@/constants/navLinks";
import { type ISocialMedia, socialMedia } from "@/constants/socialMediaLinks";
import Link from "next/link";
import logoFTB from "@/assets/logo_ftb.png";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const ModernNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <motion.nav
        className={`absolute top-0 left-0 z-50 w-full transition-all duration-500 flex items-center justify-center px-[5%] lg:px-[10%] ${
          isScrolled
            ? "bg-[#162456]/95 backdrop-blur-lg shadow-2xl border-b border-white/10"
            : "bg-[#162456]/70 backdrop-blur-md"
        }`}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <div className="w-full">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/"
                className="flex items-center gap-2 sm:gap-3 group"
                onClick={closeMenu}
              >
                <div className="relative">
                  <Image
                    src={logoFTB}
                    alt="Logo FTB"
                    width={48}
                    height={48}
                    className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="hidden sm:block">
                  <p className="font-semibold text-sm lg:text-base text-white leading-tight max-w-32 lg:max-w-40">
                    Federação Tocantinense de Basketball
                  </p>
                </div>
              </Link>
            </motion.div>
            <motion.nav
              className="hidden lg:flex items-center space-x-1"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {navLinks.map((item: INavLinks, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                >
                  <Link
                    href={item.link}
                    className="relative px-4 py-2 text-white/90 hover:text-white font-medium text-sm xl:text-base transition-all duration-300 rounded-lg hover:bg-white/10 group"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full group-hover:left-0 transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <motion.div
              className="hidden lg:flex items-center space-x-1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {socialMedia.map((item: ISocialMedia, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                >
                  <Link
                    href={item.link}
                    target={item.name === "Login" ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className="p-2.5 text-white/80 hover:text-white rounded-lg transition-all duration-300 hover:scale-110 group"
                    aria-label={item.name}
                  >
                    <item.icon size={20} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            <motion.button
              className="lg:hidden p-2 text-white rounded-lg transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>
      <motion.div
        className={`fixed inset-0 z-40 lg:hidden ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeMenu}
        />
        <motion.div
          className="absolute top-16 sm:top-20 left-0 w-full bg-[#162456]/90 backdrop-blur-lg shadow-2xl border border-white/10 overflow-hidden"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            y: isMenuOpen ? 0 : -20,
            scale: isMenuOpen ? 1 : 0.95,
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="p-6">
            <div className="space-y-2 mb-6">
              {navLinks.map((item: INavLinks, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isMenuOpen ? 1 : 0,
                    x: isMenuOpen ? 0 : -20,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: isMenuOpen ? index * 0.1 : 0,
                  }}
                >
                  <Link
                    href={item.link}
                    onClick={closeMenu}
                    className="block px-4 py-3 text-white hover:text-yellow-400 font-medium text-base rounded-lg hover:bg-white/10 transition-all duration-300 group"
                  >
                    <span className="flex items-center justify-between">
                      {item.name}
                      <div className="w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-6 transition-all duration-300" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-6">
              <p className="text-white/60 text-sm font-medium mb-4">
                Conecte-se conosco
              </p>
              <div className="flex items-center justify-center space-x-4">
                {socialMedia.map((item: ISocialMedia, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: isMenuOpen ? 1 : 0,
                      scale: isMenuOpen ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: isMenuOpen ? 0.3 + index * 0.1 : 0,
                    }}
                  >
                    <Link
                      href={item.link}
                      target={item.name === "Login" ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-110 group"
                      aria-label={item.name}
                    >
                      <item.icon
                        size={22}
                        className="transition-transform duration-300 group-hover:rotate-12"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <div className="h-16 sm:h-20" />
    </>
  );
};

export default ModernNavbar;
