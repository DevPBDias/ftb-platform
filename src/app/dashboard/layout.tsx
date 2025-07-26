import type { Metadata } from "next";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import NavHeader from "@/components/sidebar/nav-header";

export const metadata: Metadata = {
  title: "FTB - Federação Tocantinense de Basketball",
  description:
    "A FTB é a entidade responsável pela organização e promoção do basquete no estado do Tocantins.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <NavHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
