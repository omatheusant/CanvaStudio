import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="flex-between fixed left-0 top-0 w-full bg-primary-black px-8 py-3">
      <Link href="/">
        <Image src="/assets/logo.svg" width={60} height={60} alt="Logo" />
      </Link>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Button className="primary-gradient rounded-sm px-6 text-base font-semibold">
            Entrar
          </Button>
        </Link>
      </SignedOut>
    </nav>
  );
};

export default Navbar;
