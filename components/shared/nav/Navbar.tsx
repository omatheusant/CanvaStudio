import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { NavMenu } from "./components/NavMenu";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex-between w-full bg-primary-black px-8 py-3">
      <Link href="/">
        <Image src="/assets/logo.svg" width={60} height={60} alt="Logo" />
      </Link>
      <NavMenu />
      <UserButton />
    </nav>
  );
};

export default Navbar;
