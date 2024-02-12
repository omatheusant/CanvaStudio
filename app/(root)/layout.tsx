import React from "react";
import { Room } from "./tools/editor/Room";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-background relative h-full">
      <Room>{children}</Room>
    </main>
  );
};

export default Layout;
