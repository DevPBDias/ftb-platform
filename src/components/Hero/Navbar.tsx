import * as motion from "motion/react-client";
import { INavLinks, navLinks } from "@/constants/navLinks";
import { ISocialMedia, socialMedia } from "@/constants/socialMediaLinks";
import Link from "next/link";
import logoFTB from "@/assets/logo_ftb.png";
import Image from "next/image";

const Navbar = () => {
  return (
    <motion.div
      className="absolute top-0 left-0 z-10 w-full flex items-center justify-between px-4 2xl:px-48 py-4"
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        delay: 1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Link href="/" className="flex items-center gap-2 w-fit">
        <Image
          src={logoFTB}
          alt="Logo FTB"
          className="w-12 h-12 lg:w-20 lg:h-20 object-cover"
        />
        <p className="font-normal text-xs lg:text-base text-white w-32">
          Federação Tocantinense de Basketball
        </p>
      </Link>
      <nav className="hidden lg:flex items-center gap-8 ">
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
      <div className="flex items-center">
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
    </motion.div>
  );
};

export default Navbar;
