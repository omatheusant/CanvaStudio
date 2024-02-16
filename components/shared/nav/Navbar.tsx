import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import NavContent from "./components/NavContent";

const Navbar = () => {
  return (
    <nav className="flex-between w-full bg-primary-black px-6 py-2">
      <Image src="/assets/logo.svg" width={60} height={60} alt="Logo" />
      <NavContent />
      <UserButton />
    </nav>
  );
};

export default Navbar;
