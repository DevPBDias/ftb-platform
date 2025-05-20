import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-Manrope",

  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FTB - Federação Tocantinense de Basketball",
  description:
    "A FTB é a entidade responsável pela organização e promoção do basquete no estado do Tocantins.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>{children}</body>
    </html>
  );
}
