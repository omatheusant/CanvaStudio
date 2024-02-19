"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navItems } from "@/constants";
import Image from "next/image";

export function NavMenu() {
  return (
    <NavigationMenu className="max-md:hidden">
      <NavigationMenuList>
        {navItems.map((item) => {
          return (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuTrigger>
                <Link href={item.route} className="text-lg">
                  {item.label}
                </Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="grid w-[400px] grid-cols-1 gap-3 p-3 md:w-max">
                {item.subItems?.map((subItem) => (
                  <ListItem
                    key={subItem.name}
                    title={subItem.name}
                    imageUrl={subItem.imageUrl}
                    route={subItem.route}
                  >
                    {subItem.description}
                  </ListItem>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

interface ListItemProps {
  children: React.ReactNode;
  title: string;
  imageUrl: string;
  route: string;
}

const ListItem = ({ children, title, imageUrl, route }: ListItemProps) => {
  return (
    <NavigationMenuLink
      href={route}
      className="transition-ease flex items-start rounded-md p-3 hover:bg-accent"
    >
      <div className=" flex size-[70px] items-center justify-center rounded-md bg-white">
        <Image
          src={imageUrl}
          width={70}
          height={70}
          alt="List Item Image"
          className="z-10 rounded-sm"
        />
      </div>
      <div className="p-2">
        <h4 className="text-sm font-medium leading-none">{title}</h4>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </div>
    </NavigationMenuLink>
  );
};
