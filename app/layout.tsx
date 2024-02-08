import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canva Studio",
  description: "A web toolkit for create, edit and publish original designs!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
