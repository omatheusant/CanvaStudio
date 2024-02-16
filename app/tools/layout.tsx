import React from "react";
import { Room } from "@/app/tools/editor/Room";
import { TooltipProvider } from "@/components/ui/tooltip";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-background relative h-full">
      <Room>
        <TooltipProvider>{children}</TooltipProvider>
      </Room>
    </main>
  );
};

export default Layout;
