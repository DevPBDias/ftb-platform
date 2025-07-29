"use client";

import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { StaticImageData } from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase-client";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string | StaticImageData;
  };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth); // 👈 desloga do Firebase
      router.push("/"); // 👈 redireciona para a home (ou login)
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-transparent"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={
                typeof user.avatar === "string" ? user.avatar : user.avatar.src
              }
              alt={user.name}
            />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
          <Button
            onClick={handleLogout}
            variant="secondary"
            disabled={loading}
            size="icon"
            className="size-8 border border-gray-300 hover:bg-gray-300"
          >
            <LogOut />
          </Button>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
