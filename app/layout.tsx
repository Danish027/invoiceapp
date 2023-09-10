"use client";
import { ThemeProvider } from "../components/theme-provider";
import "./globals.scss";
import { Nunito } from "next/font/google";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
const font = Nunito({
  subsets: ["latin"],
});
import type { Metadata } from "next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
