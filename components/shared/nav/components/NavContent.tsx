"use client";

import React, { useEffect, useState } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navItems } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavContent = () => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navItems.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;
          return (
            <NavigationMenuItem key={item.route}>
              <Link
                href={item.route}
                className={`${isActive ? "text-primary-white" : "text-primary-grey-300"} text-base font-semibold hover:text-primary-white `}
              >
                <NavigationMenuLink>{item.label}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavContent;
