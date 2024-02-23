import { NavMenu } from "@/components/shared/NavMenu";
import Navbar from "@/components/shared/nav/Navbar";
import { CropContextProvider } from "@/context/CropContext";
import React from "react";

const ToolsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CropContextProvider>
      <main className="flex size-full flex-col justify-between ">
        <Navbar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="mx-auto size-full max-w-5xl">{children}</div>
        </section>
        <NavMenu className="fixed left-4 top-24" />
      </main>
    </CropContextProvider>
  );
};

export default ToolsLayout;
