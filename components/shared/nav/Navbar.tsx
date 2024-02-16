import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  return (
    <nav className="flex-between z-50 w-full bg-primary-black px-6 py-2">
      <Image src="/assets/logo.svg" width={60} height={60} alt="Logo" />

      <UserButton />
    </nav>
  );
};

export default Navbar;
