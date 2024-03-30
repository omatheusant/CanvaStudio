import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex size-full items-center justify-center">
      {children}
    </main>
  );
}
