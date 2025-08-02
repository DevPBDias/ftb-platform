import type { Metadata } from "next";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import NavHeader from "@/components/sidebar/nav-header";
import { Toaster } from "@/components/ui/sonner";
import { AuthGuard } from "@/components/auth/AuthGuard";

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
    <AuthGuard>
      <main>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <NavHeader />
            {children}
          </SidebarInset>
        </SidebarProvider>
        <Toaster richColors position="top-right" />
      </main>
    </AuthGuard>
  );
}
