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
import { useUser } from "@clerk/nextjs";

export function NavMenu({ ...props }) {
  const { user } = useUser();
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList>
        {navItems.map((item) => {
          return (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuTrigger>
                <Link href={item.route} className="text-lg">
                  {item.label}
                </Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="flex size-fit flex-col gap-3 bg-primary-black p-3">
                {item.subItems?.map((subItem) => {
                  return (
                    <ListItem
                      key={subItem.name}
                      title={subItem.name}
                      imageUrl={subItem.imageUrl}
                      route={
                        subItem.route.includes("/tools/editor")
                          ? `${subItem.route}/${user?.username}`
                          : subItem.route
                      }
                    >
                      {subItem.description}
                    </ListItem>
                  );
                })}
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
      className="flex w-[320px] items-center rounded-sm p-2 hover:bg-accent"
    >
      <div className="size-max rounded-md bg-white">
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
