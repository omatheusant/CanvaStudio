import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="size-full">{children}</main>;
}
