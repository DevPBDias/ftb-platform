"use client";

import * as motion from "motion/react-client";
import {
  type IPartnersLogo,
  type ISocialMedia,
  partnersLogo,
  socialMedia,
} from "@/constants/socialMediaLinks";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import logoFTB from "@/assets/logo_ftb.png";
import { INavLinks, navLinks } from "@/constants/navLinks";

const ModernFooter = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full relative bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 border-t border-slate-200/50">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#162456] via-blue-500 to-[#162456]" />
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-[#162456]/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-gradient-to-tl from-blue-400/10 to-transparent rounded-full blur-2xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-8">
          {/* Logo and Brand Section */}
          <motion.div
            className="flex flex-col items-center lg:items-start space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              href="/"
              className="group flex items-center gap-3 hover:scale-105 transition-transform duration-300"
            >
              <div className="relative">
                <Image
                  src={logoFTB}
                  alt="Logo FTB"
                  width={64}
                  height={64}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#162456]/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="font-bold text-lg sm:text-xl text-[#162456] leading-tight max-w-40">
                  Federação Tocantinense de Basketball
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Excelência no esporte
                </p>
              </div>
            </Link>

            <p className="text-sm text-slate-600 text-center lg:text-left max-w-sm leading-relaxed">
              Promovendo o desenvolvimento do basquete no Tocantins com paixão,
              dedicação e compromisso com a excelência esportiva.
            </p>
          </motion.div>

          {/* Partners Section */}
          <motion.div
            className="flex flex-col items-center lg:items-start space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center lg:text-left">
              <h4 className="font-bold text-lg text-[#162456] mb-2 flex items-center gap-2 justify-center lg:justify-start">
                <div className="w-2 h-2 bg-gradient-to-r from-[#162456] to-blue-500 rounded-full" />
                Nossos Parceiros
              </h4>
              <p className="text-sm text-slate-600">Juntos pelo esporte</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full max-w-sm lg:max-w-none">
              {partnersLogo.map((item: IPartnersLogo, index) => (
                <motion.div
                  key={item.id}
                  className="group relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-110 overflow-hidden">
                    <Image
                      src={
                        item.logoPartner ||
                        "/placeholder.svg?height=80&width=80"
                      }
                      alt={`Logo parceiro ${index + 1}`}
                      fill
                      className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#162456]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social Media Section */}
          <motion.div
            className="flex flex-col items-center lg:items-start space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-center lg:text-left">
              <h4 className="font-bold text-lg text-[#162456] mb-2 flex items-center gap-2 justify-center lg:justify-start">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-[#162456] rounded-full" />
                Conecte-se Conosco
              </h4>
              <p className="text-sm text-slate-600">
                Acompanhe nossas novidades
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {socialMedia.map((item: ISocialMedia, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={item.link}
                    target={item.name === "Login" ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center w-12 h-12 bg-white hover:bg-[#162456] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    aria-label={`Seguir no ${item.name}`}
                  >
                    <item.icon
                      size={20}
                      className="text-[#162456] group-hover:text-white transition-colors duration-300"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="mt-6 text-center lg:text-left">
              <h5 className="font-semibold text-[#162456] mb-3">
                Links Rápidos
              </h5>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm">
                {navLinks.map((link: INavLinks, index) => (
                  <Link
                    key={link.name}
                    href={`/${link?.link}`}
                    className="text-slate-600 hover:text-[#162456] transition-colors duration-300 hover:underline underline-offset-4"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>© 2024 Federação Tocantinense de Basketball.</span>
            <span className="hidden sm:inline">
              Todos os direitos reservados.
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Feito com</span>
            <Heart size={16} className="text-red-500 animate-pulse" />
            <span>para o esporte</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        className={`fixed bottom-6 right-6 z-50 p-3 bg-[#162456] hover:bg-[#162456]/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        onClick={scrollToTop}
        aria-label="Voltar ao topo"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
};

export default ModernFooter;
