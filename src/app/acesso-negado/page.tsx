import Link from "next/link";
import Image from "next/image";
import policeMan from "@/assets/policeman.png";

export default function AccessDeniedPage() {
  return (
    <div className="relative flex flex-col min-h-screen items-center justify-center bg-[#ebeff3] px-4 py-12 text-[#2d2d2d] sm:px-6 lg:px-8">
      <Image
        src={policeMan}
        alt="Illustration of a person with hands up and a police officer"
        width={500}
        height={500}
        priority
        className="w-full max-w-[200px] h-auto object-contain mx-auto mb-8 // Tamanho e centralização para telas pequenas
                   sm:max-w-[250px] // Aumenta um pouco em sm
                   md:max-w-[300px] // Aumenta em md
                   lg:max-w-[400px] // Tamanho máximo para telas grandes, mantendo a centralização
                   "
      />
      <svg
        className="absolute left-[15%] top-[15%] h-6 w-6 opacity-70"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
      <svg
        className="absolute right-[10%] top-[20%] h-10 w-10 opacity-70"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
      <svg
        className="absolute right-[25%] top-[40%] h-4 w-4 opacity-70"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
      <svg
        className="absolute left-[20%] bottom-[10%] h-8 w-8 opacity-70"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
      <svg
        className="absolute right-[15%] bottom-[15%] h-6 w-6 opacity-70"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>

      <div className="z-10 max-w-md text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Acesso negado
        </h1>
        <p className="mt-4 text-base text-gray-500 text-balance">
          Não tem permissão para acessar essa página. Entre em contato com os
          administradores da empresa ou navegue para outras páginas.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-[#162456] to-blue-600 hover:scale-[1.02] shadow-2xl rounded-lg transition-transform duration-200"
          >
            Voltar início
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-2 text-base font-medium text-[#2d2d2d] border border-blue-950 px-6 py-3 shadow-2xl rounded-lg hover:scale-[1.02] transition-transform duration-200"
          >
            Efetuar login
          </Link>
        </div>
      </div>
    </div>
  );
}
