import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="flex-between w-full bg-primary-black px-8 py-3">
      <Link href="/">
        <Image src="/assets/logo.svg" width={60} height={60} alt="Logo" />
      </Link>
      {/* <NavMenu /> */}
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Button className="transition-ease rounded-sm px-6 text-base font-semibold">
            Entrar
          </Button>
        </Link>
      </SignedOut>
    </nav>
  );
};

export default Navbar;
