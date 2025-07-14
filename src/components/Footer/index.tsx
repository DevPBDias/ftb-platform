import {
  IPartnersLogo,
  ISocialMedia,
  partnersLogo,
  socialMedia,
} from "@/constants/socialMediaLinks";
import Link from "next/link";
import logoFTB from "@/assets/logo_ftb.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center lg:justify-between gap-4 w-full lg:h-40 bg-[#C3DCF0] px-4 py-8 2xl:px-48">
      <nav className="flex flex-col lg:flex-row items-center justify-between gap-8 w-full">
        <Link href="/login" className="flex items-center gap-2 w-fit">
          <Image
            src={logoFTB}
            alt="Logo FTB"
            className="w-20 h-20 object-cover"
          />
          <p className="font-medium text-base text-[#010030] w-32">
            Federação Tocantinense de Basketball
          </p>
        </Link>
        <div className="flex flex-col lg:flex-row flex-wrap items-center gap-4">
          <p className="font-bold">Parcerias:</p>
          <div className="flex flex-row flex-wrap items-center gap-4">
            {partnersLogo.map((item: IPartnersLogo) => (
              <picture key={item.id} className="w-12 h-12 lg:w-20 lg:h-20">
                <Image
                  src={item.logoPartner}
                  alt="Logo gov"
                  className="w-full h-full object-cover"
                />
              </picture>
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row flex-wrap items-center gap-4">
          <p className="font-bold text-base text-[#010030] ">Nos sigam:</p>
          <div className="flex flex-row flex-wrap items-center gap-4">
            {socialMedia.map((item: ISocialMedia) => (
              <Link
                key={item.id}
                href={item.link}
                target={item.name === "Login" ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className="p-2 hover:scale-110 cursor-pointer transition duration-200"
              >
                <item.icon color="#010030" size={24} />
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
