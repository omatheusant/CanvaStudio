"use client";

import Image from "next/image";
import { memo } from "react";

import { editorNavElements } from "@/constants/editor";
import { ActiveElement, NavbarProps } from "@/types/type";

import { Button } from "@/components/ui/button";
import ShapesMenu from "./ShapesMenu";
import ActiveUsers from "./users/ActiveUsers";
import { NewThread } from "./comments/NewThread";
import Link from "next/link";

const Navbar = ({
  activeElement,
  imageInputRef,
  handleImageUpload,
  handleActiveElement,
}: NavbarProps) => {
  const isActive = (value: string | Array<ActiveElement>) =>
    (activeElement && activeElement.value === value) ||
    (Array.isArray(value) &&
      value.some((val) => val?.value === activeElement?.value));

  return (
    <nav className="flex select-none items-center justify-between gap-4 bg-primary-black px-5 text-white">
      <Link href="/">
        <Image
          src="/assets/logo.svg"
          alt="FigPro Logo"
          width={58}
          height={20}
        />
      </Link>

      <ul className="flex flex-row">
        {editorNavElements.map((item: ActiveElement | any) => (
          <li
            key={item.name}
            onClick={() => {
              if (Array.isArray(item.value)) return;
              handleActiveElement(item);
            }}
            className={`group flex items-center justify-center px-2.5 py-5
            ${
              isActive(item.value)
                ? "bg-primary-yellow"
                : "hover:bg-primary-grey-200"
            }
            `}
          >
            {/* If value is an array means it's a nav element with sub options i.e., dropdown */}
            {Array.isArray(item.value) ? (
              <ShapesMenu
                item={item}
                activeElement={activeElement}
                imageInputRef={imageInputRef}
                handleActiveElement={handleActiveElement}
                handleImageUpload={handleImageUpload}
              />
            ) : item?.value === "comments" ? (
              // If value is comments, trigger the NewThread component
              <NewThread>
                <Button className="relative size-5 bg-transparent object-contain hover:bg-transparent">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    fill
                    className={isActive(item.value) ? "invert" : ""}
                  />
                </Button>
              </NewThread>
            ) : (
              <Button className="relative size-5 bg-transparent object-contain hover:bg-transparent">
                <Image
                  src={item.icon}
                  alt={item.name}
                  fill
                  className={isActive(item.value) ? "invert" : ""}
                />
              </Button>
            )}
          </li>
        ))}
      </ul>

      <ActiveUsers />
    </nav>
  );
};

export default memo(
  Navbar,
  (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement,
);
