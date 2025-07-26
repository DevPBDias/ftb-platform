"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb-link";
import { useState } from "react";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

const NavHeader = () => {
  const [isDark, setIsDark] = useState(true);

  return (
    <header className="bg-sidebar text-sidebar-foreground w-full pr-4 border-b flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <CustomBreadcrumb />
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center">
        {isDark ? (
          <Button
            onClick={() => setIsDark(!isDark)}
            variant="secondary"
            size="icon"
            className="size-8 cursor-pointer"
          >
            <Moon />
          </Button>
        ) : (
          <Button
            onClick={() => setIsDark(!isDark)}
            variant="secondary"
            size="icon"
            className="size-8 cursor-pointer"
          >
            <Sun />
          </Button>
        )}
      </div>
    </header>
  );
};

export default NavHeader;
