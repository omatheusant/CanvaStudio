import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Room } from "./Room";

const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { roomId: string };
}) => {
  return (
    <main className="relative h-full">
      <Room roomId={params.roomId}>
        <TooltipProvider>{children}</TooltipProvider>
      </Room>
    </main>
  );
};

export default Layout;
