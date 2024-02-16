import Navbar from "@/components/shared/nav/Navbar";
import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="size-full">
      <Navbar />
      {children}
    </main>
  );
}
