"use client";

import Navbar from "@/components/shared/nav/Navbar";
import React from "react";
import { ImageMattingContextProvider } from "./components/img-matting-context";

const ToolsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ImageMattingContextProvider>
      <main className="flex size-full flex-col justify-between ">
        <Navbar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="mx-auto size-full max-w-5xl">{children}</div>
        </section>
      </main>
    </ImageMattingContextProvider>
  );
};

export default ToolsLayout;
