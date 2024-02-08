import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="bg-background relative h-full">{children}</main>;
};

export default Layout;
