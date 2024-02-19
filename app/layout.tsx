import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Metadata } from "next";
import { Saira } from "next/font/google";
import React from "react";
import { ptBR } from "@clerk/localizations";

import { dark } from "@clerk/themes";

export const metadata: Metadata = {
  title: "Ismafer Studio",
  description:
    "A minamilist web toolkit for create, edit and publish original designs with real-time colaboration!",
};

const font = Saira({
  subsets: ["latin"],
  variable: "--font-saira",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      localization={ptBR}
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#ffb100" },
      }}
    >
      <html lang="en">
        <body className={`${font.className} bg-primary-grey-100`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
